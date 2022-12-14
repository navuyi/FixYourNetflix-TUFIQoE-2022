import React, { ChangeEvent, useState } from "react";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import { remove_whitespaces } from "../../../utils/string_utils";

type T_VIDEOS = Array<string>

export const useVideosURL = () => {
    const [videos, setVideos] = useState<T_VIDEOS>([]) 

    const init_videos = async () => {
        const {video_url} = await ChromeStorage.get_experiment_settings()
        setVideos(video_url)
    }

    const handle_video_number_change = (e:ChangeEvent<HTMLSelectElement>) : void => {
        const value = Number(e.target.value)
        if(value > videos.length){
            const diff = Math.abs(value - videos.length)
            const tmp = [...videos]
            for(let i=0; i<diff; i++){
                tmp.push("")
            }
            setVideos([...tmp])
        }
        else if(value < videos.length){
           const diff = Math.abs(value - videos.length)
           const tmp = videos.slice(0, videos.length-diff)
           setVideos([...tmp])
        }
    }

    const handle_video_url_change = (e:ChangeEvent<HTMLInputElement>) => {
        
    }

    const validate_videos = async () : Promise<boolean> => {
        const {video_url} = await ChromeStorage.get_experiment_settings()
        // Check for empty string
        for(const url of video_url){
            if(remove_whitespaces(url) === ""){
                return false
            }
            if(url.includes("https://www.netflix.com/watch/") === false){
                return false
            }
        }
       
        // Finally return true
        return true
    }
    

    return {
        videos,
        init_videos,
        handle_video_number_change,
        validate_videos
    }
}