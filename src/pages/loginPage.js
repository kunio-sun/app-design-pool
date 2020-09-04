import React from 'react';
import logoD from "../images/logo_D.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <Link to="/">
        <img src={logoD} alt="logo" />
      </Link>
      ログインページ login
    </div>
  );
}

export default LoginPage;