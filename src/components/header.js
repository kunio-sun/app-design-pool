import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// 入力form
import Paper from "@material-ui/core/Paper";
import InputBace from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton"
import SeachIcon from "@material-ui/icons/Search"

//button 
import Button from "@material-ui/core/Button"

// Dpool logo
import logo from "../images/logo_designpool_normal.png";
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
    height: '40px',
  },
  header_left: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  Input_Paper: {
    marginLeft: '24px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.gray3,
    height: '44px',
    borderRadius: '22px'
  },
  InputBace: {
    padding: '0 0 0 20px',
    width: '24vw',
    minWidth: '240px',
    maxWidth: '400px',
  },
  header_buttons: {
    '& Button': {
      margin: '0 6px'
    }
  }
}));

const Head = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.header} >
      <Toolbar className={classes.header_bar}>
        <div className={classes.header_left}>
          <img src={logo} alt="ロゴ" className={classes.header_logo} />
          <Paper
            className={classes.Input_Paper}
            elevation="{0}"
            component="form"
          >
            <InputBace
              placeholder="design , photo , logo etc"
              className={classes.InputBace}
            />
            <IconButton size="medium" type="submit">
              <SeachIcon fontSize="small" />
            </IconButton>
          </Paper>
        </div>

        <div className={classes.header_buttons}>
          <Button variant="outlined">sign up</Button>
          <Button variant="outlined" color="primary">login</Button>
        </div>


      </Toolbar>
    </AppBar>
  )
}

export default Head;