// initialStateのプロパティごとにsrc/reducks内に
// プロパティ名毎のディレクトリを作成するのがre-ducksとしてはベター
let initialState = /* localState ? JSON.parse(localState) :  */{
  users: {
    isSignedIn: false,
    icon: "",
    mail: "",
    uid: "",
    username: "",
    profile: ""
  }
}
// console.log("set前initialState", initialState)


// ページ再読み込み時
const localState = localStorage.getItem("users")
if (localState) {
  const setter = JSON.parse(localState);
  initialState = {
    users: {
      isSignedIn: true,
      ...setter
    }
  }
  // console.log(initialState)
}


export default initialState