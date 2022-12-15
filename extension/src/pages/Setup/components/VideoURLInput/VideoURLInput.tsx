import React from "react";
import { useVideosURL } from "../../hooks/useVideosURL";
import style from "./style.module.scss"

type T_PROPS = {
    url: string,
    index: number,
    handle_change: Function
}

const VideoURLInput = (props:T_PROPS) => {

    return(
        <>
            <div className={style.wrapper}>
                <span className={style.index}>{props.index+1}</span>
                <input className={style.input} value={props.url} onChange={(e) => {props.handle_change(e, props.index)}}/>
            </div>
        </>
    )
}


export default VideoURLInput