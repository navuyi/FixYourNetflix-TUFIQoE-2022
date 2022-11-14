import { STORAGE_KEYS } from "../../../../config/storage.config";
import { BITRATE_INTERVAL } from "../../../../config/config";
import { CustomLogger } from "../../../../utils/classes/CustomLogger";
import BitrateController from "./BitrateController";
import {BitrateMenu} from "../../../../utils/classes/BitrateMenu";

export class QualityScenarioManager {
   
    private logger : CustomLogger
  
    constructor(){
        this.logger = new CustomLogger("[QualityScenarioManager]")
    }

}

export default QualityScenarioManager