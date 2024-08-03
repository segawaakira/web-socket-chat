import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineWhatsApp } from 'react-icons/ai';
import '../styles/banner.css';

function Banner() {
  return (
    <section className="banner">
      <img src="/banner.svg" alt="banner" />
      <div className="b-messages">
        <p>© 2022 Vinícius Lacerda. All rights reserved.</p>
        <div className="links">
          <a
            href="https://github.com/ViniciusmnLacerda"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub fontSize={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/viniciuslmn/"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin fontSize={22} />
          </a>
        </div>
        <p>
          <AiOutlineWhatsApp />
          +55 (61) 99251-0079
        </p>
      </div>
    </section>
  );
}

export default Banner;
