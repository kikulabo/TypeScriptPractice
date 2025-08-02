type Human = {
    name: string;
    age: number;
};

function useMaybeHuman(human: Human | undefined) {
    const age = human?.age;
    console.log(age);
}
