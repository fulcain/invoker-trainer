import { useEffect, useState } from "react";
import Orbs from "./components/Orbs";
import getRandomSpell from "./helpers/getRandomSpell";
function App() {
    const [orbsArray, setOrbsArray] = useState(["q", "q", "q"]);
    const [currentAnswer, setCurrentAnswer] = useState({
        name: "quas",
        orbs: "qqq",
    });

    let [score, setScore] = useState(0);

    const invoke = () => {
        const userOrbsArray = orbsArray.sort().join("");
        const actualAnswerArray = currentAnswer.orbs.split("").sort().join("");

        if (userOrbsArray !== actualAnswerArray) {
            return;
        }

        const { name, orbs } = generateRandomSpell();
        setCurrentAnswer({ name, orbs });
        setScore(++score);
    };

    // Creates the current answer
    const generateRandomSpell = () => {
        const randomSpell = getRandomSpell();

        const { name, orbs } = randomSpell;

        return { name, orbs };
    };

    // Create a random answer when the page loads
    useEffect(() => {
        const { name, orbs } = generateRandomSpell();

        setCurrentAnswer({ name, orbs });
    }, []);

    useEffect(() => {
        const availableKeys = ["q", "w", "e"];

        const handleOrbCreation = (e) => {
            const clickedKey = e.key.toLowerCase();

            // shallow copy of the orbs array
            const copyOfOrbsArray = [...orbsArray];

            // call the invoker function and pass in the orbArray

            if (clickedKey === "r") invoke();

            if (!availableKeys.includes(e.key)) return;

            // pop the last, add to the beginning
            copyOfOrbsArray.shift();
            copyOfOrbsArray.push(clickedKey);

            setOrbsArray(copyOfOrbsArray);
        };

        document.addEventListener("keydown", handleOrbCreation);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleOrbCreation);
        };
    }, [orbsArray]);

    return (
        <>
            <div className="bg-gray-100 p-[4px] rounded mb-4">Corret: {score}</div>

            <div className="flex flex-col gap-10 items-center justify-center">
                <img
                    className="w-[100px]"
                    src={`/public/images/spells/${currentAnswer.name}.webp`}
                ></img>

                <div className="flex flex-row gap-4">
                    <div className="flex items-center justify-center gap-2 flex-row">
                        {orbsArray.map((orb, orbIdx) => (
                            <Orbs orb={orb} key={orbIdx}></Orbs>
                        ))}
                    </div>

                    <div className="flex items-center justify-center flex-row max-w-[60px]">
                        <img src="/public/images/spells/invoke.png"></img>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
