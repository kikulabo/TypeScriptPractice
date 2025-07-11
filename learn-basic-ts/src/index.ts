type Human = {
    height: number;
    weight: number;
};
const calcBMI = function({ height, weight }: Human): number {
    return weight / height ** 2;
};
const uhyo: Human = { height: 1.84, weight: 72 };
console.log(calcBMI(uhyo));

const calcBMI_new = ({
    height, weight
}: Human): number => {
    return weight / height ** 2;
};
const uhyo_new: Human = { height: 1.84, weight: 72 };
console.log(calcBMI_new(uhyo_new));

const calcBMI_short = ({
    height, weight
}: Human): number => weight / height ** 2;
