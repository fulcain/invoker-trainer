import mobileOrbs from "../data/mobile-orbs.js";

const MobileOrbs = ({ createMobileOrbs }) => {
    return (
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
                        <img src={`./images/orbs/${orb.name}.png`}></img>
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
                <img src="./images/spells/invoke.png" alt="Invoke" />
            </div>
        </div>
    );
};

export default MobileOrbs;
