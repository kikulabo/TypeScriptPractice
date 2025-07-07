# TypeScript基礎学習 - src ディレクトリ

このディレクトリには、TypeScriptの基本的な概念を学習するためのサンプルコードが含まれています。

## ファイル構成

### `index.ts`
TypeScriptの基本的なオブジェクト指向プログラミングの概念を学習するためのファイルです。

**含まれている内容:**
- **クラスの定義**: `User`クラスと`PremiumUser`クラス
- **プライベートフィールド**: `#age`を使用したプライベートフィールドの実装
- **継承**: `PremiumUser`が`User`クラスを継承
- **メソッドのオーバーライド**: `isAdult()`メソッドのオーバーライド
- **アクセス修飾子**: `public`キーワードの使用

**主要なクラス:**

#### `User`クラス
```typescript
class User {
    name: string;           // パブリックフィールド
    #age: number;          // プライベートフィールド
    
    constructor(name: string, age: number)
    public isAdult(): boolean  // 年齢が20歳以上かを判定
}
```

#### `PremiumUser`クラス
```typescript
class PremiumUser extends User {
    rank: number = 1;                    // デフォルト値付きフィールド
    public override isAdult(): boolean   // メソッドオーバーライド（常にtrue）
}
```

### `index.js`
`index.ts`をコンパイルして生成されたJavaScriptファイルです。TypeScriptコンパイラによって自動生成されたコードで、以下の特徴があります：

- ES5互換のクラス実装（function + prototype）
- 継承のためのヘルパー関数（`__extends`）
- プライベートフィールドは通常のプロパティとして出力

## 学習ポイント

1. **TypeScriptの型システム**: 変数とパラメータに型注釈を付ける
2. **プライベートフィールド**: `#`記号を使用したプライベートメンバの実装
3. **クラス継承**: `extends`キーワードを使用した継承
4. **メソッドオーバーライド**: `override`キーワードを使用したメソッドの上書き
5. **アクセス修飾子**: `public`, `private`などのアクセス制御

## 実行方法

```bash
# TypeScriptをコンパイル
npx tsc

# 生成されたJavaScriptを実行
node index.js
```

または、ts-nodeを使用して直接実行：

```bash
# TypeScriptを直接実行
npx ts-node index.ts
```

## 関連リンク

- [TypeScript公式ドキュメント - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript公式ドキュメント - Private Fields](https://www.typescriptlang.org/docs/handbook/2/classes.html#private-fields)
