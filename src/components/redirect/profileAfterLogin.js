import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../commonStyles/colors";
import Button from "@material-ui/core/Button";
import Person from '@material-ui/icons/Person';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import Axios from "axios";
import { serv } from "../../serv";

import PostListUserDetail from "../../components/PostListUserDetail";
import { signOutAction } from "../../reducks/users/actions"

import loginStateCheck from "../../components/loginStateCheck"


//テスト画像
import dummyIcon from "../../images/iconLoading.png";



const useStyles = makeStyles((theme) => ({
  pageWrap: {
    margin: "120px auto 120px auto",
    width: "clamp(340px,90%,90%)"
  },
  logout: {
    display: "block",
    margin: "0 auto",
    width: "240px"
  },
  userwrap: {
    textAlign: "center",
    // backgroundColor: "#ddd",
    margin: "0 auto",
    width: "clamp(350px,70%,800px)",
    color: colors.gray1,
    // backgroundColor: "orange",
    '& h2': {
      width: "70%",
      margin: "12px auto 0 auto",
      paddingBottom: "24px",
      // borderBottom: "1px solid" + colors.gray3,
      fontWeight: "normal",
    },
    '& img': {
      width: "180px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "50%",
      boxShadow: "1px 1px 8px " + colors.gray3,
    },
    '& Button': {
      width: "320px",
      height: "40px",
      borderRadius: "20px"
    },
  },
  userMail: {
    margin: "16px 0 12px",
    color: colors.gray2
  },
  profileButton: {
    display: "block",
    textDecoration: "none",
  },
  userText: {
    display: "inline-block",
    textAlign: "left",
    fontSize: "14px",
    paddingBottom: "16px",
    marginBottom: "16px",
  },
  poolingWrap: {
    // backgroundColor: "orange",
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    borderTop: "0.5px solid" + colors.gray3,
    paddingTop: "7%",
    "& Button": {
      width: "70%",
      height: "40px",
      borderRadius: "20px",
      marginBottom: "6%"
    }
  },
  poolingButton: {
    textDecoration: "none",
  },
  test: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "orange",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: "blue",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "green",
    },
    '& span': {
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: colors.black
      }
    }
  }
}));
const ProfileAfterLogin = () => {


  const dispatch = useDispatch();
  const history = useHistory();

  const loginState = loginStateCheck("profileAfterLoginから");
  const userId = loginState.uid;

  const classes = useStyles();

  const initializeUserInfo = {
    user_id: 1,
    icon: "InitializeIcon.png",
    mail: "loadingNow@gmail.com",
    name: "loadingNow",
    profile: "--- LoadingNow --- LoadingNow --- LoadingNow ---"
  }
  const [userInfo, setUserInfo] = useState(initializeUserInfo);
  const [icon, setIcon] = useState(dummyIcon);


  useEffect(() => {

    console.log("userIdは" + userId);
    Axios.get(serv + "getUserInfo?userId=" + userId)
      .then(res => {
        // console.log("上のuserInfo", res.data);
        setUserInfo(res.data);
        getIconFile(res.data.icon);
      })
      .catch(console.error);

    const getIconFile = (iconName) => {
      // console.log("とってくるアイコン名は", iconName);
      Axios.get(serv + "getIconFile?icon=" + iconName, { responseType: "blob" })
        .then(res => {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          reader.onload = () => {
            const imageDataUrl = reader.result;
            setIcon(imageDataUrl);
          }
        })
        .catch(console.error)
    } // end getIconFile()
  }, [userId])

  const Logout = () => {
    console.log("logout")
    dispatch(signOutAction());
    history.push("/");
  }


  return (

    <div className={classes.pageWrap}>
      <Button onClick={Logout} className={classes.logout}>ログアウト</Button>
      <div className={classes.userwrap}>
        <img src={icon} alt="ユーザーアイコン" />
        <h2>{userInfo.name}</h2>
        <p className={classes.userMail}>{userInfo.mail}</p>

        <Link to={"/acountEdit" + userId} className={classes.profileButton}>
          <Button variant="outlined" color="default"
            endIcon={<Person />}>
            プロフィール編集
      </Button>
        </Link>
        <p className={classes.userText}>{userInfo.profile}</p>
      </div>

      <div className={classes.poolingWrap}>
        <Link to="/pooling" className={classes.poolingButton}>
          <Button variant="contained">PooLing!!</Button>
        </Link>
      </div>

      <PostListUserDetail />
    </div>
  )
}

export default ProfileAfterLogin;