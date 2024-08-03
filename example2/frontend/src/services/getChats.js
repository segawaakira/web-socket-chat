import axios from 'axios';

const getChats = async (token) => {
  const endpoint = 'http://localhost:3001/chats';
  try {
    const { data, status } = await axios.get(endpoint, {
      headers: {
        authorization: token,
      },
    });

    return { data, status };
  } catch (e) {
    const { data: { message }, status } = e.response;
    return { data: message, status };
  }
};

export default getChats;
