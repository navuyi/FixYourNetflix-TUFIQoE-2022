import { netflix_api_elements } from "../config/netflix_player_api";
/*
    Netflix player playback controls have to be established with HTML elements
    due to the separation of original page window object and the ContentScript.
    ContentScript has no access to the original page window's properties ! ! !
*/

const create_seek_element = () => {
    const element = document.createElement('div');
    element.id = netflix_api_elements.seek.id;
    element.onclick = (e) => {
        const new_time = Number(e.currentTarget.getAttribute(netflix_api_elements.seek.attribute)) * 1000
    
        const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
        const player = videoPlayer.getVideoPlayerBySessionId(videoPlayer.getAllPlayerSessionIds()[0]);
    
        player.seek(new_time);
    }
    (document.body).appendChild(element);
}

const create_current_time_element = () => {
    const element = document.createElement("div")
    element.id = netflix_api_elements.current_time.id

    element.onclick = (e) => {
        const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
        const player = videoPlayer.getVideoPlayerBySessionId(videoPlayer.getAllPlayerSessionIds()[0]);
    
        const current_time = Number(player.getCurrentTime()) / 1000
        e.currentTarget.setAttribute(netflix_api_elements.current_time.attribute, current_time.toString())
    }
    (document.body).appendChild(element);
}


create_seek_element()
create_current_time_element()

