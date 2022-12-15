import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useVideosURL } from "../hooks/useVideosURL";
import { useNavigate } from "react-router";
import MainMenuButton from "./MainMenuButton/MainMenuButton";

type T_PROPS = {
    
}

const VideosButton = (props:T_PROPS) => {
    const {videos, init_videos} = useVideosURL()
    const navigate = useNavigate()

    const handle_redirect = () => {
        navigate("/videos", {replace: true})
    }

    useEffect(() => {
        const init = async () : Promise<void> => {
            await init_videos()
        }

        init()
    }, [])

    return(
       <MainMenuButton 
        text={`Videos [${videos.length}]`}
        handle_click={handle_redirect}
       />
    )
}


export default VideosButton