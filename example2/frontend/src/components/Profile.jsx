import React, { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { GrLogout } from 'react-icons/gr';
import { IoMdSettings } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/profile.css';

function Profile() {
  const history = useHistory();
  const { user: { name, lastName, image }, setOpenProfile } = useContext(Context);

  return (
    <header className="profile">
      {image
        ? <img src={image} alt={`${name} ${lastName}`} width="30px" />
        : <AiOutlineUser />}
      <h1>{`${name} ${lastName}`}</h1>
      <div>
        <button
          type="button"
          onClick={() => setOpenProfile(true)}
        >
          <IoMdSettings />
        </button>
        <button
          type="button"
          onClick={() => history.push('/')}
        >
          <GrLogout />
        </button>
      </div>
    </header>
  );
}

export default Profile;
