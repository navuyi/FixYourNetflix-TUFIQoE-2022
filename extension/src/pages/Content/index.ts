import {StatsAnalyzer} from "./StatsAnalyzer"
import {CustomPlayer} from "./CustomPlayer"
import { QualityEnhancer } from "./QualityEnhancer"


const init = async () : Promise<void> => {
    //const statsAnalyzer = new StatsAnalyzer()
    //await statsAnalyzer.init()


    //const customPlayer = new CustomPlayer()
    //await customPlayer.init()

    const qualityEnhancer = new QualityEnhancer()
    await qualityEnhancer.init()
}

init()












