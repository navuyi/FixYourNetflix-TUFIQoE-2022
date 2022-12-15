import React, { useLayoutEffect } from "react";
import VideoButton from "../../components/VideosButton";
import SubjectIDInput from "../../components/SubjectIDInput/SubjectIDInput";
import style from "./style.module.scss"
import { useSubjectID } from "../../hooks/useSubjectID";
import ExperimentStartButton from "../../components/ExperimentStartButton";

const Main = () => {
    const {subjectID, handle_subject_id_change, init_subject_id, validate_subject_id} = useSubjectID()


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
                </div>
                <div className={style.start_wrapper}>
                    <SubjectIDInput 
                        subject_id={subjectID}
                        handle_change={handle_subject_id_change}
                    />
                    <ExperimentStartButton 
                        validate_subject_id={validate_subject_id}
                    />
                </div>
            </div>
        </div>
    )
}



export default Main