import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Head from "../components/header";

const useStyles = makeStyles(() => ({
  page_wrap: {
    marginTop: "80px",
  }
}));

const TopPage = () => {
  // style変数
  const classes = useStyles();
  return (
    <div className={classes.page_wrap}>
      <Head />
      <div>テスト</div>
    </div>
  );
}


export default TopPage;