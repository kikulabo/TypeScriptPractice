function fromKey<T extends string>(key: `user:${T}`): T {
	return key.slice(5) as T;
}
const user = fromKey("user:uhyo");

