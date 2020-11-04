import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Head from "../components/header";
// import PostList from "../components/postList";
import ImageOnlyPostList from "../components/imageOnlyPostList";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import { serv } from "../serv"
// import { Button } from "@material-ui/core";

// import Image from "../images/logo_D.png";



const useStyles = makeStyles(() => ({
  page_wrap: {
    margin: "200px auto",
    width: "clamp(340px,90%,90%)"
  },
}));


const TopPage = () => {


  // style変数
  const classes = useStyles();


  return (
    <div className={classes.page_wrap}>
      <ImageOnlyPostList />
      <Head />
    </div >
  );
}



export default TopPage;