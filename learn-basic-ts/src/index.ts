type GetTimeFunc = () => Date;
function useTime(getTimeFunc: GetTimeFunc | undefined) {
    const timeOrUndefined = getTimeFunc?.();
}
