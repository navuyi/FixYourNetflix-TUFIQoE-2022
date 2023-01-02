import { useState } from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { ChangeEvent } from "react";



export const useSubjectSex = () => {
    const [sex, setSex] = useState<string>("")


    const init_subject_sex = async () => {
        const {subject_sex} = await ChromeStorage.get_experiment_settings()
        setSex(subject_sex)
    }

    const handle_sex_change = async (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSex(value)
        console.log(value)
        await update_storage(value)
    }

    const update_storage = async (value : string) => {
        const settings = await ChromeStorage.get_experiment_settings()
        settings.subject_sex = value
        await ChromeStorage.set_experiment_settings(settings)
    }



    return {
        sex,
        init_subject_sex,
        handle_sex_change
    }
}