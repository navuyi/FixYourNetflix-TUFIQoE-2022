import axios from "axios";
import { backend_urls } from "./config";


export const get_experiment_next_id = async () : Promise<number | undefined> => {
    try{
        const response = await axios.get(backend_urls.experiment_next_id)
        if(response != null && response.status === 200){
            return response.data.next_id
        }
    }catch(err){
        console.log(err)
    }
}