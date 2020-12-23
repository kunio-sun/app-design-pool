// Actionsにはデータの処理名とそのデータのみ宣言
// reducerにどんな処理を要求するかのtypeとどんなデータを渡すかの
// payloadをAction内で定義
export const SIGN_IN = "SIGN_IN";
// 引数にobject型のuserStateを受け取っている
// userState:{uid:"exampleData",username:"exName"}
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      name: userState.name,
      mail: userState.mail,
      icon: userState.icon,
      profile: userState.profile
    }
  }
}

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
    }
  }
}

export const EDIT_USER = "EDIT_USER";
export const editUser = (userState) => {
  return {
    type: "EDIT_USER",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      mail: userState.mail,
      icon: userState.icon,
      profile: userState.profile
    }
  }
}
// データを使ってどの様な変更を加えるのかを行うのはreducer