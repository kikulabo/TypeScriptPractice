/**
 * async/awaitの使用方法を学ぶチュートリアル
 */

// 1. 基本的なasync/awaitの使用方法
async function fetchData(): Promise<string> {
  // 非同期処理をシミュレート
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("データを取得しました！");
    }, 1000);
  });
}

async function main() {
  console.log("データ取得を開始します...");
  const result = await fetchData();
  console.log("取得したデータ:", result);
}

// 2. 複数の非同期処理の実行
async function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `ユーザー${userId}`,
      });
    }, 1000);
  });
}

async function fetchUserPosts(userId: number): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`投稿${userId}-1`, `投稿${userId}-2`]);
    }, 1500);
  });
}

async function getUserProfile(userId: number) {
  console.log("ユーザープロフィールの取得を開始...");
  
  // 並列で実行
  const [userData, posts] = await Promise.all([
    fetchUserData(userId),
    fetchUserPosts(userId)
  ]);

  console.log("ユーザー情報:", userData);
  console.log("投稿一覧:", posts);
}

// 3. async/awaitとPromiseの比較
// Promiseを使用した場合
function getDataWithPromise(): Promise<string> {
  return fetchData()
    .then(data => data.toUpperCase())
    .then(data => `処理済み: ${data}`);
}

// async/awaitを使用した場合
async function getDataWithAsyncAwait(): Promise<string> {
  const data = await fetchData();
  const upperData = data.toUpperCase();
  return `処理済み: ${upperData}`;
}

// 実行
async function runExamples() {
  console.log("=== 基本的なasync/awaitの例 ===");
  await main();

  console.log("\n=== 複数の非同期処理の例 ===");
  await getUserProfile(1);

  console.log("\n=== Promiseとasync/awaitの比較 ===");
  const promiseResult = await getDataWithPromise();
  const asyncAwaitResult = await getDataWithAsyncAwait();
  
  console.log("Promise結果:", promiseResult);
  console.log("async/await結果:", asyncAwaitResult);
}

// すべての例を実行
runExamples().then(() => {
  console.log("\nすべての処理が完了しました");
}); 
