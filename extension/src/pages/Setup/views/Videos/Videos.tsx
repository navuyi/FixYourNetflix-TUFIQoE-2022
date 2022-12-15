import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVideosURL } from "../../hooks/useVideosURL";
import style from "./style.module.scss"
import VideoURLInput from "../../components/VideoURLInput/VideoURLInput";
import axios from "axios";

const Videos = () => {
    const {videos, init_videos, handle_video_number_change, validate_videos, handle_video_url_change} = useVideosURL()
    const navigate = useNavigate()

    const handle_return = async () => {
        const verdict = await validate_videos()
        console.log(verdict)
        if(verdict.valid === false){
            window.alert(verdict.message)
        }
        else{
            navigate("/", {replace: true})
        }
    }

    useLayoutEffect(() => {
        const init = async () => {
            await init_videos()
        }
       
        init()
    }, [])


    return(
        <div className={style.videos}>
            <div className={style.container}>
                <span className={style.header}>Videos</span>

                <div className={style.select_wrapper}>
                    <span className={style.sub_header}>Select video URLs</span>
                    <select className={style.select} value={videos.length} onChange={handle_video_number_change}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                </div>

                <div className={style.url_wrapper}>
                    {
                        videos.map((url, index) => {
                            return (
                               <VideoURLInput
                                    key={index}
                                    url={url}
                                    index={index}
                                    handle_change={handle_video_url_change}
                               />
                            )
                        })
                    }
                </div>
                <button className={style.return_btn} onClick={handle_return}>{`Return`}</button>
            </div>
        </div>
    )
}


export default Videos