import axios from 'axios';

const putUser = async (email, token, user) => {
  const endpoint = `http://localhost:3001/home/${email}`;
  try {
    const { data, status } = await axios.put(endpoint, user, {
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

export default putUser;
