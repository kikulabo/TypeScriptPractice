## 注意

このノートは生成AIによって作成されたものです。内容が正しいものかどうかは保証できませんので、必ず自分で確認してください。

## TypeScript オブジェクト指向プログラミング入門チュートリアル

オブジェクト指向プログラミング（OOP）は、現実世界の物事（オブジェクト）をモデル化し、それらの相互作用としてプログラムを構築する考え方です。コードの再利用性、保守性、拡張性を高めるのに役立ちます。TypeScriptはクラスベースのOOPを強力にサポートしています。

**前提条件:**

* 基本的なTypeScriptの構文（変数宣言、関数、型アノテーションなど）を理解していること。
* Node.js と npm (または yarn) がインストールされていること。
* TypeScriptコンパイラ (`tsc`) がインストールされていること (`npm install -g typescript`)。

**環境設定:**

1.  作業ディレクトリを作成します: `mkdir ts-oop-tutorial && cd ts-oop-tutorial`
2.  TypeScript設定ファイルを作成します: `tsc --init`
    * `tsconfig.json` ファイルが生成されます。デフォルト設定で十分ですが、必要に応じて `outDir`（コンパイル後のJSファイルの出力先）などを設定できます。例: `"outDir": "./dist"`
3.  チュートリアル用のファイルを作成します: `touch tutorial.ts`

---

### ステップ1: クラスとオブジェクトの基本

OOPの中心となるのが「クラス」と「オブジェクト」です。

* **クラス (Class):** オブジェクトの設計図やテンプレートです。どのようなデータ（プロパティ）を持ち、どのような振る舞い（メソッド）をするかを定義します。
* **オブジェクト (Object):** クラスの設計図に基づいて実際に作られた実体（インスタンス）です。

簡単な `Greeter` クラスを作ってみましょう。

```typescript
// tutorial.ts

class Greeter {
    // プロパティ (データ)
    greeting: string;

    // コンストラクタ (オブジェクト生成時に呼ばれる特別なメソッド)
    constructor(message: string) {
        this.greeting = message;
        console.log("Greeterオブジェクトが作成されました！");
    }

    // メソッド (振る舞い)
    greet(): void {
        console.log(this.greeting);
    }
}

// クラスからオブジェクト (インスタンス) を生成
// 'new' キーワードを使ってコンストラクタを呼び出す
const myGreeter = new Greeter("こんにちは、TypeScript！");

// オブジェクトのメソッドを呼び出す
myGreeter.greet(); // 出力: こんにちは、TypeScript！

// オブジェクトのプロパティにアクセスする (通常はメソッド経由が推奨される)
console.log(myGreeter.greeting); // 出力: こんにちは、TypeScript！
```

**解説:**

1.  `class Greeter { ... }` で `Greeter` という名前のクラスを定義します。
2.  `greeting: string;` で `greeting` という名前の `string` 型のプロパティを宣言します。
3.  `constructor(message: string) { ... }` はコンストラクタです。`new Greeter(...)` でオブジェクトが作られる際に自動的に実行されます。引数 `message` を受け取り、`this.greeting` に代入しています。`this` は生成されるオブジェクト自身を指します。
4.  `greet(): void { ... }` は `greet` という名前のメソッド（クラスに属する関数）です。`this.greeting` をコンソールに出力します。`: void` はこのメソッドが何も値を返さないことを示します。
5.  `const myGreeter = new Greeter("...");` で `Greeter` クラスの新しいインスタンス（オブジェクト）を作成し、`myGreeter` 変数に格納します。この時コンストラクタが呼ばれます。
6.  `myGreeter.greet();` で `myGreeter` オブジェクトの `greet` メソッドを実行します。

**コンパイルと実行:**

1.  ターミナルで `tsc tutorial.ts` を実行します。（`tsconfig.json` で `outDir` を設定した場合は `tsc` だけでOK）
2.  JavaScriptファイル（例: `tutorial.js` または `dist/tutorial.js`）が生成されます。
3.  `node tutorial.js` (または `node dist/tutorial.js`) を実行して結果を確認します。

