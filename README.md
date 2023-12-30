# アーマードコア6　賽投げシステム
アーマードコア6のアセンブルを、特定の条件からランダムで出力するシステムです。
## 使用方法
条件を初期状態から変更しない場合は画面上部にある**アセンブル生成**ボタンを押すとアセンブルと重量、EN負荷が表示されます。

任意のパーツを固定してアセンブルの作成を行いたい場合はそれぞれのパーツの横にあるトグルボタンを押すとパーツの指定が可能になり、指定したパーツは変更されなくなります。

積載超過や武装なしなどを許可したい場合は、画面右上の…ボタンを押してオプション画面を開き、**設定完了**を押してオプションの変更を確定させてから**アセンブル生成**ボタンを押すと、オプションが適用されたアセンブルが出力されます。

## 動作環境
+ Node.js: v20.10.0
+ pnpm: v8.13.1(npm:v10.2.5での動作確認済み)
+ svelte: v4.2.8
+ vite: v4.5.1
+ svelteKit: v1.30.3
+ svelte/adapter-auto: v2.1.1
+ autoprefixer: v10.4.16
+ postcss:  v8.4.32
+ tailwindcss: v3.4.0
+ daisyui: v3.9.4
+ volta:v1.1.1
## 構築方法
Windows、MacOS及びDebian系Linuxディストリビューションを対象に説明します。

また、gitはあらかじめインストールされているものとします。
### 0. node.js並びにnpmをインストール
Windowsの場合は[こちら](https://qiita.com/yasushi-jp/items/fd885d38f11d95e81328)、Macの場合は[こちら](https://qiita.com/gahoh/items/d2004f711748bf493f6a)を参考にインストールを行ってください。

Linuxの場合は以下のコマンドを実行して下さい。
```bash
$ sudo apt update
$ sudo apt install nodejs npm
$ sudo node -v 
```
### 1.リポジトリのクローン
windowsの場合はコマンドライン、MacOSの場合はターミナル、Linuxの場合はKonsoleやGnome端末などの端末エミュレータで以下のコマンドを実行してください

以下のコマンドについての説明は上記のツールのいずれかを使用することを前提とします
```
git clone
```
### 2.パッケージのインストール
開発にはpnpmを使用していますが、ここではnpmを使用した方法を説明します
```
cd armoredcore6-assemble-randomizer
npm install
```
### 3.システムの起動
```
npm run dev
```
ブラウザでlocalhost:5173にアクセスする
## ライセンス
このプロジェクトのライセンスはMITライセンスです。詳細についてはLICENSEファイルをご覧ください。