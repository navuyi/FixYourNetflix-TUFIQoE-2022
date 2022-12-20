import { useState } from "react";

export type T_START_EXPERIMENT = () => Promise<void>
export type T_SET_STARTING = (value:boolean) => void

export const useExperimentStart = () => {
    const [starting, setStarting] = useState(false)

    const start_experiment : T_START_EXPERIMENT = async () => {
        const experiment_id = await create_experiment()
        const video_id = await create_video(experiment_id)

        // TODO continue here
    }
    
    const create_experiment = async () : Promise<number> => {
        // axios create expriment
        return 1
    }

    const create_video = async (experiment_id : number) : Promise<void> => {
        // axios create video
    }

    const set_starting : T_SET_STARTING = (value : boolean) => {
        setStarting(value)
    }


    return {
       start_experiment,
       set_starting,
       starting
    }

}