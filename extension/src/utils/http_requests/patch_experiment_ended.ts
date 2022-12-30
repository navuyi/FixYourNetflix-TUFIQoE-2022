import axios from "axios"
import { ChromeStorage } from "../custom/ChromeStorage"
import { get_local_datetime } from "../time_utils"
import {  backend_urls } from "./config"


export const patch_experiment_ended= async () : Promise<void> => {
    try{
        const variables = await ChromeStorage.get_experiment_variables()
        const data = {
            ended: get_local_datetime(new Date()),
            experiment_id: variables.database_experiment_id 
        }
        const response = await axios.patch(backend_urls.experiment, data)
        console.log(response.data?.msg)
    }
    catch(err){
        console.log(err)
    }
}