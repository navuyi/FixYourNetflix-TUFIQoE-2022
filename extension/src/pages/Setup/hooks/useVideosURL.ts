import React, { ChangeEvent, useState } from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { remove_whitespaces } from "../../../utils/string_utils";
import { T_VALIDATION_RESPONSE } from "../../../config/types/messages";

type T_VIDEOS = Array<string>



export const useVideosURL = () => {
    const [videos, setVideos] = useState<T_VIDEOS>([]) 

    const init_videos = async () => {
        const {video_url} = await ChromeStorage.get_experiment_settings()
        setVideos(video_url)
    }

    const update_storage_videos = async (new_video_urls : Array<string>) : Promise<void> => {
        const settings = await ChromeStorage.get_experiment_settings()
        settings.video_url = new_video_urls
        await ChromeStorage.set_experiment_settings(settings)
    }

    const handle_video_number_change = async (e:ChangeEvent<HTMLSelectElement>) : Promise<void> => {
        const value = Number(e.target.value)
        if(value > videos.length){
            const diff = Math.abs(value - videos.length)
            const tmp = [...videos]
            for(let i=0; i<diff; i++){
                tmp.push("")
            }
            setVideos(tmp)
            await update_storage_videos(tmp)
        }
        else if(value < videos.length){
           const diff = Math.abs(value - videos.length)
           const tmp = [...videos].slice(0, videos.length-diff)
           setVideos(tmp)
           await update_storage_videos(tmp)
        }
    }

    const handle_video_url_change = async (e:ChangeEvent<HTMLInputElement>, index: number) : Promise<void> => {
        const value = e.target.value
        const tmp = [...videos]
        tmp[index] = value
        setVideos(tmp)
        await update_storage_videos(tmp)
    }

    /**
     * Function validates provided video URLs based on ChromeStorage values
     * @returns {validation message}
     */
    const validate_videos = async () : Promise<T_VALIDATION_RESPONSE> => {
        const {video_url} = await ChromeStorage.get_experiment_settings()
        //const regex = /https:\/\/www.netflix.com\/watch\/[0-9]+\?trackId=[0-9]+/gm
        for(const url of video_url){
            if(url === ""){
                return {valid: false, message: "URL can not be empty"}
            }
            if(url.includes("https://www.netflix.com/watch/") === false){
                return {valid: false, message: `One or more of the URLs are incorrect`}
            }
        }
       
        // Finally return true
        return {valid: true}
    }
    

    return {
        videos,
        init_videos,
        handle_video_number_change,
        validate_videos,
        handle_video_url_change
    }
}