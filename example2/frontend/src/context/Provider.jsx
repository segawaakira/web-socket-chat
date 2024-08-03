/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [loginIsValid, setLoginIsValid] = useState(true);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    username: '',
    name: '',
    lastName: '',
    email: '',
    image: '',
    id: '',
  });
  const [chats, setChats] = useState([]);
  const [doRenderBanner, setDoRenderBanner] = useState(true);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [openNewChat, setOpenNewChat] = useState(false);
  const [users, setUsers] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [haveNewMessage, setHaveNewMessage] = useState(false);
  const [whichOpenChat, setWhichOpenChat] = useState({
    chatId: '',
    name: '',
    lastName: '',
  });

  const value = {
    user,
    setUser,
    loginIsValid,
    setLoginIsValid,
    token,
    setToken,
    chats,
    setChats,
    doRenderBanner,
    setDoRenderBanner,
    messages,
    setMessages,
    chatId,
    setChatId,
    openNewChat,
    setOpenNewChat,
    users,
    setUsers,
    openProfile,
    setOpenProfile,
    isChatVisible,
    setIsChatVisible,
    userMessage,
    setUserMessage,
    haveNewMessage,
    setHaveNewMessage,
    whichOpenChat,
    setWhichOpenChat,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
