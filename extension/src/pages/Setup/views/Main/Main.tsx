import React, { useLayoutEffect } from "react";
import VideoButton from "../../components/VideosButton";
import SubjectIDInput from "../../components/SubjectIDInput/SubjectIDInput";
import style from "./style.module.scss"
import { useSubjectID } from "../../hooks/useSubjectID";
import ExperimentStartButton from "../../components/ExperimentStartButton";
import { Spinner } from "react-bootstrap";
import { useExperimentStart } from "../../hooks/useExperimentStart";
import Loader from "../../components/Loader/Loader";
import SimpleNavigationButton from "../../components/SimpleNavigationButton";


const Main = () => {
    const {subjectID, handle_subject_id_change, init_subject_id, validate_subject_id} = useSubjectID()
    const {starting, start_experiment, set_starting} = useExperimentStart()

    useLayoutEffect(() => {
        const init = async () : Promise<void> => {
            await init_subject_id()
        }

        init()
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
                    <SubjectIDInput 
                        subject_id={subjectID}
                        handle_change={handle_subject_id_change}
                    />
                    {
                        starting ? <Loader /> : 
                        <ExperimentStartButton 
                            validate_subject_id={validate_subject_id}
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