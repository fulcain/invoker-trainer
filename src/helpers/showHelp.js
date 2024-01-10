import silverBox from "/public/lib/silverBox/silverBox.min.js";

const showHelp = () => {
    // remove any previous silverBoxes
    silverBox({
        removeSilverBox: "all",
    });

    silverBox({
        showCloseButton: true,
        html: "<img src='./images/spells-help.webp'>",
    });
};

export default showHelp;
