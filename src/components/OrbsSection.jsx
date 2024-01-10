import CurrentOrbs from "../components/CurrentOrbs"
import MobileOrbs from "../components/MobileOrbs"

const OrbsSection = ({orbsArray,createMobileOrbs}) => {
    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <CurrentOrbs orbsArray={orbsArray} />

                <MobileOrbs createMobileOrbs={createMobileOrbs} />
            </div>
        </>
    );
};

export default OrbsSection;
