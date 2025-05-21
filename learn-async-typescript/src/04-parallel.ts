/**
 * 非同期処理における並列処理を学ぶチュートリアル
 */

// 1. Promise.allの基本的な使用方法
async function fetchData(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`データ${id}を取得しました`);
    }, 1000 * id); // 異なる時間で完了するように
  });
}

async function parallelFetch() {
  console.log("並列でデータを取得開始...");
  const startTime = Date.now();

  const results = await Promise.all([
    fetchData(1),
    fetchData(2),
    fetchData(3)
  ]);

  const endTime = Date.now();
  console.log("取得結果:", results);
  console.log(`所要時間: ${endTime - startTime}ms`);
}

// 2. Promise.raceの使用例
async function fetchWithTimeout(id: number, timeout: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`データ${id}を取得しました`);
    }, timeout);
  });
}

async function raceExample() {
  console.log("\nPromise.raceの例を開始...");
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("タイムアウト")), 2000);
  });

  try {
    const result = await Promise.race([
      fetchWithTimeout(1, 3000),
      timeoutPromise
    ]);
    console.log("成功:", result);
  } catch (error) {
    console.error("エラー:", error instanceof Error ? error.message : "不明なエラー");
  }
}

// 3. Promise.allSettledの使用例
async function fetchWithRandomError(id: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`データ${id}を取得しました`);
      } else {
        reject(new Error(`データ${id}の取得に失敗しました`));
      }
    }, 1000);
  });
}

async function allSettledExample() {
  console.log("\nPromise.allSettledの例を開始...");
  
  const results = await Promise.allSettled([
    fetchWithRandomError(1),
    fetchWithRandomError(2),
    fetchWithRandomError(3)
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`データ${index + 1}取得成功:`, result.value);
    } else {
      console.log(`データ${index + 1}取得失敗:`, result.reason);
    }
  });
}

// 4. 並列処理の最適化
async function fetchUserData(userId: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `ユーザー${userId}`
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

async function optimizedParallelFetch() {
  console.log("\n最適化された並列処理の例を開始...");
  
  const userIds = [1, 2, 3];
  
  // ユーザーデータと投稿を並列で取得
  const userPromises = userIds.map(id => fetchUserData(id));
  const postPromises = userIds.map(id => fetchUserPosts(id));
  
  const [users, posts] = await Promise.all([
    Promise.all(userPromises),
    Promise.all(postPromises)
  ]);

  // 結果の表示
  users.forEach((user, index) => {
    console.log(`ユーザー${user.id}の情報:`, user);
    console.log(`ユーザー${user.id}の投稿:`, posts[index]);
  });
}

// 実行
async function runExamples() {
  console.log("=== Promise.allの基本的な使用例 ===");
  await parallelFetch();

  console.log("\n=== Promise.raceの使用例 ===");
  await raceExample();

  console.log("\n=== Promise.allSettledの使用例 ===");
  await allSettledExample();

  console.log("\n=== 最適化された並列処理の例 ===");
  await optimizedParallelFetch();
}

// すべての例を実行
runExamples().then(() => {
  console.log("\nすべての処理が完了しました");
}); 
