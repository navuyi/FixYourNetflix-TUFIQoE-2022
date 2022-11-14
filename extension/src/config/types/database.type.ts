export type T_DATABASE = {
    position: string | null,
    duration: string | null,
    volume: string | null,
    segment_position: string | null,
    
    player_state: string | null,
    buffering_state: string | null,
    rendering_state: string | null,

    playing_bitrate_audio: string | null,
    playing_bitrate_video: string | null,
    resolution: string | null,

    playing_vmaf: string | null,
    buffering_vmaf: string | null,

    buffering_bitrate_audio: string | null,
    buffering_bitrate_video: string | null,

    total_frames: string | null,
    total_dropped_frames: string | null,
    total_corrupted_frames: string | null,

    framerate: string | null,
    timestamp: string | null
}