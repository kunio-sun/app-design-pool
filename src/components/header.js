import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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
const Head = () => {
  const classes = useStyles();

  // useState フォーム入力情報保持---
  const [seachKey, setSeachKey] = useState("");
  const setKey = (event) => {
    setSeachKey(event.target.value);
  }
  return (
    <>
      {/* パソコンサイズ */}
      <MediaQuery query="(min-width:768px)">
        <AppBar className={classes.header} >
          <Toolbar className={classes.header_bar}>
            <div className={classes.header_left}>
              <Link to="/">
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
                <IconButton size="medium" type="submit" onClick={() => alert(seachKey)}>
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
              <Link to="/">
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
                />
                <IconButton size="medium" type="submit">
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

export default Head;