const highestScore = (score) => {
   // Get the localStorage key
   const highestScoreFromLS = localStorage.getItem("highestScore");

    if(score> highestScoreFromLS){
        localStorage.setItem("highestScore", score)
    }
}

export default highestScore
