function getAverage(nums: number[]) {
    if (nums.length === 0) {
        throw new Error("配列が空です");
    }
    return sum(nums) / nums.length;
}
