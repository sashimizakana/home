# 家庭用システム

現状単なるメモ書くためのシステム。

## 構成

### /private

実際に記事書いたりする管理画面。
非公開のドメインとか、ローカルとかに置いとくと良い。
よしんば公開上においても、firebaseの設定ちゃんとしておけば問題ない。
vueでフロントエンド書いて、そのままfirebase databaseにメモ等を保存する。
publishすると公開設定にしてあるfirebase storageに目次とファイルを作成する。

### /public

文章を公開する場所。
firebase hostingで公開していて、firebase storageから目次と記事のjsonを読む。
単純な作りなのでvuexとか使ってない。↓が実際に公開してるやつ。
https://text.denkizakana.com

## npm run scripts

### npm run deploy-private

S3上の管理ページを上書きするやつ

### npm run deploy-public

公開用ページを上書きするやつ

### npm run config-cors

Google storageのCORSの設定をするコマンド
gsutilインストール必須。gcloud initも必要。
```sh
npm run config-cors <gs://みたいなストレージのアドレス>
```
で実行する。

## 設定情報

リポジトリに入れない設定ファイル。こんな感じで作るメモ。

### /aws-config.js

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

### /private/vue/src/lib/firebase-config.js

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

### /cors-config.json

Google storageのcors設定用json
gsutilのコマンドから使う(npm run scriptのnpm run config-corsで実行するようにしてある)

```json
[
  {
    "origin": ["http://localhost:8080"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```
