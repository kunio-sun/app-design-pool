import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";
import colors from "../commonStyles/colors"
import axios from "axios";
import { serv } from "../serv"

import { Button } from "@material-ui/core";


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
      border: "0.1px solid" + colors.gray3,
      boxShadow: "1px 1px 8px " + colors.gray3,
    },
  },
  morePreviewBtn: {
    marginTop: "40px",
    width: "100%",

  }
}));

const PostListProfile = (props) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [iterateLastImage, setIterateLastImage] = useState("");



  // app.jsのroute パス :keyNameを指定(props)
  const userId = props.loginState.uid;
  useEffect(() => {
    // imageViewの初期化
    // console.log("検索するuserIdは" + userId)
    setImages([]);

    // console.log('---useEffectが実行されました---')
    // console.log("検索パラメータは", userId);
    axios.get(serv + "getUserPostImage?userId=" + userId)
      .then((res) => {
        // console.log("reaponseDataは", res.data);
        res.data.forEach((obj, index) => {
          // console.log(obj.img);
          getImageFile(obj.img);
          // last image filename を次検索のため格納
          if (index === res.data.length - 1) {
            // console.log("last element", obj.img);
            setIterateLastImage(obj.img);
          }

        });
      })
      .catch(console.error);
  }, [userId]);


  const getImageNext = () => {
    // console.log("次の14件の画像を取得")
    // axios.get(serv + "getImageNext?lastImageName=" + iterateLastImage)
    axios.get(serv + "getUserPostImageNext", {
      params: {
        lastImageName: iterateLastImage,
        userId
      }
    })
      .then((res) => {
        // console.log("reaponseDataは", res.data);
        if (res.data.length === 0) {
          alert("現在このキーで取得できる画像はここまでとなります他の検索キーで検索してください");
        }
        res.data.forEach((obj, index) => {
          // console.log(obj.img);
          getImageFile(obj.img);
          // last image filename を次検索のため格納
          if (index === res.data.length - 1) {
            // console.log("last element", obj.img);
            setIterateLastImage(obj.img);
          }

        });
      })
      .catch(console.error);
  }

  const getImageFile = (imgName) => {
    // console.log(imgName + "fileをリクエスト");
    axios.get(serv + "getImageFile?img=" + imgName, { responseType: "blob" })
      .then((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => {
          const imageDataUrl = reader.result;
          const imageObjRow = { imageData: imageDataUrl, imageName: imgName };
          // console.log("画像の行", imageObjRow);
          setImages((images => [...images, imageObjRow]));
        }
      })
      .catch(console.error);
  }




  // 1行に表示するカラム数
  const breakpointColumnsObj = {
    default: 3,
    // 1350: 3,
    1048: 2,
    576: 1,
  }

  return (
    <>
      {/* <Button variant="contained" color="secondary" onClick={() => console.log(iterateLastImage)}>取得最後の画像</Button> */}
      {/* <Button variant="contained" color="default" onClick={() => console.log(images)}>images配列取得</Button> */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.my_masonry_grid}
        columnClassName={classes.my_masonry_grid_column}
      >

        {images.map((row, index) => (
          <div className={classes.event_card} key={index}>

            {/* <Link to={"/content" + row.imageName}> */}
            <img src={row.imageData} alt={"画像" + row.imageName} className={classes.postImage} />
            {/* </Link> */}
          </div>
        ))}
      </Masonry>
      <Button
        className={classes.morePreviewBtn}
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => getImageNext()}>
        さらに表示</Button>

      <h1>これは、ユーザ投稿詳細用のコンポーネントです</h1>
    </>
  );
}

export default PostListProfile;
