import axios from 'axios';

const postMessage = async (chatId, token, text) => {
  const endpoint = `http://localhost:3001/messages/${chatId}`;
  try {
    const { data, status } = await axios.post(endpoint, text, {
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

export default postMessage;
