import React, { useContext, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import Alert from '../components/Alert';
import Banner from '../components/Banner';
import Chats from '../components/Chats';
import EditProfile from '../components/EditProfile';
import Messages from '../components/Messages';
import NewChat from '../components/NewChat';
import Context from '../context/Context';
import getChats from '../services/getChats';
import '../styles/home.css';

function Home() {
  const {
    token,
    setToken,
    loginIsValid,
    setLoginIsValid,
    setChats,
    doRenderBanner,
    setDoRenderBanner,
    openNewChat,
    setUser,
    setOpenNewChat,
    openProfile,
    setHaveNewMessage,
    setWhichOpenChat,
  } = useContext(Context);

  const setBanner = (e) => {
    if (e.keyCode === 27) {
      setWhichOpenChat({
        chatId: '',
        name: '',
        lastName: '',
      });
      setDoRenderBanner(true);
    }
  };

  useEffect(() => {
    setOpenNewChat(false);
    setDoRenderBanner(true);
    const tokenRecovered = JSON.parse(localStorage.getItem('token'));
    if (!tokenRecovered) setLoginIsValid(false);
    else {
      const userDataRecovered = JSON.parse(localStorage.getItem('userData'));
      setUser(userDataRecovered);
      setToken(tokenRecovered);
      window.addEventListener('keydown', setBanner);
    }
  }, []);

  useEffect(() => () => {
    window.removeEventListener('keydown', setBanner);
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      const { data, status } = await getChats(token);
      if (status === 200) {
        setChats(data);
      }
    };
    fetchChats();
  }, [token]);

  const { lastJsonMessage } = useWebSocket('ws://localhost:3001', {
    onMessage: () => {
      if (lastJsonMessage) setHaveNewMessage(true);
    },
    reconnectInterval: 3000,
  });

  return (
    <div className="home-container">
      <div className="card">
        {openProfile && <EditProfile />}
        {openNewChat && <NewChat />}
        <Chats />
        {!loginIsValid && <Alert />}
        {doRenderBanner ? <Banner /> : <Messages />}
      </div>
    </div>
  );
}

export default Home;
