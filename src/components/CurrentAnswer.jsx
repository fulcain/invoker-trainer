const CurrentAnswer = ({ currentAnswer }) => {
    return (
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
    );
};

export default CurrentAnswer;
