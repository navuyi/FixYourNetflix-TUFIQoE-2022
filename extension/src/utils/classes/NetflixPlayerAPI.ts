import { CustomLogger } from "./CustomLogger"
import { netflix_api_elements } from "../../config/netflix_player_api"

export class NetflixPlayerAPI{
    private static logger = new CustomLogger("[NetflixPlaybackController]")

    public static seek = (position : number) => {
        const seek_element = netflix_api_elements.seek.get()
        if(seek_element == null){
            NetflixPlayerAPI.logger.log("Seek element is not available")
            return
        }
        seek_element.setAttribute(netflix_api_elements.seek.attribute, position.toString())
        seek_element.click()        
    } 

    public static get_current_time = () : number | undefined => {
        const current_time_element = netflix_api_elements.current_time.get()
        if(current_time_element == null){
            NetflixPlayerAPI.logger.log("Current time element is not availabler")
            return
        }
        current_time_element?.click()
        return Number(current_time_element.getAttribute(netflix_api_elements.current_time.attribute))
    }
}