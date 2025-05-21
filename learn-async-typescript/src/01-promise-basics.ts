/**
 * Promiseの基本を学ぶチュートリアル
 */

// 1. 基本的なPromiseの作成
const basicPromise = new Promise<string>((resolve, reject) => {
  // 非同期処理をシミュレート
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("処理が成功しました！");
    } else {
      reject(new Error("処理が失敗しました"));
    }
  }, 1000);
});

// Promiseの使用
basicPromise
  .then((result) => {
    console.log("成功:", result);
  })
  .catch((error) => {
    console.error("エラー:", error.message);
  })
  .finally(() => {
    console.log("処理が完了しました");
  });

// 2. Promiseチェーン
const promiseChain = new Promise<number>((resolve) => {
  setTimeout(() => resolve(1), 1000);
});

promiseChain
  .then((value) => {
    console.log("最初の値:", value);
    return value * 2;
  })
  .then((value) => {
    console.log("2倍の値:", value);
    return value + 3;
  })
  .then((value) => {
    console.log("3を足した値:", value);
  });

// 3. Promise.allの使用例
const promise1 = Promise.resolve(1);
const promise2 = new Promise<number>((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
const promise3 = new Promise<number>((resolve) => {
  setTimeout(() => resolve(3), 2000);
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("すべてのPromiseが完了:", values);
  });

// 4. 実際のユースケース: データの取得をシミュレート
interface User {
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `ユーザー${id}`,
      });
    }, 1000);
  });
}

// ユーザーデータの取得
fetchUser(1)
  .then((user) => {
    console.log("ユーザー情報:", user);
  });

// 実行結果を確認するために少し待機
setTimeout(() => {
  console.log("\nすべての処理が完了しました");
}, 3000); 
