import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// maeterialUI
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings"

import colors from "../../commonStyles/colors";

//http request
import axios from "axios";

//serv 読み込み
import { serv } from "../../serv";

//テスト画像
import dummyIcon from "../../images/iconLoading.png";
import { editUser } from "../../reducks/users/actions";



const useStyles = makeStyles(() => ({
  Links: {
    display: "block",
    marginTop: "40px",
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
    // backgroundColor: "#cba",
    color: colors.gray1,
  },
  signUpWrap: {
    // backgroundColor: "#abc",
    minWidth: "350px",
    width: "80%",
    maxWidth: "580px",
    textAlign: "center"
  },
  iconLabel: {
    position: "relative",
    display: "block",
    width: "160px",
    height: "160px",
    margin: "0 auto"
  },
  acountImg: {
    position: "absolute",
    zIndex: "1",
    display: "block",
    margin: "0 auto",
    width: "160px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "1px 1px 8px " + colors.gray3,
    transition: "opacity .3s",
    cursor: "pointer",
    "&:hover": {
      opacity: ".4",
    }
  },
  settingIcon: {
    position: "absolute",
    top: "50%",
    left: "50a%",
    transform: "translate(-50%,-50%)",
    fontSize: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: " space-around",
    // backgroundColor: "orange",
    minHeight: "520px",
    margin: "24px 0 24px 0",
  },
  IconInput: {
    display: "none"
  },
  TextFieldWrap: {
    margin: "9px 0"
  },
  submitButton: {
    marginTop: "16px",
    marginBottom: "80px",
    color: colors.gray1
  },
  errField: {
    textAlign: "left",
    margin: "0",
    fontSize: "12px",
    padding: "2px 0 0 16px"
  },
  profileText: {
    marginTop: "8px",
    width: "100%"
  }
}));

