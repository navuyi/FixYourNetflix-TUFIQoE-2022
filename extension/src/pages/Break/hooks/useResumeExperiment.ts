import { useState } from "react"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { post_new_video } from "../../../utils/http_requests/post_new_video"
import { get_local_datetime } from "../../../utils/time_utils"


export const useResumeExperiment = (timeout:number) => {
    const [enabled, setEnabled] = useState<boolean>(false)
    const [resuming, setResuming] = useState<boolean>(false)


    const init = () => {
        setTimeout(() => {
            setEnabled(true)
        }, timeout*1000)
    }

    const handle_experiment_resume = async () : Promise<void> => {
        setResuming(true)

        // Create new video
        const settings = await ChromeStorage.get_experiment_settings()
        const variables = await ChromeStorage.get_experiment_variables()
        const data = {
            url: settings.video_url[variables.video_index],
            experiment_id: variables.database_experiment_id,
            started: get_local_datetime(new Date())
        }
        await post_new_video(data)

        window.location.href = settings.video_url[variables.video_index]
    }

    return {
      enabled,
      init, handle_experiment_resume, resuming
    }
}