import CurrentAnswer from "./CurrentAnswer";
import OrbsSection from "./OrbsSection";

const GameSection = ({ currentAnswer, orbsArray, createMobileOrbs }) => {
    return (
        <>
            <div className="flex flex-col gap-10 items-center justify-center">
                <CurrentAnswer currentAnswer={currentAnswer} />

                <OrbsSection
                    orbsArray={orbsArray}
                    createMobileOrbs={createMobileOrbs}
                />
            </div>
        </>
    );
};

export default GameSection;
