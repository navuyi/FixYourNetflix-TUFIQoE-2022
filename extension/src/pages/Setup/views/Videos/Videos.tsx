import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVideosURL } from "../../hooks/useVideosURL";
import style from "./style.module.scss"


const Videos = () => {
    const {videos, init_videos, handle_video_number_change, validate_videos} = useVideosURL()
    const navigate = useNavigate()

    const handle_return = async () => {
        const valid = await validate_videos()
        if(valid === false){
            window.alert("Provided URLs are not valid!")
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
                                <div className={style.url_item} key={index}>
                                    <span className={style.url_number}>{index+1}</span>
                                    <input  className={style.url_input} value={url} />
                                </div>
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