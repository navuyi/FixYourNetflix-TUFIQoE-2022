import { useState } from "react"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { get_experiment_next_id } from "../../../utils/http_requests/get_experiment_next_id"
import { useSubjectAge } from "./useSubjectAge"




export const useSetupInit = () => {
    const [connected, setConntected] = useState<boolean>(false)
    const [nextExpID, setNextExpID] = useState<number>(-1)


    const get_next_experiment_id = async () => {
        const next_id = await get_experiment_next_id()
        if(next_id != null){
            setConntected(true)
            await update_next_experiment_id(next_id)
        }
        else{
            setConntected(false)
        }
    }

    const update_next_experiment_id = async (next_id:number) : Promise<void> => {
        setNextExpID(next_id)

        // Set database experiment id
        const variables = await ChromeStorage.get_experiment_variables()
        variables.database_experiment_id = next_id
        await ChromeStorage.set_experiment_variables(variables)
    }

    return {
        connected,
        get_next_experiment_id,
        nextExpID
    }
}


