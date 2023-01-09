
// Define storage types
export type T_EXPERIMENT_SETTINGS = {
  stats_record_interval_ms: number,
  bitrate_change_interval_ms: number,
  bitrate_change_jitter_ms: number,
  quality_increase_rewind: number,
  video_url: Array<string>,
  subject_age: number,
  subject_sex: string,
  subject_netflix_familiarity: string | boolean,
  subject_selected_content: string | boolean,
  content_continuation: string | boolean
}

export type T_EXPERIMENT_VARIABLES = {
  database_experiment_id: number,
  database_video_id: number,
  video_index: number,
  experiment_running: boolean
}

export type T_STORAGE = {
  experiment_settings : T_EXPERIMENT_SETTINGS,
  experiment_variables : T_EXPERIMENT_VARIABLES
}

// The rest...
export const STORAGE_KEYS = {
  EXPERIMENT_SETTINGS: "experiment_settings",
  EXPERIMENT_VARIABLES: "experiment_variables"
}

export const STORAGE_DEFAULT : T_STORAGE= {
  experiment_settings: {
    stats_record_interval_ms: 1000,
    bitrate_change_interval_ms: 1 * 100 * 1000,  //2.5 * 60 * 1000 <-- default
    bitrate_change_jitter_ms: 15 * 1000,     // 25 * 1000 <-- default
    quality_increase_rewind: 3 * 1000,
    video_url: [
      "https://www.netflix.com/watch/70305903"
    ],
    subject_age: 0,
    subject_sex: "", // empty string, male or female
    subject_netflix_familiarity: "",
    subject_selected_content: "",
    content_continuation: ""
  },
  experiment_variables: {
    database_experiment_id: -1,
    database_video_id: -1,
    video_index: 0, 
    experiment_running: false
  }
};




  