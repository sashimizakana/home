# 家庭用システム

現状単なるメモ書くためのシステム。

## 設定情報

リポジトリに入れない設定ファイル。こんな感じで作るメモ。

### /aws.config.js

deployするときに使うAWSの設定情報入れる。
絶対リポジトリに入れない。

```js
module.exports = {
  api:{//AWSはIAM使ってS3だけにアクセスできるアカウント作るべき
    accessKeyId:"AWSのアクセスキー",
    secretAccessKey:"AWSのシークレットキー",
    region:"リージョン名"
  },
  bucketName:"S3のバケット名（ドメイン名になってるはず）"
};
```

### /vue/src/lib/firebase.config.js

firebaseのアクセス情報。コレ自体は基本的に公開情報になってても良いはず。
（アクセス制限そのものはfirebaseのコンソールからGoogleのアカウントIDで設定してあるから）

```js
export default {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
```

↑のjsonはfirebaseのコンソールからWebで利用するみたいなリンク先からコピペできる。