import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import Button from "@material-ui/core/Button";
import Person from '@material-ui/icons/Person';
import { Link } from "react-router-dom";


import PostList from "../components/postList";

//テスト画像
import icon02 from "../images/userIcon/user02.jpg";

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
    textDecoration: "none",
  },
  userText: {
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

const ProfilePage = () => {
  // usestyle
  const classes = useStyles();
  return (
    <>
      <Head />
      <div className={classes.pageWrap}>
        <div className={classes.userwrap}>
          <img src={icon02} alt="ユーザーアイコン" />
          <h2>kunio092</h2>
          <p className={classes.userMail}>kunio092@gmail.com</p>

          <Link to="/acountEdit" className={classes.profileButton}>
            <Button variant="outlined" color="default"
              endIcon={<Person />}>
              プロフィール編集
            </Button>
          </Link>
          <p className={classes.userText}>デザイン受注いつでも承っております。得意ジャンルはDTPデザイン、webデザイン、logoデザイン。今まで受注製作させていただいた作品で公開可能な物や自主制作してきた作品、コンテスト応募で作成した物をポートフォリオとして投稿する為にdesign poolを利用させて頂きました。お仕事の依頼はお手数ですがメールアドレスまでお願いいたします。</p>
        </div>

        <div className={classes.poolingWrap}>
          <Link to="/pooling" className={classes.poolingButton}>
            <Button variant="contained">PooLing!!</Button>
          </Link>
        </div>

        <PostList />
      </div>
    </>
  );
}

export default ProfilePage;