import axios from "axios";
import { backend_urls } from "./config";

export type T_CUSTOM_EVENT = {
    timestamp: string,
    video_id: number,
    type: T_CUSTOM_EVENT_TYPE,
    payload: string
}
export type T_CUSTOM_EVENT_TYPE = "VIDEO_QUALITY_INCREASE_REQUESTED" | "VIDEO_QUALITY_INCREASE_COMPLETED" | "VIDEO_QUALITY_CHANGED"


export const post_custom_event = async (data:T_CUSTOM_EVENT) : Promise<void> => {
    try{
        const response = await axios.post(backend_urls.event, data)
    }catch(err){
        console.log(err)
    }
}