import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import HeadAfterLogin from "../components/headerAfterLogin";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { serv } from "../serv"

//テストがぞう
import dummyIcon from "../images/userIcon/user02.jpg";
import postDummyImage from "../images/testImage/postImage.jpg";

import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  pageWrap: {
    marginTop: "180px",
    // backgroundColor: "orange",
    display: "flex",
    flexWrap: "wrap",
    color: colors.gray1,
  },
  leftWrap: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "120px",
      minHeight: "40vh",
      border: "none"
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(50% - 1px)",
      borderRight: "1px solid #ddd",
      minHeight: "100vh",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightWrap: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "60px",
      marginBottom: "120px",
      backgroundColor: colors.white,
      minHeight: "40vh",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      marginTop: "80px",
      backgroundColor: "#fcfcfc",
      minHeight: "100vh",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& img': {
      width: "400px"
    }
  },
  leftInner: {
    textAlign: "center",
    width: "80%",
    '& img': {
      width: "180px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "50%",
      boxShadow: "1px 1px 12px " + colors.gray3,
    },
    '& p': {
      color: colors.gray2,
      marginBottom: "0",
    },
    '& h2': {
      marginBottom: "60px",
      fontWeight: "normal",
    },
    '& Button': {
      width: "80%",
      height: "40px",
      borderRadius: "20px"
    }
  },
  rightInner: {
    width: "clamp(350px,80%,480px)",
    '& img': {
      width: "100%",
      height: "auto",
    },
    '& p': {
      fontSize: "14px"
    },

  },
  portfolioLink: {
    textDecoration: "none",
  },
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

const ContentPage = () => {
  const { imageName } = useParams();
  const dummyContent = {
    user_id: 1,
    icon: postDummyImage,
    name: "dummyName",
    img: postDummyImage,
    content: "dummycontent-dummycontent-dummycontent-dummycontent-dummycontent"
  }
  const classes = useStyles();

  const [contentInfo, setContentInfo] = useState([dummyContent]);
  const [contentImage, setContentImage] = useState(postDummyImage);
  const [icon, setIcon] = useState(dummyIcon);


  useEffect(() => {
    // console.log("前ページから送られてきた画像名は  " + imageName);
    axios.get(serv + "content?seachImageName=" + imageName)
      .then((res) => {
        // console.log("sql取得Dataは", res.data);
        setContentInfo(res.data);

        //res.data IConの画像名を画像データに書き換える
        getIconFile(res.data.icon);

        //res.data postDummyImageの画像名を画像データに書き換える
        getImageFile(res.data.img);
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

    const getImageFile = (imgName) => {
      // console.log(imgName + "fileをリクエスト");
      axios.get(serv + "getImageFile?img=" + imgName, { responseType: "blob" })
        .then((res) => {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          reader.onload = () => {
            const imageDataUrl = reader.result;
            setContentImage(imageDataUrl);
          }
        })
        .catch(console.error);
    }// end getImageFile()

  }, [imageName]);// end useEffect()

  return (
    <>
      <Head />
      <HeadAfterLogin />
      <div className={classes.pageWrap}>
        {/* 左側 */}
        <div className={classes.leftWrap}>
          <div className={classes.leftInner}>
            <img src={icon} alt="ユーザアイコン" />
            <p>created by</p>
            <h2>{contentInfo.name}</h2>
            {/* <Button color="secondary" onClick={() => console.log("現在のコンテンツ情報は", contentInfo)}>contentInfo表示</Button> */}
            <Link to={"/portfolio" + contentInfo.user_id} className={classes.portfolioLink}>
              <Button variant="outlined" color="default">
                作品集を見る
              </Button>
            </Link>

          </div>
        </div>

        {/* 右側 */}
        <div className={classes.rightWrap}>
          <div className={classes.rightInner}>
            <img src={contentImage} alt="投稿画像" />
            <p>{contentInfo.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentPage;