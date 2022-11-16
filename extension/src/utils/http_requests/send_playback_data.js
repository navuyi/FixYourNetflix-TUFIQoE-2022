import axios from "axios"
import { STORAGE_KEYS } from "../../config/storage.config"
import { ChromeStorage } from "../classes/ChromeStorage"
import {backend_urls} from "./config"


export const send_playback_data = async (playback_data, archive) => {
    const experiment_variables = await ChromeStorage.get_experiment_variables()

    const data = {
        playback_data: playback_data,
        archive: archive,
        video_id: experiment_variables.database_video_id
    }
    
    try{
        const response = await axios.post(backend_urls.playback_data, data)
        if(response.status === 201){
            console.log("Playback data submitted successfully")
        }
    }
    catch(err){
        console.log(err)
    }
}

