import React from "react";
import { T_VALIDATION_RESPONSE} from "../../../config/types/messages";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import MainMenuButton from "./MainMenuButton/MainMenuButton";

type T_PROPS = {
    validate_subject_id: Function
}

const ExperimentStartButton = (props : T_PROPS) => {
    
    const handle_click = async () => {
        const result = await props.validate_subject_id() as T_VALIDATION_RESPONSE
        if(result.valid === true){
            const settings = await ChromeStorage.get_experiment_settings()
            const variables = await ChromeStorage.get_experiment_variables()

            // Enable the extension 
            variables.experiment_running = true
            await ChromeStorage.set_experiment_variables(variables)

            // Create experiment and video entry in database
            // TODO

            // Redirect to the first video in queue
            const first_video = settings.video_url[0]
            window.location.href = first_video
        }
        else{
            window.alert(result.message)
        }
    }
    
    return(
        <MainMenuButton
            text="Start"
            handle_click={handle_click}
            attributes={["primary", "secondary"]}
        />
    )
}


export default ExperimentStartButton