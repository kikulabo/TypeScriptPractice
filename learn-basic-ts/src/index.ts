type Animal = {
	tag: "animal";
	species: string;
}
type Human = {
	tag: "human";
	name: string;
}
type Robot = {
	tag: "robot";
	name: string;
}

type User = Animal | Human | Robot;

function getUserName1(user: User): string {
	if (user.tag === "human") {
		return user.name;
	} else {
		return "名無し";
	}
}

function getUserName2(user: User): string {
switch (user.tag) {
	case "human":
		return user.name;
	case "animal":
		return "名無し";
	}
}
