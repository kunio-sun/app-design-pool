import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";
import colors from "../commonStyles/colors"
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
  },
  postImage: {
    width: "100%",
    height: "auto",
    border: "0.1px solid" + colors.gray3,
    boxShadow: "1px 1px 8px " + colors.gray3,
    transition: "opacity 0.3s",
    '&:hover': {
      opacity: "0.7"
    }
  },
  morePreviewBtn: {
    marginTop: "40px",
    width: "100%",
  }
}));

const ImageOnlyPostList = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [iterateLastImage, setIterateLastImage] = useState("");

  // app.jsのroute パス :keyNameを指定(props)
  const { seachKey } = useParams();
  // 画像取得が0かあるかのbool
  let hasResponseImage;

  useEffect(() => {
    // imageViewの初期化
    setImages([]);

    // console.log('---useEffectが実行されました---')
    // console.log("検索パラメータは", seachKey);
    axios.get(serv + "getImageName?seachKey=" + seachKey)
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
  }, [seachKey]);
  //,[]でuseeffectの記述が更新されても呼び出されず最初だけ呼ばれる
  //正確には多分seachKeyの変更により発火する物と思われる


  // getImage
  const getImageNext = () => {
    // console.log("次の14件の画像を取得")
    // axios.get(serv + "getImageNext?lastImageName=" + iterateLastImage)
    axios.get(serv + "getImageNext", {
      params: {
        lastImageName: iterateLastImage,
        seachKey
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

      { images.length === 0 && <div>キーワード「{seachKey}」で取得できる画像はありません</div>}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.my_masonry_grid}
        columnClassName={classes.my_masonry_grid_column}
      >
        {images.map((row, index) => (
          <div className={classes.event_card} key={index}>

            <Link to={"/content" + row.imageName}>
              <img src={row.imageData} alt={"画像" + row.imageName} className={classes.postImage} />
            </Link>
          </div>
        ))}
      </Masonry>


      {
        images.length > 0 &&
        <Button
          className={classes.morePreviewBtn}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => getImageNext()}>
          さらに表示</Button>
      }

    </>
  );
}

export default ImageOnlyPostList;
