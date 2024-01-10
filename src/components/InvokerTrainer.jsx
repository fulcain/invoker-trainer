
import { useEffect, useState, useRef } from "react";
import invoke from "../helpers/invoke";
import generateRandomSpell from "../helpers/getRandomSpell";
import showHelpModal from "../helpers/showHelp";

// Components
import ShowHelp from "../components/ShowHelp";
import GameStatus from "../components/GameStatus";
import GameSection from "../components/GameSection"

function InvokerTrainer() {
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
    const [highestScore, setHighestScore] = useState(prevHighestScore ?? 0);

    // Add event for showing the Invoker help
    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.key === "h") showHelpModal();
        });
    }, []);

    // Generate random spell on page load
    useEffect(() => {
        const { name, orbs, displayName } = generateRandomSpell();
        setCurrentAnswer({ name, orbs, displayName });
    }, []);

    const createMobileOrbs = (orb) => {
        if (orb === "r") {
            invoke({
                orbsArray,
                currentAnswer,
                setHighestScore,
                setScore,
                score,
                answerStatusElem,
                setCurrentAnswer,
            });
            return;
        }

        const copyOfOrbsArray = [...orbsArray];
        copyOfOrbsArray.shift();
        copyOfOrbsArray.push(orb);
        setOrbsArray(copyOfOrbsArray);
    };

    useEffect(() => {
        const availableKeys = ["q", "w", "e"];

        const handleOrbCreation = (e) => {
            const clickedKey = e.key.toLowerCase();

            if (clickedKey === "r")
                invoke({
                    orbsArray,
                    currentAnswer,
                    setHighestScore,
                    setScore,
                    score,
                    answerStatusElem,
                    setCurrentAnswer,
                });

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
            <ShowHelp />

            <GameStatus
                answerStatusElem={answerStatusElem}
                highestScore={highestScore}
                score={score}
            />

            <GameSection
                currentAnswer={currentAnswer}
                orbsArray={orbsArray}
                createMobileOrbs={createMobileOrbs}
            />
        </>
    );
}

export default InvokerTrainer;
