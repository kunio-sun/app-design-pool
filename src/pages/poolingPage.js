import React, { useState } from "react";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import Lodash from "lodash";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Add from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

import { serv } from "../serv";
import Axios from 'axios';

import { useDropzone } from 'react-dropzone';

// import DummyWhite from "../images/dummyWhite.png";
// import DummyBlack from "../images/backGradient.png";



const useStyles = makeStyles((theme) => ({
  accent: {
    color: colors.accentC,
  },
  pageWrap: {
    margin: "120px auto",
    // backgroundColor: "orange",
    width: "80%",
    color: colors.gray1
  },
  addTagWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",

    // backgroundColor: "#abc",
    width: "350px",
    "& Input": {
      width: "180px"
    }
  },
  plusButton: {
    width: "160px",
    borderRadius: "20px",
    height: "40px",
  },
  TagList: {
    marginTop: "8px",
    marginBottom: "24px",
    paddingLeft: "0",
    listStyle: "none",
    "& li": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "8px",
      marginRight: "8px",
      padding: "4px 4px 4px 24px",
      boxSizing: "border-box",
      backgroundColor: colors.gray3,
      height: "40px",
      borderRadius: "20px",
    }
  },
  tagName: {
    paddingRight: "12px"
  },
  textBlock: {
    // backgroundColor: "#ddd",
  },
  textFieldDetail: {
    fontSize: "14px"
  },
  poolTextField: {
    width: "100%",
  },
  postButton: {
    display: "block",
    margin: "24px auto",
    width: "240px"
  },
  textLimit: {
    marginTop: "4px",
    textAlign: "right",
    fontSize: "14px",
  },
  areaBack: {
    backgroundColor: colors.gray3,
    padding: "12px 0",
  },
  dropArea: {
    position: "relative",
    boxSizing: "border-box",
    padding: "12px 24px",
    margin: "12px 24px",
    width: "calc(100% -48px)",
    height: "180px",
    backgroundColor: colors.gray3,
    border: "3px dashed" + colors.gray2,
    textAlign: "center",
    "& p": {
      position: "absolute",
      top: "50%",
      left: "0",
      transform: "translateY(-60%)",
      width: "100%",
      lineHeight: "2.4",
      // backgroundColor: "orange"
    }
  },
  fileSelectDammy: {
    backgroundColor: colors.white,
    border: "1px solid" + colors.gray2,
    padding: "4px 12px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "opacity .3s ",
    "&:hover": {
      opacity: "0.6"
    }
  },
  imagePreviewWrap: {
    marginTop: "2px",
    marginBottom: "12px"
  },
  imagePreview: {
    // display: "block",
    // margin: "0 auto",
    width: "100%",
    maxWidth: "240px",

  },
  rejectionsBlock: {
    paddingTop: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid" + colors.gray3,
    textAlign: "right",
  },
  test: {
    [theme.breakpoints.down("sm")]: {
      width: "red",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: "blue",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "green",
    },
    '& span': {
      '&:hover': {
        cursor: 'pointer',
      }
    }
  }
}));