---

### ステップ2: アクセス修飾子 (Encapsulation)

カプセル化は、クラスの内部データ（プロパティ）を隠蔽し、外部からの直接アクセスを制限するOOPの重要な概念です。これにより、意図しない変更を防ぎ、クラスの利用方法を明確にします。TypeScriptではアクセス修飾子を使います。

* `public`: (デフォルト) どこからでもアクセス可能。
* `private`: そのクラスの内部からのみアクセス可能。
* `protected`: そのクラスの内部、およびそのクラスを継承したサブクラスの内部からのみアクセス可能。

`Animal` クラスを例に見てみましょう。

```typescript
// tutorial.ts (前のコードは削除またはコメントアウトしてください)

class Animal {
    public name: string; // どこからでもアクセス可能
    private age: number;  // Animalクラス内部からのみアクセス可能
    protected species: string; // Animalクラスとサブクラスからアクセス可能

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    public displayInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Species: ${this.species}`);
        // クラス内部からは private, protected なメンバーにもアクセスできる
    }

    // privateメンバーに安全にアクセスするためのpublicメソッド (Getter)
    public getAge(): number {
        return this.age;
    }
}

const leo = new Animal("Leo", 5, "Lion");

// Publicメンバーへのアクセス
console.log(leo.name); // 出力: Leo
leo.displayInfo();     // 出力: Name: Leo, Age: 5, Species: Lion

// Privateメンバーへの直接アクセスはエラーになる
// console.log(leo.age); // エラー: Property 'age' is private and only accessible within class 'Animal'.

// Getterメソッド経由でのアクセス
console.log(`Leo's age is: ${leo.getAge()}`); // 出力: Leo's age is: 5

// Protectedメンバーへの直接アクセスもクラス外部からはエラーになる
// console.log(leo.species); // エラー: Property 'species' is protected and only accessible within class 'Animal' and its subclasses.

// パラメータプロパティ (より簡潔な書き方)
class Plant {
    // コンストラクタの引数にアクセス修飾子を付けると、
    // 同名のプロパティ宣言と代入を自動で行ってくれる
    constructor(public name: string, private type: string) {}

    public getType(): string {
        return this.type;
    }
}

const rose = new Plant("Rose", "Flower");
console.log(rose.name);      // 出力: Rose
console.log(rose.getType()); // 出力: Flower
// console.log(rose.type); // エラー
```

**解説:**

* `private` な `age` にはクラス外部から直接アクセスできませんが、`public` な `getAge` メソッドを通じて値を取得できます。これにより、内部構造を隠蔽しつつ必要な情報を提供できます。
* `protected` な `species` もクラス外部からはアクセスできません（継承については次のステップで説明します）。
* **パラメータプロパティ** は、コンストラクタの引数にアクセス修飾子 (`public`, `private`, `protected`, `readonly`) をつけることで、プロパティ宣言とコンストラクタ内での `this.xxx = xxx` の代入を省略できる便利な記法です。

---

### ステップ3: 継承 (Inheritance)

継承は、既存のクラス（親クラス、スーパークラス、基底クラス）の機能を引き継いで新しいクラス（子クラス、サブクラス、派生クラス）を作成する仕組みです。コードの再利用性を高めます。

`Animal` クラスを継承して `Dog` クラスを作ってみましょう。

```typescript
// tutorial.ts (前の Animal, Plant クラス定義は残しておく)

class Dog extends Animal { // 'extends'キーワードでAnimalクラスを継承
    public breed: string; // Dogクラス固有のプロパティ

    constructor(name: string, age: number, breed: string) {
        // 子クラスのコンストラクタでは、まず親クラスのコンストラクタを呼び出す必要がある
        super(name, age, "Canine"); // super()で親クラス(Animal)のコンストラクタを呼び出す
        this.breed = breed;
        // 継承したprotectedメンバーにはサブクラス内からアクセス可能
        console.log(`Species set to: ${this.species}`);
    }

