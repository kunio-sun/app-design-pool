import React, { useState } from "react";
import { Link } from "react-router-dom";

// maeterialUI
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import colors from "../commonStyles/colors";

//http request
import axios from "axios";

//serv 読み込み
import { serv } from "../serv";

//テスト画像
import icon02 from "../images/userIcon/user02.jpg";



const useStyles = makeStyles(() => ({
  Links: {
    textDecoration: "none",
    color: colors.gray2,
    transition: "opacity .3s",
    fontSize: "14px",
    '&:hover': {
      opacity: ".6",
      textDecoration: "underline"
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
  signUpWrap: {
    textAlign: "center"
  },
  acountImg: {
    display: "block",
    margin: "0 auto",
    width: "160px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "50%",
    transition: "opacity .3s",
    cursor: "pointer",
    "&:hover": {
      opacity: ".6",
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: " space-around",
    width: "400px",
    minHeight: "430px",
    margin: "24px 0 24px 0"
  },
  submitButton: {
    marginTop: "16px",
    color: colors.gray1
  },
  errField: {
    textAlign: "left",
    margin: "0",
    fontSize: "12px",
    padding: "2px 0 0 16px"
  },
}));

const AcountEdit = () => {
  const classes = useStyles();

  // useState フォーム入力情報保持-----
  const [mailVal, setFunc] = useState("");
  const setMailval = (event) => {
    setFunc(event.target.value);
  }
  const [nameVal, setName] = useState("");
  const setNameval = (event) => {
    setName(event.target.value);
  }
  const [passVal, setPass] = useState("");
  const setPassval = (event) => {
    setPass(event.target.value);
  }
  const [pass2Val, setPass2] = useState("");
  const setPass2val = (event) => {
    setPass2(event.target.value);
  }


  // ログインボタンクリック時発火----------------
  const registSubmit = async () => {
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

    if (!nameVal) {
      const nameField = document.getElementById("nameErrField");
      nameField.innerHTML = "名前が入力されていません";
      nameField.style.color = colors.errC;
      submitFlag++;
    } else {
      const nameField = document.getElementById("nameErrField");
      nameField.innerHTML = "メールアドレス";
      nameField.style.color = colors.gray1;
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

    if (pass2Val !== passVal) {
      const pass2Field = document.getElementById("pass2ErrField");
      pass2Field.innerHTML = "password1と同じ値を入力してください";
      pass2Field.style.color = colors.errC;
      submitFlag++;
      console.log(passVal + "と" + pass2Val);
    } else {
      const pass2Field = document.getElementById("pass2ErrField");
      pass2Field.innerHTML = "半角英数8文字以上";
      pass2Field.style.color = colors.gray1;
    }


    // 全てクリアで送信処理---
    if (submitFlag === 0) {
      const res = await axios.post(serv + "signUp", {
        email: mailVal,
        name: nameVal,
        password: passVal
      });
      console.log("post結果", res);
    }
    console.log(submitFlag);
  }




  return (
    <div className={classes.contentWrap}>
      <div className={classes.signUpWrap}>
        <Link to="/profile" className={classes.Links}>ホームへ戻る</Link>

        <h2>Create Account</h2>
        <p>- アカウント編集 -</p>

        <img src={icon02} alt="logo" className={classes.acountImg} />


        <form className={classes.form}>
          {/* mail */}
          <div>
            <TextField
              autoFocus
              fullWidth
              required
              label="Mail"
              placeholder="kunio092@gmail.com"
              variant="outlined"
              onChange={setMailval}
            />
            <p id="mailErrField" className={classes.errField}>メールアドレス</p>
          </div>

          {/* name */}
          <div>
            <TextField
              required
              fullWidth
              label="Name"
              placeholder="kuni_kuni092"
              variant="outlined"
              onChange={setNameval}
            />
            <p id="nameErrField" className={classes.errField}>半角英数</p>
          </div>

          {/* password1 */}
          <div>
            <TextField
              required
              fullWidth
              label="Password1"
              type="password"
              placeholder="**********"
              variant="outlined"
              onChange={setPassval}
            />
            <p id="passErrField" className={classes.errField}>半角英数8文字以上</p>
          </div>

          {/* password */}
          <div>
            <TextField
              required
              fullWidth
              label="Password2"
              type="password"
              placeholder="**********"
              variant="outlined"
              onChange={setPass2val}
            />
            <p id="pass2ErrField" className={classes.errField}>Password1と同じ値</p>
          </div>


          <Button
            size="large"
            variant="contained"
            disableElevation
            className={classes.submitButton}
            onClick={registSubmit}
          >
            編集
          </Button>
        </form>


      </div>
    </div>
  );

}

export default AcountEdit;