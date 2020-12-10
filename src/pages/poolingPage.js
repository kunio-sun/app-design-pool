import React from "react";
import Head from "../components/header";
import { Redirect } from "react-router-dom"

// import DummyWhite from "../images/dummyWhite.png";
// import DummyBlack from "../images/backGradient.png";

import PoolingAfterLogin from "../components/redirect/poolingAfterLogin"
import loginStateCheck from "../components/loginStateCheck"


const PoolingPage = () => {
  // usestyle

  const loginState = loginStateCheck();
  if (loginState.isSignedIn === false) {
    alert("humen error: おっとログインがされてないようです。ホームに戻ります")
  }




  return (
    <>
      <Head />
      {
        loginState.isSignedIn ?
          <PoolingAfterLogin /> : <Redirect to="/" />
      }


    </>
  );
}

export default PoolingPage;