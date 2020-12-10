import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";

// react responsive
import MediaQuery from "react-responsive";

// 入力form
import Paper from "@material-ui/core/Paper";
import InputBace from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton"
import SeachIcon from "@material-ui/icons/Search"
//button 
import Button from "@material-ui/core/Button"
// Dpool logo
import logo from "../images/logo_designpool_normal.png";
import logoD from "../images/logo_D.png";
//style color
import colors from "../commonStyles/colors";
import LoginStateCheck from '../components/loginStateCheck';

import polingButton from "../images/poling_button.png";
import profileButton from "../images/profile_button.png";

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: '80px',
    backgroundColor: colors.white,
  },
  header_bar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  header_logo: {
    cursor: "pointer",
    width: 'auto',
    height: '40px',
    transition: 'opacity .3s',
    '&:hover': {
      opacity: ".6"
    }
  },
  header_left: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: '1'
  },
  Input_Paper: {
    marginLeft: '24px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.gray3,
    height: '44px',
    borderRadius: '22px'
  },
  Input_PaperT: {
    marginLeft: '24px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.gray3,
    width: '90%',
    height: '44px',
    borderRadius: '22px'
  },
  InputBace: {
    padding: '0 0 0 20px',
    width: '24vw',
    minWidth: '240px',
    maxWidth: '400px',
  },
  InputBaceT: {
    padding: '0 0 0 20px',
    width: '100%'

  },
  header_buttons: {
    display: "flex",
    justifyContent: "center",
    '& img': {
      margin: '0 6px',
    },
    '& Button': {
      margin: '0 6px',
    }
  },
  bottom_nav: {
    position: "fixed",
    zIndex: "100",
    bottom: "0",
    left: "0",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "0 34px",
    width: "100%",
    height: "60px",
    boxShadow: "2px 4px 8px #666",
    backgroundColor: colors.white,
    "& Button": {
      marginLeft: "10px"
    }
  },
  Links: {
    textDecoration: "none"
  },
  bottomLeftButton: {
    textDecoration: "none",
  },
  bottomRightButton: {
    textDecoration: "none"
  }
}));
const Head = (props) => {
  // console.log("seachKEy", props.seachKey)
  const classes = useStyles();
  const history = useHistory();

  const loginState = LoginStateCheck("headerから");

  // useState フォーム入力情報保持---
  const [seachKey, setSeachKey] = useState(props.seachKey);
  const setKey = (event) => {
    setSeachKey(event.target.value);
  }
  if (loginState.isSignedIn) {
    return (
      <>
        {/* パソコンサイズ */}
        <MediaQuery query="(min-width:768px)">
          <AppBar className={classes.header} >
            <Toolbar className={classes.header_bar}>
              <div className={classes.header_left}>
                <Link to="/home">
                  <img src={logo} alt="ロゴ" className={classes.header_logo} />
                </Link>
                <Paper
                  className={classes.Input_Paper}
                  elevation={0}
                  component="form"
                >
                  <InputBace
                    placeholder="design , photo , logo etc"
                    className={classes.InputBace}
                    onChange={setKey}
                  />
                  <IconButton size="medium" onClick={() => history.push("/home" + seachKey)}>
                    <SeachIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </div>

              <div className={classes.header_buttons}>
                <Link to="/pooling" className={classes.Links}>
                  <img src={polingButton} alt="pooling button" />
                </Link>
                <Link to={"/profile" + loginState.uid} className={classes.Links}>
                  <img src={profileButton} alt="プロフィールボタン" />
                </Link>
              </div>

            </Toolbar>
          </AppBar>

        </MediaQuery>


        {/* タブレットサイズ */}
        <MediaQuery query="(max-width:767px)">
          <AppBar className={classes.header} >
            <Toolbar className={classes.header_bar}>
              <div className={classes.header_left}>
                <Link to="/home">
                  <img src={logoD} alt="ロゴ" className={classes.header_logo} />
                </Link>
                <Paper
                  className={classes.Input_PaperT}
                  elevation={0}
                  component="form"
                >
                  <InputBace
                    placeholder="design , photo , logo etc"
                    className={classes.InputBaceT}
                    onChange={setKey}
                  />
                  <IconButton size="medium" onClick={() => history.push("/home" + seachKey)}>
                    <SeachIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </div>
            </Toolbar>
          </AppBar>

          <nav className={classes.bottom_nav}>
            <Link to={"/profile" + loginState.uid} className={classes.Links}>
              <Button variant="outlined">
                profile
              </Button>
            </Link>
            <Link to="/pooling" className={classes.Links}>
              <Button variant="outlined" color="primary" >
                pooling
              </Button>
            </Link>
          </nav>
        </MediaQuery>
      </>
    )

  } else {
    return (
      <>
        {/* パソコンサイズ */}
        <MediaQuery query="(min-width:768px)">
          <AppBar className={classes.header} >
            <Toolbar className={classes.header_bar}>
              <div className={classes.header_left}>
                <Link to="/home">
                  <img src={logo} alt="ロゴ" className={classes.header_logo} />
                </Link>
                <Paper
                  className={classes.Input_Paper}
                  elevation={0}
                  component="form"
                >
                  <InputBace
                    placeholder="design , photo , logo etc"
                    className={classes.InputBace}
                    onChange={setKey}
                  />
                  <IconButton size="medium" /* type="submit" */ onClick={() => history.push("/home" + seachKey)}>
                    <SeachIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </div>

              <div className={classes.header_buttons}>
                <Link to="/signUp" className={classes.Links}>
                  <Button variant="outlined">
                    sign up
                    </Button>
                </Link>
                <Link to="/login" className={classes.Links}>
                  <Button variant="outlined" color="primary" >
                    login
                    </Button>
                </Link>
              </div>

            </Toolbar>
          </AppBar>

        </MediaQuery>


        {/* タブレットサイズ */}
        <MediaQuery query="(max-width:767px)">
          <AppBar className={classes.header} >
            <Toolbar className={classes.header_bar}>
              <div className={classes.header_left}>
                <Link to="/home">
                  <img src={logoD} alt="ロゴ" className={classes.header_logo} />
                </Link>
                <Paper
                  className={classes.Input_PaperT}
                  elevation={0}
                  component="form"
                >
                  <InputBace
                    placeholder="design , photo , logo etc"
                    className={classes.InputBaceT}
                    onChange={setKey}
                  />
                  <IconButton size="medium" onClick={() => { history.push("/home" + seachKey) }}>
                    <SeachIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </div>
            </Toolbar>
          </AppBar>

          <nav className={classes.bottom_nav}>
            <Link to="/signUp" className={classes.bottomLeftButton}>
              <Button variant="outlined">
                sign up
                </Button>
            </Link>
            <Link to="/login" className={classes.bottomRightButton}>
              <Button variant="outlined" color="primary" >
                login
                </Button>
            </Link>
          </nav>

        </MediaQuery>
      </>
    )

  }
}

export default Head;