    // Dogクラス固有のメソッド
    public bark(): void {
        console.log(`${this.name} says Woof!`);
    }

    // 親クラスのメソッドをオーバーライド (上書き)
    public displayInfo(): void {
        // super.メソッド名() で親クラスのメソッドを呼び出すことも可能
        super.displayInfo();
        console.log(`Breed: ${this.breed}`); // Dog固有の情報を追加
    }
}

const buddy = new Dog("Buddy", 3, "Golden Retriever");

// 継承したプロパティやメソッドが使える
console.log(buddy.name);       // 出力: Buddy (Animalから継承)
console.log(buddy.getAge());   // 出力: 3 (Animalから継承)
// console.log(buddy.species); // エラー: protected なので外部からはアクセス不可

// Dog固有のプロパティやメソッドも使える
console.log(buddy.breed);      // 出力: Golden Retriever
buddy.bark();                  // 出力: Buddy says Woof!

// オーバーライドされたメソッドの呼び出し
buddy.displayInfo();
// 出力:
// Name: Buddy, Age: 3, Species: Canine
// Breed: Golden Retriever
```

**解説:**

1.  `class Dog extends Animal { ... }` で `Animal` を継承した `Dog` クラスを定義します。
2.  `Dog` は `Animal` の `public` および `protected` なメンバー（プロパティとメソッド）をすべて引き継ぎます。`private` なメンバーは引き継がれません。
3.  サブクラス (`Dog`) のコンストラクタでは、自身のプロパティを初期化する前に `super(...)` を使って親クラス (`Animal`) のコンストラクタを呼び出す必要があります。これにより、親クラスで定義されたプロパティが正しく初期化されます。
4.  `Dog` クラスは独自のプロパティ (`breed`) やメソッド (`bark`) を追加できます。
5.  `displayInfo` メソッドのように、親クラスと同じ名前とシグネチャ（引数の型と数、戻り値の型）を持つメソッドをサブクラスで再定義することを**オーバーライド**といいます。これにより、サブクラス固有の振る舞いを実装できます。`super.displayInfo()` で親クラスの元のメソッドを呼び出すことも可能です。

---

### ステップ4: ポリモーフィズム (Polymorphism)

ポリモーフィズム（多様性、多態性）は、異なるクラスのオブジェクトが、同じインターフェース（メソッド呼び出し）に対して、それぞれのクラスで定義された固有の動作をする性質を指します。継承とメソッドのオーバーライドによって実現されることが多いです。

```typescript
// tutorial.ts (前のコードは残しておく)

class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age, "Feline");
    }

    // Cat用に displayInfo をオーバーライド
    public displayInfo(): void {
        console.log(`Meow! I'm ${this.name}, a ${this.species}. Age: ${this.getAge()}`);
    }

    public purr(): void {
        console.log(`${this.name} is purring...`);
    }
}

const whiskers = new Cat("Whiskers", 2);

// Animal型の配列に、異なるサブクラスのインスタンスを格納できる
const myPets: Animal[] = [];
myPets.push(leo);      // Animalオブジェクト
myPets.push(buddy);    // Dogオブジェクト
myPets.push(whiskers); // Catオブジェクト

console.log("\n--- Pet Parade ---");

