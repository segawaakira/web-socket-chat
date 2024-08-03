import axios from 'axios';

const postSignup = async (user) => {
  const endpoint = 'http://localhost:3001/home/signup';
  try {
    const { data, status } = await axios.post(endpoint, user);
    return { data, status };
  } catch (e) {
    const { data: { message }, status } = e.response;
    return { data: message, status };
  }
};

export default postSignup;
