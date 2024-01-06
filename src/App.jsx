import { useEffect, useState } from "react";
import Orbs from "./components/Orbs";
import getRandomSpell from "./helpers/getRandomSpell";

function App() {
    const [orbsArray, setOrbsArray] = useState(["q", "q", "q"]);
    const [currentAnswer, setCurrentAnswer] = useState({
        name: "quas",
        orbs: "qqq",
    });
    const [score, setScore] = useState(0);

    const generateRandomSpell = () => {
        const { name, orbs } = getRandomSpell();
        return { name, orbs };
    };

    const invoke = () => {
        const userOrbsArray = orbsArray.sort().join("");
        const actualAnswerArray = currentAnswer.orbs.split("").sort().join("");
        
        if (userOrbsArray !== actualAnswerArray) return;

        const newSpell = generateRandomSpell();
        setCurrentAnswer(newSpell);
        setScore((prevScore) => prevScore + 1);
    };

    useEffect(() => {
        const { name, orbs } = generateRandomSpell();
        setCurrentAnswer({ name, orbs });
    }, []);

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
            <div className="bg-gray-100 p-[4px] rounded mb-4">
                Correct: {score}
            </div>

            <div className="flex flex-col gap-10 items-center justify-center">
                <img
                    className="w-[100px]"
                    src={`./images/spells/${currentAnswer.name}.webp`}
                    alt={currentAnswer.name}
                />
                <div className="flex flex-row gap-4">
                    <div className="flex items-center justify-center gap-2 flex-row">
                        {orbsArray.map((orb, orbIdx) => (
                            <Orbs orb={orb} key={orbIdx} />
                        ))}
                    </div>
                    <div className="flex items-center justify-center flex-row max-w-[60px]">
                        <img
                            src="./images/spells/invoke.png"
                            alt="Invoke"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
