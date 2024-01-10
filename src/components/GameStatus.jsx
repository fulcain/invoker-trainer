const GameStatus = ({ answerStatusElem, highestScore, score }) => {
    return (
        <>
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
        </>
    );
};

export default GameStatus;
