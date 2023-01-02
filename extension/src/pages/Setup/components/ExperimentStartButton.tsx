import React from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { T_SET_STARTING, T_START_EXPERIMENT } from "../hooks/useExperimentStart";
import MainMenuButton from "./MainMenuButton/MainMenuButton";

type T_PROPS = {
    start_experiment: T_START_EXPERIMENT,
    set_starting: T_SET_STARTING
}

const ExperimentStartButton = (props : T_PROPS) => {
    

    const handle_click = async () => {
        const variables = await ChromeStorage.get_experiment_variables()

        // Enable the extension 
        variables.experiment_running = true
        await ChromeStorage.set_experiment_variables(variables)

        // Start experiment
        await props.start_experiment()
    }
    
    return(
        <MainMenuButton
            text="Start"
            handle_click={handle_click}
        />
    )
}


export default ExperimentStartButton