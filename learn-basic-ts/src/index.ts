try {
    console.log("エラーを発生させます");
    throwError();
    console.log("エラーを発生させました");
} catch (err) {
    console.log("エラーをキャッチしました");
    console.log(err);
}
console.log("おわり");
function throwError() {
    const error = new Error("エラーが発生しました！！！！！");
    throw error;
}
