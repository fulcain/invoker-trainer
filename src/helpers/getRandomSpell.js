import abilities from "../data/abilities";

const getRandomSpell = () => {
    return abilities[Math.floor(Math.random() * 10)];
};

export default getRandomSpell;
