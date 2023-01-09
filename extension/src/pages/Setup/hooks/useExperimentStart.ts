import axios from "axios";
import { useState } from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { post_new_experiment } from "../../../utils/http_requests/post_new_experiment";
import { post_new_video } from "../../../utils/http_requests/post_new_video";
import { remove_whitespaces } from "../../../utils/string_utils";
import { get_local_datetime } from "../../../utils/time_utils";

export type T_START_EXPERIMENT = () => Promise<void>
export type T_SET_STARTING = (value:boolean) => void

export const useExperimentStart = () => {
    const [starting, setStarting] = useState(false)

    const start_experiment : T_START_EXPERIMENT = async () => {
        setStarting(true)
        const res = await validate_settings()

        if(res.valid === false){
            window.alert(res.msg)
            setStarting(false)
            return
        }

        const experiment_id = await create_experiment()
        const video_id = await create_video(experiment_id)

        if(experiment_id == null || video_id == null){
            setStarting(false)
            window.alert(`
                Could not create new experiment or video. 
                Seems that backend server is not running. Enable it and refresh the page.
            `)
            return
        }

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
        const variables = await ChromeStorage.get_experiment_variables()

        const data = {
            id: variables.database_experiment_id,
            started: get_local_datetime(new Date()),
            video_limit: settings.video_url.length,
            subject_age: settings.subject_age,
            subject_sex: settings.subject_age,
            subject_netflix_familiarity: settings.subject_netflix_familiarity,
            subject_selected_content: settings.subject_selected_content,
            content_continuation: settings.content_continuation,
            settings: JSON.stringify(settings),
            urls: JSON.stringify(settings.video_url)
        }
        await post_new_experiment(data) 
        return variables.database_experiment_id
    }

    const create_video = async (experiment_id : number) : Promise<number> => {
        const settings = await ChromeStorage.get_experiment_settings()
        const data = {
            started: get_local_datetime(new Date()),
            experiment_id: experiment_id,
            url: settings.video_url[0]
        }
        const video_id = await post_new_video(data)
        return video_id as number
    }

    const set_starting : T_SET_STARTING = (value : boolean) => {
        setStarting(value)
    }

    const validate_settings = async () : Promise<{valid:boolean, msg?:string}> => {
        const {subject_age, subject_sex, content_continuation ,subject_selected_content, subject_netflix_familiarity} = await ChromeStorage.get_experiment_settings()
        const {database_experiment_id} = await ChromeStorage.get_experiment_variables()

        // Validate experiment ID
        if(remove_whitespaces(database_experiment_id.toString()) === "") return {valid: false, msg: "Experiment ID cannot be empty"};
        if(database_experiment_id < 0) return {valid: false, msg: "Experiment ID cannot be negative value"};

        // Validate subject age
        if(subject_age <= 0) return {valid: false, msg: "Subject age must be a positive number"};
        if(remove_whitespaces(subject_age.toString()) === "") return {valid:false, msg: "Subject age cannot be empty"}

        // Validate subject sex
        if(remove_whitespaces(subject_sex) === "") return {valid: false, msg: "Subject sex cannot be empty"}

        // Validate subject familiarity with netflix
        if(remove_whitespaces(subject_netflix_familiarity?.toString()) === "") return {valid: false, msg: "Subject familiarity cannot be empty"}

        // Validate content chooser
        if(remove_whitespaces(subject_selected_content?.toString()) === "") return {valid: false, msg: "Content chooser cannot be empty"}

        // Validate content continuation
        if(remove_whitespaces(content_continuation?.toString()) === "") return {valid: false, msg: "Content continuation cannot be empty"}

        return {valid: true}
    }

    return {
       start_experiment,
       set_starting,
       starting
    }
}