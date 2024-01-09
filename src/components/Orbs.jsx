import orbs from "../data/orbs";

const Orbs = ({ orb }) => {
    const orbImage = `./images/orbs/${orbs[orb]}.png`;
    return (
        <>
            <div className="w-[80px] h-[80px] flex justify-center bg-slate-900 text-white overflow-hidden">
                <img src={orbImage}></img>
            </div>
        </>
    );
};

export default Orbs;
