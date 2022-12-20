import React from "react";
import { T_VALIDATION_RESPONSE} from "../../../config/types/messages";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { T_SET_STARTING, T_START_EXPERIMENT } from "../hooks/useExperimentStart";
import { T_VALIDATE_SUBJECT_ID } from "../hooks/useSubjectID";
import MainMenuButton from "./MainMenuButton/MainMenuButton";

type T_PROPS = {
    validate_subject_id: T_VALIDATE_SUBJECT_ID,
    start_experiment: T_START_EXPERIMENT,
    set_starting: T_SET_STARTING
}

const ExperimentStartButton = (props : T_PROPS) => {
    
    const handle_click = async () => {
        props.set_starting(true)
        const result = await props.validate_subject_id() 
        if(result.valid === true){
            const variables = await ChromeStorage.get_experiment_variables()

            // Enable the extension 
            variables.experiment_running = true
            await ChromeStorage.set_experiment_variables(variables)

            // Start experiment
            await props.start_experiment()
        }
        else{
            props.set_starting(false)
            window.alert(result.message)
        }
    }
    
    return(
        <MainMenuButton
            text="Start"
            handle_click={handle_click}
        />
    )
}


export default ExperimentStartButton