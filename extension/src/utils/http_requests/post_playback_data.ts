import axios from "axios"
import { STORAGE_KEYS } from "../../config/storage.config"
import { T_ARCHIVE } from "../../config/types/archive.type"
import { T_DATABASE } from "../../config/types/database.type"
import { ChromeStorage } from "../custom/ChromeStorage"
import {backend_urls} from "./config"


export const post_playback_data = async (playback_data:T_DATABASE, archive:T_ARCHIVE) : Promise<void> => {
    const {database_video_id} = await ChromeStorage.get_experiment_variables()

    const data = {
        playback_data: playback_data,
        archive: archive,
        video_id: database_video_id
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

