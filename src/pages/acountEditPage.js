import React from "react";
import AcountEditAfterLogin from "../components/redirect/acountEditAfterLogin";
import { Redirect } from "react-router-dom";

import LoginStateCheck from "../components/loginStateCheck";


const AcountEditPage = () => {
  const loginState = LoginStateCheck("acountEditページから");
  if (loginState.isSignedIn === false) {
    alert("human error：おっと、ログインが行われていないようです。アカウント編集はログインを行ってからにしてください。ホームに戻ります。")
  };


  return (
    <>
      {
        loginState.isSignedIn ?
          <AcountEditAfterLogin loginState={loginState} /> : <Redirect to="/" />
      }
    </>

  );

}

export default AcountEditPage;