// 同じメソッド呼び出しでも、オブジェクトの実際の型に応じて異なる動作をする
myPets.forEach(pet => {
    pet.displayInfo(); // ここがポリモーフィズム！
    // pet.bark(); // エラー: 'Animal'型には'bark'メソッドがない
    // pet.purr(); // エラー: 'Animal'型には'purr'メソッドがない

    // 型ガードを使って特定のサブクラスのメソッドを呼び出す
    if (pet instanceof Dog) {
        pet.bark(); // Dogインスタンスならbark()を呼ぶ
    } else if (pet instanceof Cat) {
        pet.purr(); // Catインスタンスならpurr()を呼ぶ
    }
    console.log("---");
});
```

**解説:**

1.  `Animal` 型の配列 `myPets` に、`Animal`, `Dog`, `Cat` のインスタンスを格納しています。これは、`Dog` も `Cat` も `Animal` の一種（サブクラス）だから可能です。
2.  `forEach` ループ内で `pet.displayInfo()` を呼び出すと、`pet` が現在どのクラスのインスタンスであるか（`Animal` か `Dog` か `Cat` か）に応じて、それぞれのクラスでオーバーライドされた `displayInfo` メソッドが実行されます。これがポリモーフィズムです。同じ `displayInfo()` という呼び出し方で、オブジェクトの種類によって振る舞いが変わります。
3.  `pet` の型は `Animal` と宣言されているため、`Dog` や `Cat` 固有のメソッド（`bark`, `purr`）を直接呼び出すことはできません。呼び出したい場合は `instanceof` 演算子などを使って型をチェック（型ガード）する必要があります。

---

### ステップ5: 抽象クラス (Abstract Classes)

抽象クラスは、それ自体をインスタンス化（`new`）することはできない、不完全なクラスです。サブクラスが実装すべきメソッド（抽象メソッド）のシグネチャだけを定義したり、共通の実装を提供したりするために使います。

```typescript
// tutorial.ts (前のコードはコメントアウト推奨)

// abstractキーワードで抽象クラスを定義
abstract class Shape {
    // 通常のプロパティやメソッドも持てる
    constructor(public color: string) {}

    public displayColor(): void {
        console.log(`Color: ${this.color}`);
    }

    // 抽象メソッド: シグネチャのみ定義し、実装はサブクラスに強制する
    // abstractキーワードを付け、メソッド本体 ({}) を書かない
    abstract calculateArea(): number;
    abstract displayInfo(): void;
}

// const myShape = new Shape("Red"); // エラー: Cannot create an instance of an abstract class.

// 抽象クラスを継承するクラスは、すべての抽象メソッドを実装する必要がある
class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    // 抽象メソッドの実装
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    displayInfo(): void {
        this.displayColor();
        console.log(`Type: Circle, Radius: ${this.radius}, Area: ${this.calculateArea().toFixed(2)}`);
    }
}

class Rectangle extends Shape {
    constructor(color: string, public width: number, public height: number) {
        super(color);
    }

    // 抽象メソッドの実装
    calculateArea(): number {
        return this.width * this.height;
    }

    displayInfo(): void {
        this.displayColor();
        console.log(`Type: Rectangle, Width: ${this.width}, Height: ${this.height}, Area: ${this.calculateArea()}`);
    }
}

const redCircle = new Circle("Red", 5);
const blueRectangle = new Rectangle("Blue", 10, 4);

const shapes: Shape[] = [redCircle, blueRectangle];

console.log("\n--- Shape Info ---");
shapes.forEach(shape => {
    shape.displayInfo(); // ポリモーフィズムにより、適切な displayInfo / calculateArea が呼ばれる
    console.log("---");
});
```

**解説:**

* `abstract class Shape` は直接 `new Shape(...)` できません。
* `abstract calculateArea(): number;` は抽象メソッドです。`Shape` を継承する `Circle` や `Rectangle` は、このメソッドを必ず実装（オーバーライド）しなければなりません。実装しないとコンパイルエラーになります。
* 抽象クラスは、サブクラス間で共通の構造や実装（`color` プロパティや `displayColor` メソッドなど）を提供しつつ、具体的な振る舞い（`calculateArea` など）の実装はサブクラスに委ねたい場合に便利です。

---

### ステップ6: インターフェース (Interfaces)

インターフェースは、オブジェクトが持つべきプロパティやメソッドの「形状」や「契約」を定義します。クラスとは異なり、実装（メソッド本体やプロパティの初期値）を持つことはできません（TypeScript 3.x以前）。クラスが特定のインターフェースを「実装 (`implements`)」する場合、そのインターフェースで定義されたすべてのメンバーをクラス内に実装する必要があります。

```typescript
// tutorial.ts (前のコードはコメントアウト推奨)

