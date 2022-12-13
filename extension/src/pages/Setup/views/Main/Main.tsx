import React from "react";
import VideoButton from "../../components/VideosButton/VideosButton";
import style from "./style.module.scss"

const Main = () => {
    
    return(
        <div className={style.main}>
            <div className={style.wrapper}>
                <span className={style.header}>Fix Your Netflix Experiment</span>
                <div className={style.button_wrapper}>
                   <VideoButton />
                </div>
            </div>
        </div>
    )
}



export default Main