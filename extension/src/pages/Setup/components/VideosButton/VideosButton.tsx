import React, { useLayoutEffect } from "react";
import style from "./style.module.scss"
import { useEffect } from "react";
import { useVideosURL } from "../../hooks/useVideosURL";
import { useNavigate } from "react-router";

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
        <>
            <button onClick={handle_redirect} className={style.button}>{`Videos [${videos.length}]`}</button>
        </>
    )
}


export default VideosButton