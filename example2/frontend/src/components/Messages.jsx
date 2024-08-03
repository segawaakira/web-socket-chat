/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Context from '../context/Context';
import postMessage from '../services/postMessage';
import '../styles/messages.css';
import formatHours from '../utils/formatHours';

function Messages() {
  const {
    messages,
    token,
    chatId,
    userMessage,
    user,
    setDoRenderBanner,
  } = useContext(Context);
  const [text, setText] = useState({ message: '' });
  const [isBtnDisable, setIsBtnDisabled] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setText({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { status } = await postMessage(chatId, token, text);
    if (status === 201) setText({ message: ' ' });
  };

  useEffect(() => setIsBtnDisabled(text.message.length > 0), [text]);

  return (
    <section className="messages">
      <article className="messages-content">
        <header>
          <h3>{userMessage}</h3>
          <button
            onClick={() => setDoRenderBanner(true)}
            type="button"
          >
            <AiOutlineClose fontSize={22} />
          </button>
        </header>
        <main className="chat-box">
          {messages.map(({
            message, date, username,
          }, index) => (
            <div>
              <div
                key={`${date}_${message}_${username}_${index}`}
                className={user.username === username ? 'right-message' : 'left-message'}
              >
                <p className="text">{message}</p>
                <p className="hours">{formatHours(date)}</p>
              </div>
            </div>
          ))}
        </main>
      </article>
      <footer>
        <form
          className="footer-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="message">
            <input
              placeholder="Message"
              type="text"
              autoComplete="off"
              value={text.message}
              onChange={(e) => handleChange(e)}
              id="message"
              name="message"
            />
          </label>
          <button
            type="submit"
            disabled={!isBtnDisable}
          >
            Send
          </button>
        </form>
      </footer>
    </section>
  );
}

export default Messages;
