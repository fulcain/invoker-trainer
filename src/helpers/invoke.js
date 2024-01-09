import setHighestScoreToLS from "../helpers/setHighestScoreToLS.js" 
import generateRandomSpell from "./generateRandomSpell.js";
const invoke = ({
    orbsArray,
    currentAnswer,
    showAnswerResult,
    setHighestScore,
    setScore,
    score,
    setCurrentAnswer,
}) => {
    const userOrbsArray = orbsArray.sort().join("");
    const actualAnswerArray = currentAnswer.orbs.split("").sort().join("");

    if (userOrbsArray !== actualAnswerArray) {
        // Change the answer result to wrong
        showAnswerResult("wrong!");

        // pass the highest score to set highest score function
        setHighestScoreToLS(score, setHighestScore);

        // set the score state to 0
        setScore(0);

        return;
    }

    const newSpell = generateRandomSpell();

    showAnswerResult("correct!");

    setCurrentAnswer(newSpell);

    setScore((prevScore) => prevScore + 1);
};

export default invoke;
