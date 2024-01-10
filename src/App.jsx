import { useEffect, useState, useRef } from "react";
import Orbs from "./components/Orbs";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import mobileOrbs from "./data/mobile-orbs";
import invoke from "./helpers/invoke";
import generateRandomSpell from "./helpers/getRandomSpell";
import showHelp from "./helpers/showHelp";

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
            if (e.key === "h") showHelp();
        });
    }, []);

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
            <Tooltip
                title="Press h to show help"
                arrow
                TransitionComponent={Zoom}
            >
                <div
                    className="fixed top-[5%] right-[10%] bg-white text-black px-4 py-2 rounded-full cursor-pointer"
                    onClick={showHelp}
                >
                    ?
                </div>
            </Tooltip>

            <div className="mb-4 bg-gray-500 rounded-md p-2 gap-1 flex items-center justify-center">
                <span>Status: </span>
                <span ref={answerStatusElem}>not answered yet</span>
            </div>

            <div className="rounded-md text-center p-2 bg-green-400 mb-4">
                Highest Score: {highestScore}
            </div>

            <div className="rounded-md text-center p-2 bg-gray-500 mb-4">
                Current Score: {score}
            </div>

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

                    <div className="lg:hidden flex flex-row gap-4">
                        <div className="flex items-center justify-start gap-2 flex-row">
                            {mobileOrbs.map((orb, orbIdx) => (
                                <div
                                    onClick={() => {
                                        createMobileOrbs(orb.spell);
                                    }}
                                    key={orbIdx}
                                    className="w-[80px] h-[80px] flex justify-center bg-slate-900 text-white overflow-hidden"
                                >
                                    <img
                                        src={`./images/orbs/${orb.name}.png`}
                                    ></img>
                                </div>
                            ))}
                        </div>

                        <div
                            onClick={() => {
                                createMobileOrbs("r");
                            }}
                            className="relative flex items-center justify-center flex-row max-w-[80px]"
                        >
                            <div className="absolute px-2 -py-2 rounded bg-gray-100 top-0 left-0">
                                R
                            </div>
                            <img
                                src="./images/spells/invoke.png"
                                alt="Invoke"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
