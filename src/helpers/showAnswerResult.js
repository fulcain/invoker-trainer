const showAnswerResult = (text, element) => {
    const color = text === "wrong!" ? "red" : "green";

    element.current.style.display = "flex";
    element.current.style.color = color;
    element.current.textContent = text;
};

export default showAnswerResult;
