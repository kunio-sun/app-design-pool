import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Head from "../components/header";
import PostList from "../components/postList";
import axios from "axios";
import { Link } from "react-router-dom";


import { serv } from "../serv"
import { Button } from "@material-ui/core";



const useStyles = makeStyles(() => ({
  page_wrap: {
    margin: "200px auto",
    width: "clamp(340px,90%,90%)"
  },
}));

const TopPage = () => {
  // style変数
  const classes = useStyles();

  // http リクエストテスト axios
  const request = () => {
    axios.get(serv)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }


  return (
    <div className={classes.page_wrap}>
      <PostList />
      <div>
        <Head />
        <div>送信リクエストテスト</div>
        <button onClick={() => request()}>abc</button>
        <div>
          <Link to="/profile">
            <Button color="primary"
              variant="contained">仮プロフィールリンク</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}



export default TopPage;