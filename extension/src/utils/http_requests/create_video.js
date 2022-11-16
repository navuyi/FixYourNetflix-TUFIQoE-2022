import axios from "axios"
import { STORAGE_KEYS } from "../../config/storage.config"
import {  backend_urls } from "./config"
import { get_local_datetime } from "../time_utils"
import { ChromeStorage } from "../classes/ChromeStorage"

export const create_video = async (data) => {
    try{
        const response = await axios.post(backend_urls.video, data)
        if(response.status === 201){
            console.log("Video created")
            const video_id = response.data.video_id

            // Update chrome storage
            const experiment_variables = await ChromeStorage.get_experiment_variables()
            experiment_variables.database_video_id = video_id
            await ChromeStorage.set_single("experiment_variables", experiment_variables)
        }
    }
    catch(err){
        console.log(err)
    }
}