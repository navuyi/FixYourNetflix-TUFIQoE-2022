import axios from "axios"
import { STORAGE_KEYS } from "../../config/config"
import { ChromeStorage } from "../classes/ChromeStorage"
import { backend_urls } from "./config"

export const create_experiment = async (data) => {
    try{
        const response = await axios.post(backend_urls.experiment, data)
        if(response.status === 201){
            console.log("Experiment created")
            const experiment_id = response.data.experiment_id
            
            // Update chrome storage
            const experiment_variables = await ChromeStorage.get_experiment_variables()
            experiment_variables.database_experiment_id = experiment_id
            await ChromeStorage.set_single("experiment_variables", experiment_variables)
        }
    }
    catch(err){
        console.log(err)
    }
}