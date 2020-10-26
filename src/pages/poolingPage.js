import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../commonStyles/colors";
import Head from "../components/header";
import Add from '@material-ui/icons/Add';

import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

import { useDropzone } from 'react-dropzone';

// import DummyWhite from "../images/dummyWhite.png";



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
    marginTop: "16px",
    marginBottom: "16px"
  },
  imagePreview: {
    // display: "block",
    // margin: "0 auto",
    width: "100%",
    maxWidth: "380px"
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


  let [tagValue, setTagValue] = useState("");
  const changeTagValue = (event) => {
    setTagValue(event.target.value);
  }
  const [textVal, setTtextVal] = useState(0);
  const changeTextVal = (event) => {
    setTtextVal(event.target.value.length);
  }
  const countDisplay = () => {
    document.getElementById("numberDisplay").innerHTML = textVal;
  }



  var initialTagArray = [
    {
      tagName: "test"
    },
    {
      tagName: "secondTag"
    },
  ]
  const [tags, setTags] = useState(initialTagArray);


  const addTag = () => {
    if (!tagValue) {
      alert("タグ名を入力してください");
      return
    }
    setTags(tags => [...tags, {
      tagName: tagValue
    }]);

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
    // console.log('onDropppppppppppppppppppppppp');
    // previewの追加
    setFiles(acceptedFiles.map(
      file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
  }

  const {
    // acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,

    onDrop
  });


  const imagePostTest = () => {
    alert("画像だけinsert処理");
  }


  return (
    <>
      <Head />
      <div className={classes.pageWrap}>
        <div>
          <Button variant="contained" onClick={() => console.log(tags)}>今のtags値</Button>
        </div>
        <p><span className={classes.accent}>※</span> タグ検索の為、複数タグ使用推奨</p>
        <div className={classes.addTagWrap}>
          <Button variant="outlined" endIcon={<Add />} className={classes.plusButton} onClick={addTag}>検索タグ追加</Button>
          <Input placeholder="タグ名入力(英語推奨)" onChange={changeTagValue} id="tagField" />
        </div>

        <ul className={classes.TagList}>
          {tags.map((tag, index) => (
            <li key={index}>
              <span className={classes.tagName}>{tag.tagName}</span>
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
            onChange={changeTextVal}
            onKeyUp={countDisplay}
          />
          <p className={classes.textLimit}><span id="numberDisplay">0</span> / 160</p>
        </div>



        {/* 受付データ画像表示 */}
        {/* <div>
          {acceptedFiles.map((file, index) => (
            <div key={index}>
              {file.path}
            </div>
          ))}
        </div> */}
        {files.map((file, index) => (
          <div key={index} className={classes.imagePreviewWrap}>
            <img
              src={file.preview} alt="プレビュー画像"
              className={classes.imagePreview}
              id="imagePreviewArea"
            />
          </div>
        ))}


        {/* ドロップゾーン */}
        <div className={classes.areaBack}>
          <div {...getRootProps({ className: 'dropzone' })} className={classes.dropArea}>
            <input {...getInputProps()} />
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
                {/* {e.code + ":" + e.message}<br /> */}
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

        {/* <Button variant="outlined" onClick={() => { console.log(acceptedFiles) }}>ファイル内容表示</Button> */}

        <Button
          className={classes.postButton}
          variant="outlined"
        >投稿</Button>

        <Button
          className={classes.postButton}
          variant="outlined"
          color="secondary"
          onClick={imagePostTest}
        >画像insertだけテストボタン</Button>
      </div>
    </>
  );
}

export default PoolingPage;