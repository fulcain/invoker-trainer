import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import showHelp from "../helpers/showHelp.js"

const ShowHelp = () => {
    return (
        <>
            <Tooltip
                title="Press h to show help"
                arrow
                TransitionComponent={Zoom}
            >
                <div
                    className="fixed top-[5%] right-[10%] bg-white text-black px-4 py-2 rounded-full cursor-pointer"
                    onClick={showHelp}
                >
                    ?
                </div>
            </Tooltip>
        </>
    );
};

export default ShowHelp;
