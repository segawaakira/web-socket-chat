/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import Context from '../context/Context';
import getChats from '../services/getChats';
import getUsers from '../services/getUsers';
import postChat from '../services/postChat';
import '../styles/newChat.css';

function NewChat() {
  const {
    setOpenNewChat,
    token,
    setUsers,
    users,
    user,
    setChats,
    setHaveNewMessage,
  } = useContext(Context);
  const [search, setSearch] = useState({ name: '' });
  const [usersToRender, setUsersToRender] = useState([]);
  const [controlBox, setControlBox] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setSearch({ [name]: value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, status } = await getUsers();
      if (status === 200) {
        const listOfUsers = data.filter((u) => u.username !== user.username);
        listOfUsers.forEach((u) => {
          const fullName = `${u.name} ${u.lastName}`.toLowerCase();
          u.fullName = fullName;
        });
        listOfUsers.sort((a, b) => (a.name > b.name ? 1 : -1));
        setUsers(listOfUsers);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (search.name.length > 0) {
      const searchedName = search.name.toLowerCase();
      const usersFiltered = users.filter((u) => u.fullName.includes(searchedName));
      if (usersFiltered.length === 0) setControlBox(false);
      setUsersToRender(usersFiltered);
      setControlBox(true);
    } else {
      setUsersToRender([]);
      setControlBox(false);
    }
  }, [search]);

  const handleClick = async (username) => {
    await postChat(username, token);
    const { data, status } = await getChats(token);
    if (status === 200) {
      setChats(data);
      setHaveNewMessage(false);
    }
    setOpenNewChat(false);
  };

  return (
    <section className="new-chat">
      <div className="new-chat-content">
        <header>
          <h1>New chat</h1>
          <button
            type="button"
            onClick={() => setOpenNewChat(false)}
          >
            <AiOutlineClose />
          </button>
        </header>
        <form className="nc-form">
          <label htmlFor="name">
            <AiOutlineSearch fontSize={22} />
            <input
              type="text"
              autoComplete="off"
              value={search.name}
              onChange={(e) => handleChange(e)}
              id="name"
              name="name"
            />
          </label>
        </form>
        <main className={controlBox ? 'nc-list' : ''}>
          {usersToRender.map(({
            name, lastName, id, username, image,
          }) => (
            <button
              type="button"
              onClick={() => handleClick(username)}
              key={id}
            >
              {image
                ? <img src={image} alt={`${name} ${lastName}`} width="30px" />
                : <AiOutlineUser />}
              <p>{`${name} ${lastName}`}</p>
            </button>
          ))}
        </main>
      </div>
    </section>
  );
}

export default NewChat;
