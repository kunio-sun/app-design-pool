import React from "react";
import logoD from "../images/logo_D.png";
import { Link } from "react-router-dom";

// maeterialUI
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import colors from "../commonStyles/colors";

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
  signUpWrap: {
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
    justifyContent: " space-around",
    width: "400px",
    minHeight: "420px",
    margin: "24px 0 24px 0"
  },
  submitButton: {
    marginTop: "16px",
    color: colors.gray1
  }
}));

const SignUpPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.contentWrap}>
      <div className={classes.signUpWrap}>

        <Link to="/">
          <img src={logoD} alt="logo" className={classes.logo} />
        </Link>

        <h2>Create Account</h2>
        <p>- アカウント作成 -</p>


        <form className={classes.form}>
          {/* mail */}
          <TextField
            autoFocus
            fullWidth
            required
            label="Mail"
            placeholder="kunio092@gmail.com"
            helperText="メールアドレス"
            variant="outlined"
          />
          {/* name */}
          <TextField
            required
            fullWidth
            label="Name"
            placeholder="kuni_kuni092"
            helperText="半角英数"
            variant="outlined"
          />
          {/* password1 */}
          <TextField
            required
            fullWidth
            label="Password1"
            type="password"
            placeholder="**********"
            helperText="半角英数8文字以上"
            variant="outlined"
          />
          {/* password1 */}
          <TextField
            required
            fullWidth
            label="Password2"
            type="password"
            placeholder="**********"
            helperText="Password1と同じ"
            variant="outlined"
          // error
          // defaultValue=""
          />

          <Button
            size="large"
            variant="contained"
            disableElevation
            className={classes.submitButton}
          >
            Join
          </Button>
        </form>

        <Link to="/login" className={classes.Links}>ログイン画面へ</Link>

      </div>
    </div>
  );
}

export default SignUpPage;