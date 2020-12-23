// 全てのモジュールをActionとして使用
import * as Actions from './actions'
import initialState from '../store/initialState'

/* 
もし現在のstore状態が指定されてない時はUserReducer
の第１引数が初期値になる
 */
export const UsersReducer = (state = initialState.users, action/* actionがreturn()したプレーンなオブジェクト */) => {
  switch (action.type) {
    case Actions.SIGN_IN/* アクション処理名 */:
      return {
        // ... ←スプレッド構文 (spread = 広げる,開く)
        // action.payloadで無い値を補う---
        ...state,
        // isSignIn, uid, usernameが
        // initialStateに上書き
        ...action.payload
      }
    case Actions.SIGN_OUT:
      return { ...action.payload }
    case Actions.EDIT_USER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

/*
スプレッド構文
const payload = {
  uid: "000",
  username: "tarou"
}
console.log({...payload})
{uid: "00000", username: "tarou"}

// Marge Objects
const state = { isSignedIn: false }
console.log({...state, ...payload})
 */
