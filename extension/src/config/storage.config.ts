import { DEFAULT_EXPERIMENT_CONFIGURATION } from "./default_experiment_config";

export const STORAGE_KEYS = {
    DATA_TO_SAVE: 'data_to_save',
    ARCHIVE_TO_SAVE: 'archive_to_save',
    ASSESSMENTS_TO_SAVE: 'assessments_to_save',
  
    DATABASE_EXPERIMENT_ID: 'database_experiment_index',
    DATABASE_VIDEO_ID: 'database_video_index',
  
    CURRENT_BITRATE: 'current_bitrate',
  
    DEVICE_ID: 'device_id',
    TESTER_ID: 'tester_id',
    PAIR_ID: 'pair_id',
  
    EXPERIMENT_TYPE: 'experiment_type',
    VIDEO_COUNT: 'video_count',
    VIDEO_LIMIT: 'video_limit',
  
    //VIDEO_URLS: 'video_urls', // TO BE DELETED
  
    RUNNING: 'running',
    //BITRATE_MODE: 'bitrate_mode',
  
    EXTENSION_MODE: "extension_mode",
    CONFIGURATION: "configuration"
  };

export const STORAGE_DEFAULT = {
    [STORAGE_KEYS.DATABASE_EXPERIMENT_ID]: null,
    [STORAGE_KEYS.DATABASE_VIDEO_ID]: null,
  
    [STORAGE_KEYS.CURRENT_BITRATE]: null,
  
    [STORAGE_KEYS.VIDEO_COUNT]: 0,
  
    [STORAGE_KEYS.DEVICE_ID]: 106, // 106 or 107 is correct, 106 set by default,
    [STORAGE_KEYS.TESTER_ID]: 'dev_tester', // tester's ID
  
    [STORAGE_KEYS.EXPERIMENT_TYPE]: 'alone', // alone and together are correct values, alone by default
    [STORAGE_KEYS.VIDEO_LIMIT]: 1, // Most likely it will be set to 1 or 2
  
    [STORAGE_KEYS.RUNNING]: false,
    [STORAGE_KEYS.EXTENSION_MODE]: "experiment", // <-- experiment or mapping 
    [STORAGE_KEYS.CONFIGURATION]: DEFAULT_EXPERIMENT_CONFIGURATION
};


  