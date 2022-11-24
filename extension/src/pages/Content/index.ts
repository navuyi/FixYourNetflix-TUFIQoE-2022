import {CustomPlayer} from "./CustomPlayer"
import { QualityEnhancer } from "./QualityEnhancer"
import { DebugMenuAnalyzer } from "./DebugMenuAnalyzer"
import { NetflixBitrateMenu } from "../../utils/classes/NetflixBitrateMenu"
import { NetflixDebugMenu } from "../../utils/classes/NetflixDebugMenu"
import QualityDecreaser from "./QualityDecreaser"


const init = async () : Promise<void> => {
    inject_netflix_controls_script()

    // TODO First create and initialize DebugMenuAnalyzer instance
    const debugAnalyzer = new DebugMenuAnalyzer()
    await debugAnalyzer.init()
    
    // TODO: Second create and initialize CustomPlayer instance <-- in order to remove default player controls
    //const customPlayer = new CustomPlayer()
    //await customPlayer.init()

    //TODO: Third create QualityDecreaser instance
    //const qualityDecreaser = new QualityDecreaser()
    //await qualityDecreaser.init()

    //TODO Fourth create QualityEnhancer instance
    const qualityEnhancer = new QualityEnhancer()
    await qualityEnhancer.init()
}


const inject_netflix_controls_script = () => {
    const s = document.createElement("script")
    s.src = chrome.runtime.getURL("netflixControls.bundle.js");

    (document.head || document.documentElement).appendChild(s);
    s.remove()
}

init()












