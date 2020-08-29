CREATE TABLE user
(
  user_id INT(12)
  AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR
  (24) NOT NULL,
  mail VARCHAR
  (256) NOT NULL,
  password VARCHAR
  (256) NOT NULL,
  icon VARCHAR
  (256) NOT NULL,
  profile VARCHAR
  (256)
);


  INSERT INTO user
    (name,mail,password,icon,profile)
  VALUES(
      "kunio092",
      "kunio092@gmail.com" ,
      "kuni4649" , "/images/firstIcon.png",
      "デザイン受注いつでも承っております。得意ジャンルはDTPデザイン、webデザイン、logoデザイン。今まで受注製作させていただいた作品で公開可能な物や自主制作してきた作品、コンテスト応募で作成した物をポートフォリオとして投稿する為にdesign poolを利用させて頂きました。お仕事の依頼はお手数ですがメールアドレスまでお願いいたします。"
);

  CREATE TABLE post
  (
    post_id INT(24)
    AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_id INT
    (12) NOT NULL,
  img VARCHAR
    (256) NOT NULL,
  content VARCHAR
    (256) NOT NULL
);



    CREATE TABLE post_key
    (
      post_id INT(24) NOT NULL,
      `key` VARCHAR
      (32) NOT NULL
  );
