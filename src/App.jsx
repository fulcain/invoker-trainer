import { useEffect, useState, useRef } from "react";
import Orbs from "./components/Orbs";
import getRandomSpell from "./helpers/getRandomSpell";
import setHighestScoreToLS from "./helpers/setHighestScoreToLS";
function App() {
    const [orbsArray, setOrbsArray] = useState(["q", "q", "q"]);
    const [currentAnswer, setCurrentAnswer] = useState({
        name: "quas",
        orbs: "qqq",
    });
    const [score, setScore] = useState(0);
    const answerStatusElem = useRef(null);

    // Initalize the highest score
    const prevHighestScore = localStorage.getItem("highestScore");
    if (!prevHighestScore) localStorage.setItem("highestScore", 0);
    const [highestScore, setHighestScore] = useState(prevHighestScore);

    const generateRandomSpell = () => {
        const { name, orbs, displayName } = getRandomSpell();
        return { name, orbs, displayName };
    };

    const invoke = () => {
        const userOrbsArray = orbsArray.sort().join("");
        const actualAnswerArray = currentAnswer.orbs.split("").sort().join("");

        if (userOrbsArray !== actualAnswerArray) {
            // Change the answer result to wrong
            showAnswerResult("wrong!");

            // pass the highest score to set highest score function
            setHighestScoreToLS(score,setHighestScore);

            // set the score state to 0
            setScore(0);

            return;
        }

        const newSpell = generateRandomSpell();

        showAnswerResult("correct!");

        setCurrentAnswer(newSpell);

        setScore((prevScore) => prevScore + 1);
    };

    useEffect(() => {
        const { name, orbs, displayName } = generateRandomSpell();
        setCurrentAnswer({ name, orbs, displayName });
    }, []);

    const showAnswerResult = (text) => {
        const color = text === "wrong!" ? "red" : "green";

        answerStatusElem.current.style.display = "flex";
        answerStatusElem.current.style.color = color;
        answerStatusElem.current.textContent = text;
    };

    useEffect(() => {
        const availableKeys = ["q", "w", "e"];

        const handleOrbCreation = (e) => {
            const clickedKey = e.key.toLowerCase();

            if (clickedKey === "r") invoke();

            if (!availableKeys.includes(e.key)) return;

            const copyOfOrbsArray = [...orbsArray];
            copyOfOrbsArray.shift();
            copyOfOrbsArray.push(clickedKey);
            setOrbsArray(copyOfOrbsArray);
        };

        document.addEventListener("keydown", handleOrbCreation);

        return () => {
            document.removeEventListener("keydown", handleOrbCreation);
        };
    }, [orbsArray, currentAnswer]);
    return (
        <>
            <div className="mb-4 text-white gap-2 flex items-center justify-center">
                <span>Status: </span>
                <span ref={answerStatusElem}>not answered yet</span>
            </div>
            <div className=" bg-green-400 p-[4px] rounded mb-4">
                Highest Score: {highestScore}
            </div>
            <div className=" bg-gray-100 p-[4px] rounded mb-4">
                Current Score: {score}
            </div>

            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center flex-col gap-4">
                    <div className="bg-gray-200 w-full flex items-centet justify-center">
                        {currentAnswer.displayName}
                    </div>
                    <img
                        className="w-[150px]"
                        src={`./images/spells/${currentAnswer.name}.webp`}
                        alt={currentAnswer.name}
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex items-center justify-center gap-2 flex-row">
                        {orbsArray.map((orb, orbIdx) => (
                            <Orbs orb={orb} key={orbIdx} />
                        ))}
                    </div>
                    <div className="relative flex items-center justify-center flex-row max-w-[60px]">
                        <div className="absolute px-2 -py-2 rounded bg-gray-100 top-0 left-0">R</div>
                        <img src="./images/spells/invoke.png" alt="Invoke" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
