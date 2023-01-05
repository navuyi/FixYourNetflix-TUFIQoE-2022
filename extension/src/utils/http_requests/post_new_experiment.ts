import axios, { AxiosError } from "axios"
import { ChromeStorage } from "../custom/ChromeStorage"
import { backend_urls } from "./config"



export const post_new_experiment = async (data : object) : Promise<number|undefined> => {
    try{
        const response = await axios.post(backend_urls.experiment, data)
    }catch(err : any){
        if (err.response) {
            // The client was given an error response (5xx, 4xx)
        } else if (err.request) {
            // The client never received a response, and the request was never left
        } else {
            // Anything else
        }
    }
    
    

    return 1
}

/*
export const create_experiment = async (data : object) : Promise<number> => {
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
*/

