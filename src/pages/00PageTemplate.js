import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import HeadAfterLogin from "../components/headerAfterLogin";

import LoginStateCheck from "../components/loginStateCheck"

const useStyles = makeStyles((theme) => ({
  pageWrap: {
    marginTop: "120px",
    backgroundColor: "orange",
  },
  test: {
    [theme.breakpoints.down("sm")]: {
      width: "red",
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

const ContentPage = () => {
  // usestyle
  const classes = useStyles();

  const loginState = LoginStateCheck("テンプレートページからアクセス")
  return (
    <>
      <Head loginState={loginState} />
      <HeadAfterLogin />
      <div className={classes.pageWrap}>
        <div className={classes.test}>
          <p>これはコンテンツ<span>ページ</span>です</p>
        </div>
      </div>
    </>
  );
}

export default ContentPage;