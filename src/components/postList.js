import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";
import colors from "../commonStyles/colors"
import { Link } from "react-router-dom";

//仮画像
import postImage01 from "../images/testImage/img01.png";
import postImage02 from "../images/testImage/img02.png";
import postImage03 from "../images/testImage/img03.jpg";
import postImage04 from "../images/testImage/img04.png";
import postImage05 from "../images/testImage/img05.png";
import postImage06 from "../images/testImage/img06.png";
import postImage07 from "../images/testImage/img07.png";
import postImage08 from "../images/testImage/img08.png";
import postImage09 from "../images/testImage/img09.png";
import postImage10 from "../images/testImage/img10.png";
import postImage11 from "../images/testImage/img11.jpg";
import postImage12 from "../images/testImage/img12.jpg";
//icon
import icon01 from "../images/userIcon/user01.jpg";
import icon02 from "../images/userIcon/user02.jpg";

//gradient back
import backGradient from "../images/backGradient.png";


const useStyles = makeStyles(() => ({
  // Masonry style--
  my_masonry_grid: {
    display: "flex",
    marginLeft: "-30px", /* 項目間の余白のサイズ */
    width: "auto",
  },
  my_masonry_grid_column: {
    paddingLeft: "30px", /* 項目間の余白のサイズ */
  },
  event_card: {
    position: "relative",
    marginBottom: "16px",
    // backgroundColor: "orange",
    '& img': {
      width: "100%",
      height: "auto",
    },
    '& h3': {
      position: "absolute",
      bottom: "0",
      left: "0",
      display: "flex",
      alignItems: "flex-end",
      margin: "0",
      boxSizing: "border-box",
      paddingLeft: "6%",
      paddingBottom: "4%",
      width: "100%",
      height: "80px",
      backgroundImage: `url(${backGradient})`,
      // backgroundColor: "#abc",
      color: colors.white,
      fontWeight: "normal",
      fontSize: "16px",
      transform: "translateY(-2px)",
      '& img': {
        marginRight: "8px",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        objectFit: "cover"
      },
      '& span': {
        paddingBottom: "4px"
      }
    },
  }
}));

const PostList = () => {
  const classes = useStyles();
  // masonryで並べる要素
  const events = [
    {
      "icon": icon02,
      "name": "kunio092",
      "image": postImage01,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage02,
    },
    {
      "icon": icon02,
      "name": "kunio092",
      "image": postImage03,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage04,
    },
    {
      "icon": icon02,
      "name": "kunio092",
      "image": postImage05,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage06,
    },
    {
      "icon": icon02,
      "name": "kunio092",
      "image": postImage07,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage08,
    },
    {
      "icon": icon02,
      "name": "kunio092",
      "image": postImage09,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage10,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage11,
    },
    {
      "icon": icon01,
      "name": "katsuo_sun",
      "image": postImage12,
    },
  ]
  // 1行に表示するカラム数
  const breakpointColumnsObj = {
    default: 3,
    // 1350: 3,
    1048: 2,
    576: 1,
  }

  return (

    <Link to="/content">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.my_masonry_grid}
        columnClassName={classes.my_masonry_grid_column}
      >
        {events.map((e, index) => (

          <div className={classes.event_card} key={index}>
            <img src={e.image} alt={e.name + "の投稿"} />
            <h3>
              <img src={e.icon} alt={e.name + "のアイコン"} />
              <span>{e.name}</span>
            </h3>

          </div>
        ))}
      </Masonry>
    </Link>
  );
}

export default PostList;
