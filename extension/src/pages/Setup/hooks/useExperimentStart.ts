import axios from "axios";
import { useState } from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { post_new_experiment } from "../../../utils/http_requests/post_new_experiment";
import { post_new_video } from "../../../utils/http_requests/post_new_video";
import { get_local_datetime } from "../../../utils/time_utils";

export type T_START_EXPERIMENT = () => Promise<void>
export type T_SET_STARTING = (value:boolean) => void

export const useExperimentStart = () => {
    const [starting, setStarting] = useState(false)

    const start_experiment : T_START_EXPERIMENT = async () => {
        const experiment_id = await create_experiment()
        const video_id = await create_video(experiment_id)

        const variables = await ChromeStorage.get_experiment_variables()
        variables.database_experiment_id = experiment_id
        variables.database_video_id = video_id
        await ChromeStorage.set_experiment_variables(variables)

        // Redirect to the first video
        const {video_url} = await ChromeStorage.get_experiment_settings()
        window.location.href = video_url[0]
    }
    
    const create_experiment = async () : Promise<number> => {
        const settings = await ChromeStorage.get_experiment_settings()
        const data = {
            started: get_local_datetime(new Date()),
            video_limit: settings.video_url.length,
            subject_id: settings.subject_id,
            settings: JSON.stringify(settings),
            urls: JSON.stringify(settings.video_url)
        }
        const experiment_id = await post_new_experiment(data) 
        return experiment_id
    }

    const create_video = async (experiment_id : number) : Promise<number> => {
        const settings = await ChromeStorage.get_experiment_settings()
        const data = {
            started: get_local_datetime(new Date()),
            experiment_id: experiment_id,
            url: settings.video_url[0]
        }
        const video_id = await post_new_video(data)
        return video_id
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