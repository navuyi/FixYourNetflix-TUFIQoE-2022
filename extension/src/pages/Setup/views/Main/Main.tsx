import React, { useLayoutEffect } from "react";
import VideoButton from "../../components/VideosButton";

import style from "./style.module.scss"
import ExperimentStartButton from "../../components/ExperimentStartButton";
import { useExperimentStart } from "../../hooks/useExperimentStart";
import Loader from "../../components/Loader/Loader";
import SimpleNavigationButton from "../../components/SimpleNavigationButton";
import SubjectAgeInput from "../../components/SubjectAgeInput";
import SubjectIDInput from "../../components/SubjectIDInput";
import { useSetupInit } from "../../hooks/useSetupInit";
import MenuSelect from "../../components/MenuSelect";


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
                    <MenuSelect 
                        label="Subject sex"
                        id="subject_sex"
                        options={[{label: "Male", value:"male"},{label: "Female", value:"female"},{label: "Prefer not to disclose", value:"undisclosed"}, {label: "", value:""}]}
                    />
                    <MenuSelect 
                        label="Netflix familiarity"
                        id="subject_netflix_familiarity"
                        options={[{label: "Yes", value:true},{label: "No", value:false}, {label: "", value:""}]}
                    />
                    <MenuSelect 
                        label="Content chooser"
                        id="subject_selected_content"
                        options={[{label: "Subject", value: true},{label: "Admin", value: false}, {label: "", value:""}]}
                    />
                    <MenuSelect 
                        label="Content continuation"
                        id="content_continuation"
                        options={[{label: "Yes", value: true},{label: "No", value: false}, {label: "", value:""}]}
                    />
                    <SubjectIDInput value={nextExpID}/> 
                    {
                        starting ? <Loader /> : 
                        connected ? 
                        <ExperimentStartButton 
                            start_experiment={start_experiment}
                            set_starting={set_starting}
                        /> : <span className={style.info}>No server connection.</span>
                    }
                </div>
            </div>
        </div>
    )
}



export default Main