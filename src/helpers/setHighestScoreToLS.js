const highestScore = (score,setHighestScore) => {
    // Get the localStorage key
    const highestScoreFromLS = localStorage.getItem("highestScore");

    if (score > highestScoreFromLS) {
        localStorage.setItem("highestScore", score);
        setHighestScore(score)
    }
};

export default highestScore;
