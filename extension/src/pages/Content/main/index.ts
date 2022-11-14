import {StatsAnalyzer} from "./modules/StatsAnalyzer"
import {CustomPlayer} from "./modules/CustomPlayer"


const init = async () : Promise<void> => {
    const statsAnalyzer = new StatsAnalyzer()
    await statsAnalyzer.init()


    const customPlayer = new CustomPlayer()
    await customPlayer.init()
}


init()












