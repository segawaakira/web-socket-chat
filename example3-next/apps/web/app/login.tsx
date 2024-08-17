"use client";
import React, { useState } from "react";

export const Login = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    document.cookie = `name=${name}; path=/`;
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
