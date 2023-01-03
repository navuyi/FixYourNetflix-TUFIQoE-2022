import React, { useLayoutEffect } from "react";
import VideoButton from "../../components/VideosButton";

import style from "./style.module.scss"
import ExperimentStartButton from "../../components/ExperimentStartButton";
import { useExperimentStart } from "../../hooks/useExperimentStart";
import Loader from "../../components/Loader/Loader";
import SimpleNavigationButton from "../../components/SimpleNavigationButton";
import SubjectAgeInput from "../../components/SubjectAgeInput";
import SubjectIDInput from "../../components/SubjectIDInput";
import SubjectSexSelect from "../../components/SubjectSexSelect";
import { useSetupInit } from "../../hooks/useSetupInit";


const Main = () => {
    const {starting, start_experiment, set_starting} = useExperimentStart()
    const {connected, get_next_experiment_id, nextExpID} = useSetupInit()

    useLayoutEffect(() => {
        get_next_experiment_id()
    }, [])

    return(
        <div className={style.main}>
            <div className={style.wrapper}>
                <span className={style.header}>Fix Your Netflix Experiment</span>
                <div className={style.button_wrapper}>
                    <VideoButton />
                    <SimpleNavigationButton 
                        text="About"
                        navigate_to="about"
                    />
                </div>
                <div className={style.start_wrapper}>
                    <SubjectAgeInput />
                    <SubjectSexSelect />
                    <SubjectIDInput value={nextExpID}/> 
                    {
                        starting ? <Loader /> : 
                        <ExperimentStartButton 
                            start_experiment={start_experiment}
                            set_starting={set_starting}
                        />
                    }
                </div>
            </div>
        </div>
    )
}



export default Main