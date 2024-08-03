import axios from 'axios';

const postLogin = async (user) => {
  const endpoint = 'http://localhost:3001/home/login';
  try {
    const { data, status } = await axios.post(endpoint, user);
    return { data, status };
  } catch (e) {
    const { data: { message }, status } = e.response;
    return { data: message, status };
  }
};

export default postLogin;