const AcountEditAfterLogin = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loginState = props.loginState;

  const initializeUserInfo = {
    user_id: 1,
    icon: "InitializeIcon.png",
    mail: "loadingNow@gmail.com",
    name: "loadingNow",
    profile: "userinfo"
  }
  const [userInfo, setUserInfo] = useState(initializeUserInfo);
  const [file, setFile] = useState(dummyIcon);
  const [icon, setIcon] = useState(dummyIcon)

  const changeFile = (event) => {
    const file = event.target.files[0];
    const previwIcon = URL.createObjectURL(file);
    console.log("送るファイルdata", file);
    setFile(file);
    setIcon(previwIcon)
  }

  useEffect(() => {
    // console.log("送られ得てきたuserIdは", userId);

    // console.log(loginState.uid)
    axios.get(serv + "getUserInfo?userId=" + loginState.uid)
      .then(res => {
        // console.log("上のuserInfo", res.data);
        setUserInfo(res.data);
        getIconFile(res.data.icon);
      })
      .catch(console.error);

    const getIconFile = (iconName) => {
      // console.log("とってくるアイコン名は", iconName);
      axios.get(serv + "getIconFile?icon=" + iconName, { responseType: "blob" })
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
  }, [loginState])

  // useState フォーム入力情報保持-----
  const setMailval = (event) => {
    const targetValue = event.target.value;
    setUserInfo((userInfo) => { return { ...userInfo, mail: targetValue } });

  }
  const setNameval = (event) => {
    const targetValue = event.target.value;
    setUserInfo((userInfo) => { return { ...userInfo, name: targetValue } });
  }
  const setPassval = (event) => {
    const targetValue = event.target.value;
    setUserInfo((userInfo) => { return { ...userInfo, pass1: targetValue } });
  }
  const setPass2val = (event) => {
    const targetValue = event.target.value;
    setUserInfo((userInfo) => { return { ...userInfo, pass2: targetValue } });
  }
  const setProfile = (event) => {
    const targetValue = event.target.value;
    setUserInfo((userInfo) => { return { ...userInfo, profile: targetValue } })
  }

  const setProfileLength = () => {
    const length = userInfo.profile.length;
    document.getElementById("numberDisplay").innerHTML = length;
  }


  // 送信ボタンクリック時発火----------------
  const registSubmit = async () => {
    let submitFlag = 0;

    const mailField = document.getElementById("mailErrField");
    if (!userInfo.mail) {
      mailField.innerHTML = "mailアドレス欄が入力されていません";
      mailField.style.color = colors.errC;
      submitFlag++;
    } else if (!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(userInfo.mail)) {
      mailField.innerHTML = "メールアドレスを入力してください";
      mailField.style.color = colors.errC;
      submitFlag++;
    } else {
      mailField.innerHTML = "メールアドレス";
      mailField.style.color = colors.gray1;
    }

    const nameField = document.getElementById("nameErrField");
    if (!userInfo.name) {
      nameField.innerHTML = "名前が入力されていません";
      nameField.style.color = colors.errC;
      submitFlag++;
    } else {
      nameField.innerHTML = "半角英数";
      nameField.style.color = colors.gray1;
    }


    const passField = document.getElementById("passErrField");
    if (!userInfo.pass1) {
      passField.innerHTML = "password欄が入力されていません";
      passField.style.color = colors.errC;
      submitFlag++;
    } else if (userInfo.pass1.length < 7) {
      passField.innerHTML = "passwordは必ず8文字以上";
      passField.style.color = colors.errC;
    }
    else {
      passField.innerHTML = "半角英数8文字以上";
      passField.style.color = colors.gray1;
    }

    const pass2Field = document.getElementById("pass2ErrField");
    if (!userInfo.pass2) {
      pass2Field.innerHTML = "passwordが入力されていません";
      pass2Field.style.color = colors.errC;
      submitFlag++;
    } else if (userInfo.pass2 !== userInfo.pass1) {
      pass2Field.innerHTML = "password1と同じ値を入力してください";
      pass2Field.style.color = colors.errC;
      submitFlag++;
    } else {
      pass2Field.innerHTML = "password1と同じ値";
      pass2Field.style.color = colors.gray1;
    }







    if (submitFlag === 0) {
      // icon画像変更リクエスト
      const formData = new FormData();

      if (file.name) {
        formData.append("file", file, userInfo.user_id)
      }

      // オブジェクトを行ごとに送るデータ追加
      Object.keys(userInfo).forEach((key) => {
        formData.append(key, userInfo[key]);
      })

      console.log(formData, "----------------------------")

      // アイコン送信
      // console.log("変更アイコンは-------------", formData);
      // iconChangeリクエストを投げる
      const headers = { "content-type": "multipart/form-data" };
      await axios.post(
        serv + "changeIcon",
        formData,
        { headers })
        .then(res => {
          console.log(res.data)
          const userData = res.data;
          if (userData.didChange === true) {
            alert("成功")
            //localstrageに保存
            localStorage.setItem("users", JSON.stringify({
              isSignedIn: "true",
              icon: userData.icon,
              uid: userData.user_id,
              name: userData.name,
              profile: userData.profile,
              mail: userData.mail
            }));

            new Promise((resolve) => {
              dispatch(editUser({
                uid: userData.user_id,
                username: userData.name,
                mail: userData.mail,
                icon: userData.icon,
                profile: userData.profile
              }))
              resolve(true);
            }).then(() => {
              setTimeout(() => {
                history.push("/profile");
              }, 500);
            })

          }
        })
        .catch(console.err)




    }
    // console.log("送信フラグは", submitFlag);
  }




  return (
    <div className={classes.contentWrap}>
      <div className={classes.signUpWrap}>
        <Link to={"/profile"} className={classes.Links}>プロフィールに戻る</Link>

        <h2>Create Account</h2>
        <p>- アカウント編集 -</p>


        <label htmlFor="iconFile" className={classes.iconLabel}>
          <img src={icon} alt="logo" className={classes.acountImg} />
          <SettingsIcon className={classes.settingIcon} />
        </label>
        <input
          accept="image/png,image/jpeg"
          id="iconFile"
          className={classes.IconInput}
          type="file"
          onChange={changeFile}
        />
        <br />

        {/* <Button onClick={() => console.log(userInfo)}>チェックuserInfo</Button>
        <Button variant="outlined" color="primary" onClick={() => console.log(file)}>check imageファイル</Button> */}

        <div className={classes.form}>
          {/* mail */}
          <div className={classes.TextFieldWrap}>
            <TextField
              autoFocus
              fullWidth
              required
              label="Mail"
              placeholder="kunio092@gmail.com"
              value={userInfo.mail}
              variant="outlined"
              onChange={setMailval}
            />
            <p id="mailErrField" className={classes.errField}>メールアドレス</p>
          </div>

          {/* name */}
          <div className={classes.TextFieldWrap}>
            <TextField
              required
              fullWidth
              label="Name"
              placeholder="kuni_kuni092"
              value={userInfo.name}
              variant="outlined"
              onChange={setNameval}
            />
            <p id="nameErrField" className={classes.errField}>半角英数</p>
          </div>

          {/* password1 */}
          <div className={classes.TextFieldWrap}>
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

          {/* password2 */}
          <div className={classes.TextFieldWrap}>
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

          <div className={classes.TextFieldWrap}>
            <TextField
              className={classes.profileText}
              label="プロフィール文入力欄"
              placeholder="ここから入力"
              value={userInfo.profile}
              variant="outlined"
              multiline
              rows="6"
              maxLength="180"
              inputProps={{ maxLength: 180 }}
              onChange={setProfile}
              onKeyUp={setProfileLength}
            />
            <p id="profileText" className={classes.errField}><span id="numberDisplay">{userInfo.profile.length}</span> / 180</p>
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
        </div>


      </div>
    </div >
  );

}

export default AcountEditAfterLogin;