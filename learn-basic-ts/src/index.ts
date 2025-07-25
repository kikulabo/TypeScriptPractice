type Animal = {
    species: string;
};
type Human = {
    name: string;
}
type User = Animal | Human;

const tama: User = {
    species: "Felis silvestris catus"
}

const uhyo: User = {
    name: "uhyo"
};
