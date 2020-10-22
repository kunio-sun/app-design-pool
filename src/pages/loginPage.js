import React, { useState } from 'react';
import logoD from "../images/logo_D.png";
import { Link } from "react-router-dom";
import colors from "../commonStyles/colors"
import { useHistory } from "react-router-dom";
// material ui
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles"
import Axios from 'axios';

// server読み込み
import { serv } from "../serv";

// Usestyles
const useStyles = makeStyles(() => ({
  Links: {
    color: colors.gray1,
    transition: "opacity .3s",
    '&:hover': {
      opacity: ".6"
    }
  },
  contentWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    minWidth: "100%",
    backgroundColor: colors.backC,
    color: colors.gray1,
  },
  loginWrap: {
    textAlign: "center"
  },
  logo: {
    display: "block",
    margin: "0 auto",
    width: "80px",
    transition: "opacity .3s",
    "&:hover": {
      opacity: ".6",
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "400px",
    minHeight: "280px",
    margin: "24px 0 24px 0",
  },
  errField: {
    textAlign: "left",
    margin: "0",
    fontSize: "12px",
    padding: "2px 0 0 16px"
  },
  submitButton: {
    marginTop: "24px",
    color: colors.gray1,
  }
}))

const LoginPage = () => {
  const history = useHistory();
  const classes = useStyles();

  // useState フォーム入力情報保持---
  const [mailVal, setFunc] = useState("");
  const setMailval = (event) => {
    setFunc(event.target.value);
  }
  const [passVal, setPass] = useState("");
  const setPassval = (event) => {
    setPass(event.target.value);
  }

  // ログインボタンクリック時発火
  const loginSubmit = async () => {
    let submitFlag = 0;
    if (!mailVal) {
      const mailField = document.getElementById("mailErrField");
      mailField.innerHTML = "mailアドレス欄が入力されていません";
      mailField.style.color = colors.errC;
      submitFlag++;
    } else {
      const mailField = document.getElementById("mailErrField");
      mailField.innerHTML = "メールアドレス";
      mailField.style.color = colors.gray1;
    }

    if (!passVal) {
      const passField = document.getElementById("passErrField");
      passField.innerHTML = "password欄が入力されていません";
      passField.style.color = colors.errC;
      submitFlag++;
    } else {
      const passField = document.getElementById("passErrField");
      passField.innerHTML = "半角英数8文字以上";
      passField.style.color = colors.gray1;
    }

    // バリデートが通ったらpost
    if (submitFlag === 0) {
      const res = await Axios.post(serv + "login", {
        email: mailVal,
        pass: passVal
      });
      console.log("この値を送信", mailVal, passVal);
      console.log("post結果", res);
      if (res.data.length === 0) {
        alert("メールアドレス又はパスワードが間違っています");
      } else {
        alert("ログイン成功");
        history.push("/");
      }

    }
  }

  return (
    <div className={classes.contentWrap}>


      <div className={classes.loginWrap}>
        <Link to="/">
          <img src={logoD} alt="logo" className={classes.logo} />
        </Link>

        <h2>Design PooL</h2>
        <p>- ログイン -</p>

        <form className={classes.form}>
          {/* mail */}
          <div>
            <TextField
              autoFocus
              fullWidth
              required
              label="Mail"
              placeholder="kunio092@gmail.com"
              // helperText="メールアドレス"
              // value="kunio092@gmail.com"
              variant="outlined"
              onChange={setMailval}
            />
            <p id="mailErrField" className={classes.errField}>メールアドレス</p>
          </div>
          {/* password1 */}
          <div>
            <TextField
              error={false}
              required
              fullWidth
              label="Password1"
              type="password"
              placeholder="**********"
              // helperText="半角英数8文字以上"
              variant="outlined"
              // value="kuni4649"
              onChange={setPassval}
            />
            <p id="passErrField" className={classes.errField}>半角英数8文字以上</p>
          </div>

          <Button
            size="large"
            variant="contained"
            disableElevation
            fullWidth
            className={classes.submitButton}
            onClick={() => loginSubmit()}
          >
            Login
        </Button>
        </form>
        <Link to="/signUp" className={classes.Links}>アカウント作成へ</Link>


      </div>

    </div>

  );
}

export default LoginPage;