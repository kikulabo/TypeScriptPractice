# TypeScript非同期処理チュートリアル

このチュートリアルでは、TypeScriptにおける非同期処理の基本的な概念と実践的な使用方法を学びます。

## 学習内容

1. Promiseの基本
2. async/awaitの使用方法
3. エラーハンドリング
4. 並列処理
5. 実際のユースケース

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

## ディレクトリ構造

```
src/
  ├── 01-promise-basics.ts    # Promiseの基本
  ├── 02-async-await.ts       # async/awaitの使用方法
  ├── 03-error-handling.ts    # エラーハンドリング
  ├── 04-parallel.ts          # 並列処理
  └── 05-real-world.ts        # 実際のユースケース
```

## 各セクションの説明

### 1. Promiseの基本
- Promiseの作成と使用方法
- then/catch/finallyの使い方
- Promiseチェーン

### 2. async/await
- async関数の宣言
- awaitキーワードの使用方法
- Promiseとasync/awaitの違い

### 3. エラーハンドリング
- try/catchの使用方法
- Promiseのエラーハンドリング
- エラーの伝播

### 4. 並列処理
- Promise.all
- Promise.race
- 並列処理の最適化

### 5. 実際のユースケース
- APIリクエスト
- ファイル操作
- データベース操作 