const PoolingPage = () => {
  // usestyle
  const classes = useStyles();
  const history = useHistory();


  let [tagValue, setTagValue] = useState("");
  const changeTagValue = (event) => {
    setTagValue(event.target.value);
  }
  const [textValue, setTextValue] = useState("")
  const [textLength, setTtextLength] = useState(0);
  const changeTextLength = (event) => {
    setTtextLength(event.target.value.length);
    setTextValue(event.target.value);
  }
  const countDisplay = () => {
    document.getElementById("numberDisplay").innerHTML = textLength;
  }



  var initialTagArray = [
    "kunio092",
    "portfolio",
  ]
  const [tags, setTags] = useState(initialTagArray);


  const addTag = () => {
    if (!tagValue) {
      alert("タグ名を入力してください");
      return
    }
    setTags(tags => [...tags, tagValue]);

    // 入力値リセット
    document.getElementById("tagField").value = "";
    setTagValue("");
  }

  const removeTag = (index) => {
    // alert(index + 1 + "番目を消去");
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }




  const [files, setFiles] = useState([]);
  const onDrop = (acceptedFiles) => {
    console.log("画像がドロップされました");
    setFiles(acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

  const preview = files.map((file, index) => (
    <div key={index} className={classes.imagePreviewWrap}>
      <img
        src={file.preview} alt="プレビュー画像"
        className={classes.imagePreview}
        id="imagePreviewArea"
      />
    </div>
  ))

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxFilesize: 0.5,
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  const imagePost = () => {
    if (acceptedFiles.length === 0) {
      alert("画像が選択されていません");
      return //未送信
    }
    if (textValue === "") {
      alert("投稿テキストが入力されていません");
      return //未送信
    }
    if (tags.length === 0) {
      alert("tagは必ず1つ以上入力してください");
      return //未送信
    }

    let date = new Date();
    date.setTime(date.getTime() + 3240000); // 1000 * 60 * 60 * 9(hour)
    const year = String(date.getFullYear());
    const month = ("0" + String(date.getMonth() + 1)).slice(-2);
    const day = ("0" + String(date.getDate())).slice(-2);
    const hour = ("0" + String(date.getHours() - 1)).slice(-2);
    const minutes = ("0" + String(date.getMinutes())).slice(-2);
    const second = ("0" + String(date.getSeconds())).slice(-2);
    const unipuePostId = year + month + day + hour + minutes + second + "U";

    let sendParamsAtherFile = {
      postText: textValue,
      tagArray: tags,
    }


    const formData = new FormData();
    Lodash.forEach(sendParamsAtherFile, (value, key) => {
      if (Array.isArray(value)) {
        Lodash.forEach(value, (v, Lodash) => {
          formData.append(key + '[]', v)
        })
      } else {
        formData.append(key, value);
      }
    })
    formData.append("file", acceptedFiles[0], unipuePostId);

    const headers = { "content-type": "multipart/form-data" };

    Axios.post(
      serv + "imagePost",
      formData,
      { headers })
      .then((res) => {
        console.log(res)
        if (res.data === "成功") {
          alert("投稿完了");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err)
      })

  } // end imagePost



  return (
    <>
      <Head />
      <div className={classes.pageWrap}>
        <div>
          {/* <Button variant="contained" onClick={() => console.log(tags)}>今のtags値</Button> */}
        </div>
        <p><span className={classes.accent}>※</span> タグ検索の為、複数タグ使用推奨</p>
        <div className={classes.addTagWrap}>
          <Button variant="outlined" endIcon={<Add />} className={classes.plusButton} onClick={addTag}>検索タグ追加</Button>
          <Input placeholder="タグ名入力(英語推奨)" onChange={changeTagValue} id="tagField" />
        </div>

        <ul className={classes.TagList}>
          {tags.map((tag, index) => (
            <li key={index}>
              <span className={classes.tagName}>{tag}</span>
              <IconButton size="small" onClick={() => removeTag(index)}>
                <Close />
              </IconButton>
            </li>
          ))}
        </ul>

        <div className={classes.textBlock}>
          <span className={classes.textFieldDetail}>作品説明</span>
          <TextField
            className={classes.poolTextField}
            // label="本文入力欄"
            placeholder="ここから入力"
            multiline
            // rows="3"
            inputProps={{ maxLength: 160 }}
            onChange={changeTextLength}
            onKeyUp={countDisplay}
          />
          <p className={classes.textLimit}><span id="numberDisplay">0</span> / 160</p>
        </div>



        {/* 受付データ画像表示 */}
        <div>
          {acceptedFiles.map((file, index) => (
            <div key={index}>
              {file.path}
            </div>
          ))}
          {preview}
        </div>






        {/* ドロップゾーン */}
        <div className={classes.areaBack}>
          <div {...getRootProps({ className: 'dropzone' })} className={classes.dropArea}>
            <input {...getInputProps()} type="file" />
            {!isDragActive && (
              <p>
                このエリアに画像をドロップ<br />
                または<br />
                <span className={classes.fileSelectDammy}>ファイルを選択</span>
              </p>
            )}

            {isDragAccept && (<p>そのまま画像をドロップしてください</p>)}
            {/* ドラックファイルが画像以外の時 */}
            {isDragReject && (
              <p><span className={classes.accent}>※</span> 必ず画像ファイル(jpg , png)を選択してください</p>
            )}
          </div>
        </div>


        {/* 画像じゃない物or複数選択で表示 */}
        {fileRejections.map(({ file, errors }) => (
          <div key={file.path} className={classes.rejectionsBlock}>
            <span className={classes.accent}>※ </span>
            <span>受け付け拒否ファイル名 : </span>
            <span className={classes.accent}>{file.path}</span><br />
            {errors.map(e => (
              <span key={e.code}>
                {/* {e.code + ":" + e.message}<br /> */}ƒ
                {
                  (() => {
                    if (e.code === "file-invalid-type") {
                      return (<span>画像ファイル(jpg , png)ではありません。必ず画像を選択してください</span>);
                    }
                    if (e.code === "too-many-files") {
                      return (<span>選択できるファイルは1つのみとなります</span>);
                    }
                  })()
                }
              </span>
            ))}
          </div>
        ))}


        <Button
          className={classes.postButton}
          variant="outlined"
          onClick={imagePost}
        >投稿</Button>

      </div>
    </>
  );
}

export default PoolingPage;