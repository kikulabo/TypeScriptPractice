/**
 * 非同期処理におけるエラーハンドリングを学ぶチュートリアル
 */

// 1. 基本的なエラーハンドリング
async function fetchDataWithError(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldError = Math.random() > 0.5;
      if (shouldError) {
        reject(new Error("データの取得に失敗しました"));
      } else {
        resolve("データを取得しました！");
      }
    }, 1000);
  });
}

// try-catchを使用したエラーハンドリング
async function handleErrorWithTryCatch() {
  try {
    console.log("データ取得を開始...");
    const result = await fetchDataWithError();
    console.log("成功:", result);
  } catch (error) {
    console.error("エラーが発生:", error instanceof Error ? error.message : "不明なエラー");
  } finally {
    console.log("処理が完了しました");
  }
}

// 2. Promiseチェーンでのエラーハンドリング
function handleErrorWithPromiseChain() {
  fetchDataWithError()
    .then(result => {
      console.log("成功:", result);
      return result.toUpperCase();
    })
    .then(upperResult => {
      console.log("大文字変換:", upperResult);
    })
    .catch(error => {
      console.error("エラーが発生:", error instanceof Error ? error.message : "不明なエラー");
    })
    .finally(() => {
      console.log("処理が完了しました");
    });
}

// 3. カスタムエラークラス
class DataFetchError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'DataFetchError';
  }
}

async function fetchDataWithCustomError(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldError = Math.random() > 0.5;
      if (shouldError) {
        reject(new DataFetchError("データの取得に失敗しました", 500));
      } else {
        resolve("データを取得しました！");
      }
    }, 1000);
  });
}

// 4. エラーの伝播と処理
async function processData() {
  try {
    const data = await fetchDataWithCustomError();
    console.log("データ処理成功:", data);
  } catch (error) {
    if (error instanceof DataFetchError) {
      console.error(`カスタムエラー発生: ${error.message} (ステータス: ${error.statusCode})`);
    } else {
      console.error("予期せぬエラーが発生:", error);
    }
  }
}

// 5. 複数の非同期処理のエラーハンドリング
async function fetchMultipleData() {
  try {
    const results = await Promise.all([
      fetchDataWithError(),
      fetchDataWithError(),
      fetchDataWithError()
    ]);
    console.log("すべてのデータ取得成功:", results);
  } catch (error) {
    console.error("一部のデータ取得に失敗:", error);
  }
}

// 実行
async function runExamples() {
  console.log("=== try-catchを使用したエラーハンドリング ===");
  await handleErrorWithTryCatch();

  console.log("\n=== Promiseチェーンでのエラーハンドリング ===");
  handleErrorWithPromiseChain();

  console.log("\n=== カスタムエラーの処理 ===");
  await processData();

  console.log("\n=== 複数の非同期処理のエラーハンドリング ===");
  await fetchMultipleData();
}

// すべての例を実行
runExamples().then(() => {
  console.log("\nすべての処理が完了しました");
}); 
