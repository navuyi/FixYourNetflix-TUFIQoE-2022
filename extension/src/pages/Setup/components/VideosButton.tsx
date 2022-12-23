import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useVideosURL } from "../hooks/useVideosURL";
import SimpleNavigationButton from "./SimpleNavigationButton";

const VideosButton = () => {
    const {videos, init_videos} = useVideosURL()

    useEffect(() => {
        const init = async () : Promise<void> => {
            await init_videos()
        }

        init()
    }, [])

    return(
        <SimpleNavigationButton 
            text={`Videos [${videos.length}]`}
            navigate_to={"videos"}
        />
    )
}


export default VideosButton