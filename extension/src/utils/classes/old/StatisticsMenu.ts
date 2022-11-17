import { get_statistics_element } from "../../html_element_extractors/get_statistics_element"
import { CustomLogger } from "../CustomLogger"
import { T_DATABASE } from "../../../config/types/database.type"

export class StatisticsMenu{
    private stats_element : HTMLTextAreaElement | undefined
    private logger : CustomLogger

    constructor(){
        this.logger = new CustomLogger("[StatisticsMenu]")
    }

    /**
     *  Prepares for further actions 
    */
    public init = async () :Promise<void> => {
        await this.invoke_statistics_menu()
    }

    /**
     *  Invokes statistics menu to the screen 
     *  and assigns statistics element to the instance's attribute 
    */
    private invoke_statistics_menu = async () : Promise<void> => {
        this.stats_element = await get_statistics_element() as HTMLTextAreaElement
    }

    /**
     * Returns statistics element's value parsed to string.
     * It can be further analyzed using regular expressions.
     * @returns {string} 
    */
    public get_statistics_text = () : string | null => {
        if(this.stats_element)
            return this.stats_element.value.toString()
        else
            return null
    }

    
    /**
     * Creates object with information retrieved from nerd statistics string value.
     * @returns {object} Object with key - parameter name, values - parameter's value
     * eg. 
     * {    ...
     *      buffering_vmaf: 90,
     *      buffering_bitrate_video: 2550
     *      ...
     * }
    */
    public analyze_statistics_text = () : T_DATABASE | undefined => {
        if(this.stats_element == null){
            return
        }
        const text = this.stats_element.value.toString()
        
        const data : T_DATABASE =  {
            position: this.get_value("(Position:) ([0-9]+.[0-9]+)", 2, text),
            volume: this.get_value("(Volume:) ([0-9]+)%", 2, text),
            segment_position: this.get_value("(Segment Position:) ([0-9]+.[0-9]+)", 2, text),

            player_state: this.get_value("(Player state: )([a-zA-Z]+)", 2, text),
            buffering_state: this.get_value("(Buffering state:) (.+)", 2, text),
            rendering_state: this.get_value("(Rendering state:) (.+)", 2, text),

            playing_bitrate_audio: this.get_value("Playing bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 1, text),
            playing_bitrate_video: this.get_value("Playing bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 2, text),
            resolution: this.get_value("([0-9]+x[0-9]+)", 1, text),

            playing_vmaf: this.get_value("Playing\/Buffering vmaf: ([0-9]+)\s*\/\s*([0-9]+)", 1, text),
            buffering_vmaf: this.get_value("Playing\/Buffering vmaf: ([0-9]+)\s*\/\s*([0-9]+)", 2, text),

            buffering_bitrate_audio: this.get_value("Buffering bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 1, text),
            buffering_bitrate_video: this.get_value("Buffering bitrate \\(a\\/v\\):\\s*([0-9]+)\\s*\\/\\s*([0-9]+)", 2, text),

            total_frames: this.get_value("Total Frames:\\s*([0-9]+)", 1, text),
            total_dropped_frames: this.get_value("Total Dropped Frames:\\s*([0-9]+)", 1, text),
            total_corrupted_frames: this.get_value("Total Corrupted Frames:\\s*([0-9]+)", 1, text),

            framerate: this.get_value("Framerate: ([0-9]+.[0-9]+)", 1, text),
            duration: this.get_value("(Duration:) ([0-9]+.[0-9]+)", 2, text),
            timestamp: null
        }
        
        return data
    }



    /**
     * Utility method --> extracts useful data from nerds stats (long) string
     * @param {string} regex 
     * @param {number} group 
     * @param {string} data 
     * @returns {object|null}
     */
     get_value = (regex:string, group:number, data:string) => {
        try{
            let value = data.match(regex) ?? null
            if(value != null){
                return value[group]
            }
            else{
                return null
            }
        }
        catch(e){
            this.logger.log(e)
            return null
        }
    }
}