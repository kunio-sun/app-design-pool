import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Head from "../components/header";
import { useParams } from "react-router-dom";
// import PostList from "../components/postList";
import ImageOnlyPostList from "../components/imageOnlyPostList";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import { serv } from "../serv"
// import { Button } from "@material-ui/core";

// import Image from "../images/logo_D.png";

// import { useDispatch } from "react-redux";
// import { signInAction } from '../reducks/users/actions';
import LoginStateCheck from '../components/loginStateCheck';

const useStyles = makeStyles(() => ({
  page_wrap: {
    margin: "200px auto",
    width: "clamp(340px,90%,90%)"
  },
}));


const TopPage = () => {
  const loginState = LoginStateCheck("topPageから")

  // react redux専用のhook
  // 必ずuseDispatch()はdispatch定数に代入
  // const dispatch = useDispatch();

  // selector定数にはstoreのstateが保存され他状態になる
  // 多分stateが変化するとuseSelectorが発火してそれに関連する処理も
  // 連動発火すると思う
  // const selector = useSelector(state => state);
  // console.log(selector.users);

  // LoginStateCheck();


  // style変数
  const classes = useStyles();
  const { seachKey } = useParams();


  console.log(seachKey)
  return (
    <div className={classes.page_wrap}>
      {/* <button onClick={() => dispatch(signInAction({
        uid: "00001",
        username: "kunio"
      }))}>テストサインインだよーーーーーーーーーーーーーーーー</button> */}
      <ImageOnlyPostList />
      <Head seachKey={seachKey} loginState={loginState} />
    </div >
  );
}



export default TopPage;