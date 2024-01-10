const addNewOrbToList = ({ orbsArray, setOrbsArray, orb }) => {
    const copyOfOrbsArray = [...orbsArray];
    copyOfOrbsArray.shift();
    copyOfOrbsArray.push(orb);
    setOrbsArray(copyOfOrbsArray);
};

export default addNewOrbToList;
