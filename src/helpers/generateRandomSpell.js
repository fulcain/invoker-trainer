import getRandomSpell from "./getRandomSpell";

const generateRandomSpell = () => {
    const { name, orbs, displayName } = getRandomSpell();
    return { name, orbs, displayName };
};

export default generateRandomSpell;
