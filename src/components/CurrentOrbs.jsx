import Orbs from "../components/Orbs";

const CurrentOrbs = ({ orbsArray }) => {
    return (
        <>
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

                    <img src="./images/spells/invoke.png" alt="Invoke" />
                </div>
            </div>
        </>
    );
};

export default CurrentOrbs;
