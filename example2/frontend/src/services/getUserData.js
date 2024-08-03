import axios from 'axios';

const getUserData = async (email, token) => {
  const endpoint = `http://localhost:3001/home/${email}`;
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

export default getUserData;
