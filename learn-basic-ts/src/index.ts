type User = {
  name: string;
  age: number;
}

function createUser(name: string, age: number): User {
  if (name === "") {
    throw new Error("名前は空にできません！");
  }
  return {
    name,
    age
  };
}

function getMessage(user: User, message: string): string {
  return `${user.name} (${user.age}) 「${message}」`;
}

const uhyo = createUser("uhyo", 26);
console.log(getMessage(uhyo, "こんにちは"));
