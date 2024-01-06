import orbs from "../data/orbs";

const Orbs = ({ orb }) => {
    const orbImage = `/public/images/orbs/${orbs[orb]}.png`;
    return (
        <>
            <div className="w-[60px] h-[60px] rounded-full flex justify-center bg-slate-900 text-white overflow-hidden">
                <img src={orbImage}></img>
            </div>
        </>
    );
};

export default Orbs;
