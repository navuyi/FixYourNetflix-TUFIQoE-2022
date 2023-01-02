import { useState } from "react"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { ChangeEvent } from "react"

export const useSubjectAge = () => {
    const [age, setAge] = useState<number|string>("")

    const init = async () => {
        const {subject_age} = await ChromeStorage.get_experiment_settings()
        setAge(subject_age)
    }

    const handle_age_change = async (e:ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if(value < 0) return;
        if(isNaN(value) === true) return;

        setAge(value)
        await update_storage(value)
    }

    const update_storage = async (value:number) => {
        const settings = await ChromeStorage.get_experiment_settings()
        settings.subject_age = value
        await ChromeStorage.set_experiment_settings(settings)
    }


    return {
        init,
        age,
        handle_age_change
    }
}