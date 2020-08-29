import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";


const useStyles = makeStyles(() => ({
  test: {
    backgroundColor: colors.gray2,
    '& span': {
      color: 'brown',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: colors.black
      }
    }
  }
}));

const Test = () => {
  // usestyle
  const classes = useStyles();
  return (

    <div className={classes.test}>
      <p>これは練習<span>コンポーネント</span>です</p>
    </div>
  );
}

export default Test;
