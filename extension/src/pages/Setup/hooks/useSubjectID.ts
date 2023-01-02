import { ChangeEvent, useState } from "react"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { remove_whitespaces } from "../../../utils/string_utils"
import { T_VALIDATION_RESPONSE } from "../../../config/types/messages"

export type T_VALIDATE_SUBJECT_ID = () => Promise<T_VALIDATION_RESPONSE>


export const useSubjectID = () => {
    const [subjectID, setSubjectID] = useState("")

    const init_subject_id = async () : Promise<void> => {
        const {subject_id} = await ChromeStorage.get_experiment_settings()
        setSubjectID(subject_id)
    }

    const handle_subject_id_change = async (e:ChangeEvent<HTMLInputElement>) : Promise <void> => {
        const value = remove_whitespaces(e.target.value)

        setSubjectID(value)
        await update_storage(value)
    }

    const update_storage = async (value:string) => {
        const settings =  await ChromeStorage.get_experiment_settings()
        settings.subject_id = value
        await ChromeStorage.set_experiment_settings(settings)
    }



    return {
        subjectID,
        handle_subject_id_change,
        init_subject_id
    }
}