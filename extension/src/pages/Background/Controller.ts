import { STORAGE_KEYS, T_EXPERIMENT_SETTINGS, T_EXPERIMENT_VARIABLES } from "../../config/storage.config"
import { ChromeStorage } from "../../utils/custom/ChromeStorage"
import { CustomLogger } from "../../utils/custom/CustomLogger"

export class Controller{
    private NETFLIX_WATCH_URL : string = "https://www.netflix.com/watch"
    private logger : CustomLogger

    constructor() {
       this.logger = new CustomLogger("[Controller]")
    }

    public init = async () : Promise<void>  => {
        this.logger.log("Initializing...")
        this.listenForVideoStart()
    }

    async injectScript(tabId : number){
        const experiment_variables = await ChromeStorage.get_experiment_variables() 
        if(experiment_variables.experiment_running === false){
            this.logger.log("Extension is not running.")
            return
        }
        
        await this.increaseVideoCount()
        await chrome.scripting.executeScript({
           target: {
                tabId: tabId
           },
            files: ["content.bundle.js"]  // ContentScript filename has to match names in webpack.config.js
        })
        this.logger.log("ContentScript has been injected")
    }

    /**
     *  Method that keeps track of videos order and limit.
     *  For the first video in queue the count will be 1 but its index in an array is 0.
     *  Video count is increased just before injecting the ContentScript.
     *  It means that n-th video in row has the count of n for the enterity of playback. The index is n-1  
    */
    private increaseVideoCount = async () : Promise<void> =>{
        const experiment_variables = await ChromeStorage.get_experiment_variables()
        experiment_variables.video_count += 1
        this.logger.log(`Increasing video count to ${experiment_variables.video_count}`)
        await ChromeStorage.set_single("experiment_variables", experiment_variables)
    }

    private listenForVideoStart = () : void => {
        // Code below seems to be the right solution //

        // onHistoryStateUpdated detects navigation within Netlifx player (next video button)
        // on other types of navigation within Netflix webpage
        /*
        chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
            this.logger.log(`ON HISTORY STATE UPDATED`)
            console.log(details)
            if(details.frameId === 0 && details.url.includes(this.NETFLIX_WATCH_URL)) {
                chrome.tabs.get(details.tabId, async (tab) => {
                    if(tab.url === details.url) {
                        this.logger.log("Entered Netflix Video Player")
                        await this.injectScript(details.tabId)
                    }
                });
            }
        });
        */
        
        // onCompleted detects navigation using chrome.tabs.update
        chrome.webNavigation.onCompleted.addListener(details => {
            if(details.frameId === 0 && details.url.includes(this.NETFLIX_WATCH_URL)) {
                chrome.tabs.get(details.tabId, async (tab) => {
                    if(tab.url === details.url) {
                        this.logger.log("Entered Netflix Video Player")
                        await this.injectScript(details.tabId)
                    }
                });
            }
        })
    }
}