import React from "react";
import { Redirect } from "react-router-dom";


import loginStateCheck from "../components/loginStateCheck"

import ProfileAfterLogin from "../components/redirect/profileAfterLogin"

//テスト画像



const ProfilePage = () => {

  const loginState = loginStateCheck("profilePageから");

  //ログインしてないならリダイレクト
  if (loginState.isSignedIn === false) {
    alert("human error：おっと、ログインが行われていないようです。ホームに戻ります")
    // history.push("/")
  }

  return (
    <>

      {
        loginState.isSignedIn ?
          <ProfileAfterLogin /> : <Redirect to="/" />
      }

    </>
  );
}

export default ProfilePage;