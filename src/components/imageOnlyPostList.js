import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";
// import colors from "../commonStyles/colors"
import { Link, useParams } from "react-router-dom";
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
    },
  }
}));

const ImageOnlyPostList = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [iterateLastImage, setIterateLastImage] = useState("");

  // app.jsのroute パス :keyNameを指定(props)
  const { seachKey } = useParams();

  useEffect(() => {
    console.log('useEffectが実行されました')
    console.log("検索パラメータは", seachKey);
    const getImageName = () => {
      axios.get(serv + "getImageName")
        .then((res) => {
          console.log(res.data);
          res.data.forEach((obj, index) => {
            // console.log(obj.img);
            getImageFile(obj.img);
            // last image filename を次検索のため格納
            if (index === res.data.length - 1) {
              console.log("last element", obj.img);
              setIterateLastImage(obj.img);
            }

          });
        })
        .catch(console.error);
    }
    if (!seachKey) {
      getImageName();
    }
  }, [seachKey]);
  //,[]でuseeffectの記述が更新されても呼び出されず最初だけ呼ばれる
  //正確には多分seachKeyの変更により発火する物と思われる

  // getImage
  const getImageName = () => {
    axios.get(serv + "getImageName")
      .then((res) => {
        console.log(res.data);
        res.data.forEach((obj, index) => {
          // console.log(obj.img);
          getImageFile(obj.img);
          // last image filename を次検索のため格納
          if (index === res.data.length - 1) {
            console.log("last element", obj.img);
            setIterateLastImage(obj.img);
          }

        });
      })
      .catch(console.error);
  }

  const getImageFile = (imgName) => {
    console.log(imgName + "fileをリクエスト");
    axios.get(serv + "getImageFile?img=" + imgName, { responseType: "blob" })
      .then((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => {
          var imageDataUrl = reader.result;
          setImages((images => [...images, imageDataUrl]));
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
      <Button variant="contained" color="primary" onClick={() => getImageName()}>ゲットイメージname</Button>
      <Button variant="contained" color="secondary" onClick={() => console.log(iterateLastImage)}>繰り返し最後の画像名</Button>
      <Link to="/content">コンテンツページ仮リンク</Link>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.my_masonry_grid}
        columnClassName={classes.my_masonry_grid_column}
      >

        {images.map((src, index) => (
          <div className={classes.event_card} key={index}>
            <img src={src} key={index} alt={"画像" + index} />
          </div>
        ))}
      </Masonry>
    </>
  );
}

export default ImageOnlyPostList;
