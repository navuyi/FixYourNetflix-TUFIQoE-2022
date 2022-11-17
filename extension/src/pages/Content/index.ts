import {CustomPlayer} from "./CustomPlayer"
import { QualityEnhancer } from "./QualityEnhancer"
import { DebugMenuAnalyzer } from "./DebugMenuAnalyzer"
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu"
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu"
import QualityDecreaser from "./QualityDecreaser"


const init = async () : Promise<void> => {

    
    inject_netflix_controls_script()

    //const customPlayer = new CustomPlayer()
    //await customPlayer.init()

    const qualityEnhancer = new QualityEnhancer()
    await qualityEnhancer.init()

    const qualityDecreaser = new QualityDecreaser()
    await qualityDecreaser.init()
}


const inject_netflix_controls_script = () => {
    const s = document.createElement("script")
    s.src = chrome.runtime.getURL("netflixControls.bundle.js");
    
    (document.head || document.documentElement).appendChild(s);
    s.remove()
}

init()












