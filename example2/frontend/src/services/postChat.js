import axios from 'axios';

const postChat = async (username, token) => {
  const endpoint = `http://localhost:3001/chats/${username}`;
  try {
    const { data, status } = await axios.post(endpoint, {}, {
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

export default postChat;
