import { CustomLogger } from "./CustomLogger"
import { netflix_api_elements } from "../../config/netflix_player_api"

export class NetflixPlayerAPI{
    private static logger = new CustomLogger("[NetflixPlaybackController]")

    public static seek = (position : number) => {
        const seek_element = netflix_api_elements.seek.get()
        seek_element?.setAttribute(netflix_api_elements.seek.attribute, position.toString())
        seek_element?.click()        
    } 

    public static get_current_time = () : number => {
        const current_time_element = netflix_api_elements.current_time.get()
        current_time_element?.click()
        return Number(current_time_element?.getAttribute(netflix_api_elements.current_time.attribute))
    }

    public static get_video_duration = () : number => {
        const duration_element = netflix_api_elements.duration.get()
        duration_element?.click()
        return Number(duration_element?.getAttribute(netflix_api_elements.duration.attribute))
    }
}