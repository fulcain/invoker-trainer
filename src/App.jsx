import { useEffect, useState, useRef } from "react";
import Orbs from "./components/Orbs";
import mobileOrbs from "./data/mobile-orbs";
import invoke from "./helpers/invoke";
import generateRandomSpell from "./helpers/getRandomSpell";
import showHelpModal from "./helpers/showHelp";
import ShowHelp from "./components/ShowHelp";
import GameStatus from "./components/GameStatus";
import MobileOrbs from "./components/MobileOrbs";

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

            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center flex-col gap-4">
                    <div className="bg-gray-500 w-full flex items-center p-2 rounded justify-center">
                        {currentAnswer.displayName}
                    </div>

                    <img
                        className="w-[150px]"
                        src={`./images/spells/${currentAnswer.name}.webp`}
                        alt={currentAnswer.name}
                    />
                </div>

                <div className="flex flex-col items-center gap-5">
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center justify-center gap-2 flex-row">
                            {orbsArray.map((orb, orbIdx) => (
                                <Orbs orb={orb} key={orbIdx} />
                            ))}
                        </div>

                        <div className="hidden relative lg:flex items-center justify-center flex-row max-w-[80px]">
                            <div className="absolute px-2 -py-2 rounded bg-gray-100 top-0 left-0">
                                R
                            </div>

                            <img
                                src="./images/spells/invoke.png"
                                alt="Invoke"
                            />
                        </div>
                    </div>

                    <MobileOrbs createMobileOrbs={createMobileOrbs} />
                </div>
            </div>
        </>
    );
}

export default App;