// インターフェースの定義: オブジェクトの形状を定義
interface Loggable {
    // プロパティの型定義
    logPrefix: string;

    // メソッドのシグネチャ定義 (実装は含まない)
    log(message: string): void;
}

interface Serializable {
    serialize(): string;
}

// クラスは複数のインターフェースを実装できる (implementsキーワード)
// クラスは1つしか継承できない (extends) が、インターフェースは複数実装可能
class ConsoleLogger implements Loggable, Serializable {
    logPrefix: string;

    constructor(prefix: string) {
        this.logPrefix = prefix;
    }

    // Loggableインターフェースの実装
    log(message: string): void {
        console.log(`${this.logPrefix}: ${message}`);
    }

    // Serializableインターフェースの実装
    serialize(): string {
        return JSON.stringify({ prefix: this.logPrefix });
    }
}

class User implements Loggable {
    constructor(public name: string, public userId: number) {}

    // Loggableインターフェースの実装
    logPrefix: string = "USER"; // プロパティに初期値を与えることも可能

    log(message: string): void {
        console.log(`${this.logPrefix} [${this.userId}] ${this.name}: ${message}`);
    }
}

const logger = new ConsoleLogger("INFO");
logger.log("Application started.");
console.log(logger.serialize());

const user = new User("Alice", 123);
user.log("Logged in.");

// インターフェースを型として使用する
function processLog(item: Loggable): void {
    item.log("Processing item...");
}

processLog(logger); // ConsoleLoggerはLoggableを実装しているので渡せる
processLog(user);   // UserはLoggableを実装しているので渡せる

// オブジェクトリテラルもインターフェースの形状を満たせば代入可能
const simpleLog: Loggable = {
    logPrefix: "DEBUG",
    log: (msg) => console.log(`[${simpleLog.logPrefix}] ${msg}`)
};
processLog(simpleLog);
```

**解説:**

* `interface Loggable { ... }` で、`logPrefix` という `string` 型のプロパティと、`log` というメソッド（`string` を受け取り `void` を返す）を持つべき、という契約を定義します。
* `class ConsoleLogger implements Loggable, Serializable { ... }` は、`Loggable` と `Serializable` の両方のインターフェースを実装することを宣言しています。そのため、クラス内に `logPrefix`, `log()`, `serialize()` のすべてを実装する必要があります。
* インターフェースは、クラスが特定の機能や構造を持つことを保証するための「契約」として機能します。異なるクラスでも同じインターフェースを実装していれば、そのインターフェース型として一貫して扱うことができます（`processLog` 関数の例）。
* クラスだけでなく、通常のオブジェクトリテラルも、インターフェースが定義する形状（プロパティ名と型、メソッド名とシグネチャ）を満たしていれば、そのインターフェース型として扱うことができます。

---

### まとめ

このチュートリアルでは、TypeScriptにおけるオブジェクト指向プログラミングの基本的な概念をステップバイステップで学びました。

* **クラスとオブジェクト:** 設計図と実体
* **コンストラクタ:** オブジェクト初期化
* **プロパティとメソッド:** データと振る舞い
* **アクセス修飾子 (`public`, `private`, `protected`):** カプセル化
* **継承 (`extends`, `super`):** コードの再利用
* **メソッドオーバーライド:** サブクラス固有の振る舞い
* **ポリモーフィズム:** 同じインターフェースで異なる動作
* **抽象クラス (`abstract`):** インスタンス化できないテンプレート、抽象メソッドによる実装強制
* **インターフェース (`interface`, `implements`):** オブジェクトの形状や契約の定義
