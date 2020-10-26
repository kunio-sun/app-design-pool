import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import HeadAfterLogin from "../components/headerAfterLogin";
import { Link } from "react-router-dom";

//テストがぞう
import icon02 from "../images/userIcon/user02.jpg";
import postImage from "../images/testImage/postImage.jpg";

import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  pageWrap: {
    // marginTop: "120px",
    // backgroundColor: "orange",
    display: "flex",
    flexWrap: "wrap",
    color: colors.gray1,
  },
  leftWrap: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "120px",
      minHeight: "40vh",
      border: "none"
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(50% - 1px)",
      borderRight: "1px solid #ddd",
      minHeight: "100vh",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightWrap: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "60px",
      marginBottom: "120px",
      backgroundColor: colors.white,
      minHeight: "40vh",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginTop: "80px",
      backgroundColor: "#fcfcfc",
      minHeight: "100vh",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& img': {
      width: "400px"
    }
  },
  leftInner: {
    textAlign: "center",
    width: "80%",
    '& img': {
      width: "180px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    '& p': {
      color: colors.gray2,
      marginBottom: "0",
    },
    '& h2': {
      marginBottom: "60px",
      fontWeight: "normal",
    },
    '& Button': {
      width: "80%",
      height: "40px",
      borderRadius: "20px"
    }
  },
  rightInner: {
    width: "clamp(350px,80%,480px)",
    '& img': {
      width: "100%",
      height: "auto",
    },
    '& p': {
      fontSize: "14px"
    },

  },
  portfolioLink: {
    textDecoration: "none",
  },
  test: {
    backgroundColor: colors.gray2,

    '& span': {
      color: 'brown',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: colors.black
      }
    }
  }
}));

const ContentPage = () => {
  // usestyle
  const classes = useStyles();
  return (
    <>
      <Head />
      <HeadAfterLogin />
      <div className={classes.pageWrap}>
        {/* 左側 */}
        <div className={classes.leftWrap}>
          <div className={classes.leftInner}>
            <img src={icon02} alt="ユーザアイコン" />
            <p>created by</p>
            <h2>Kunio092</h2>
            <Link to="/portfolio" className={classes.portfolioLink}>
              <Button variant="outlined" color="default">
                作品集を見る
              </Button>
            </Link>

          </div>
        </div>

        {/* 右側 */}
        <div className={classes.rightWrap}>
          <div className={classes.rightInner}>
            <img src={postImage} alt="投稿画像" />
            <p>知り合いのアイコン画像を作りました。後ろの背景は素材写真サイトのunsplashでダウンロードした物になります。元画像と背景画像の光の当たり方が合っていなかったため馴染ませるのに苦戦しました。こうやって完成した物を見ると、壁にもたれてる感を出したかったので影も入れたらもう少し馴染んでいたかもしれないです。</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentPage;