import React from "react";
import style from "./style.module.scss"


const ExperimentFinished = () => {


    return(
        <div className={style.experiment_finished}>
            <span className={style.header}>Seans zakończony</span>
            <span className={style.sub_header}>Proszę powiadomić administratora eksperymentu</span>
        </div>
    )
}

export default ExperimentFinished