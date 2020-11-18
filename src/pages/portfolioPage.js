import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import Button from "@material-ui/core/Button";
import Send from '@material-ui/icons/Send';
import { useParams } from "react-router-dom";

import PostListUserDetail from "../components/PostListUserDetail"

import { serv } from "../serv";
//テスト画像
import dummyIcon from "../images/userIcon/user02.jpg";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  pageWrap: {
    margin: "120px auto 120px auto",
    width: "clamp(340px,90%,90%)"
  },
  userwrap: {
    textAlign: "center",
    // backgroundColor: "#ddd",
    margin: "0 auto",
    width: "clamp(350px,70%,800px)",
    color: colors.gray1,
    '& h2': {
      width: "70%",
      margin: "12px auto 0 auto",
      paddingBottom: "24px",
      borderBottom: "1px solid" + colors.gray3,
      fontWeight: "normal",
    },
    '& img': {
      width: "180px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "50%",
      boxShadow: "1px 1px 8px " + colors.gray3,
    }
  },
  mailButton: {
    width: "320px",
    height: "40px",
    borderRadius: "20px"

  },
  userMail: {
    margin: "16px 0 12px",
    color: colors.gray2
  },
  userText: {
    textAlign: "left",
    fontSize: "14px",
    marginBottom: "32px"
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

const PortfolioPage = () => {
  const { userId } = useParams();
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
    // console.log("表示するuserのidは" + userId);
    Axios.get(serv + "getUserInfo?userId=" + userId)
      .then(res => {
        // console.log("reaponseDataは", res.data);
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

  }, [userId]);


  return (
    <>
      <Head />
      <div className={classes.pageWrap}>
        <div className={classes.userwrap}>
          <img src={icon} alt="ユーザーアイコン" />
          <h2>{userInfo.name}</h2>
          <p className={classes.userMail}>{userInfo.mail}</p>


          <Button
            className={classes.mailButton}
            variant="outlined"
            color="default"
            endIcon={<Send />}
            href={"mailto:" + userInfo.mail}
          >
            メール送信
          </Button>
          <p className={classes.userText}>{userInfo.profile}</p>
        </div>

        <PostListUserDetail />
      </div>
    </>
  );
}

export default PortfolioPage;