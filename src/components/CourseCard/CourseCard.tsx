import React, { useEffect, useState } from "react";
import Hls from "hls.js";
import {
    FcAcceptDatabase,
    FcPositiveDynamic,
    cVoicePresentation
} from "react-icons/fc";

import { Course } from "../../utils/types";
import { ROUTER_KEYS, STORAGE_KEYS } from "../../utils/constants";

export const CourseCard = ({
    id,
    title,
    description,
    previewImageLink,
    lessonsCount,
    rating,
    meta,
}: Course): JSX.Element => {
    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
    const [hlsEl, setHlsEl] = useState<Hls | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        
        // Maybe it's better to use ref to get an access for DOM element.  
        
        const video = document.getElementById(id) as HTMLVideoElement;
        if (!videoEl) {
            setVideoEl(video);
        };
    }, [id, videoEl]);

    // use more meaningful name. For example handleOnVideoMouseOver or onVideoMouseOver instead of handleOnMouseOver.
    // If you'll add MouseOver handler for another element it will help. 
    
    const handleOnMouseOver = () => {
        const savedTime = localStorage.getItem(`currentTime ${id}`);

        if (
            // Move this condition to a separate constant.
            // Also I think it is better to define each condition separately to better readability
            // For example: meta.courseVideoPreview?.link --> isCourseHasLink, Hls.isSupported() --> isHlsSupported etc.
            
            !savedTime &&
            Hls.isSupported() &&
            meta.courseVideoPreview?.link &&
            localStorage.getItem(STORAGE_KEYS.TOKEN)
        ) {
            
            // Move a code below to separate function
            
            const hls = new Hls({
                xhrSetup: (xhr) => {
                    xhr.responseType = "json";
                    xhr.setRequestHeader(
                        "Authorization",
                        `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
                    );
                },
            });
            hls.loadSource(meta.courseVideoPreview?.link);
            setHlsEl(hls);
            videoEl && hls.attachMedia(videoEl);
            !savedTime && videoEl && videoEl.load();
        } else {
            if (!hlsEl) {
                localStorage.removeItem(`currentTime ${id}`);
                handleOnMouseOver();
            }
            videoEl && hlsEl && hlsEl.startLoad(Number(savedTime));
        }

        if (videoEl && !isPlaying) {
            videoEl.play();
            setIsPlaying(true);
        }
    };
    
    // Same as for MouseOver handler

    const handleOnMouseOut = () => {
        if (videoEl && hlsEl && isPlaying) {
            videoEl?.currentTime &&
                localStorage.setItem(`currentTime ${id}`, videoEl?.currentTime.toString());
            videoEl.pause();
            hlsEl?.stopLoad();
            setIsPlaying(false);
        }
    };

    return (
        <li className="
                       block
                       min-w-80
                       rounded-lg
                       p-3
                       border
                       shadow-md
                       shadow-gray-500
                       hover:scale-105">
            <a href={`${ROUTER_KEYS.COURSE}/${id}`}>
                <div 
                    className="
                               relative
                               h-28
                               w-64
                               mx-auto
                               group
                               "
                    data-testid="group">
                    <img
                        alt={title}
                        src={`${previewImageLink}/cover.webp`}
                        className="
                                   absolute
                                   top-0 h-full
                                   w-full
                                   rounded-md
                                   object-cover
                                   group-hover:hidden"
                    />
                    
                    <video
                        id={id}
                        className="
                                   absolute
                                   top-0
                                   h-full
                                   w-full
                                   opacity-0
                                   rounded-md
                                   object-cover
                                   group-hover:opacity-100"
                        loop
                        preload="none"
                        muted
                        onMouseOver={handleOnMouseOver}
                        onMouseOut={handleOnMouseOut}
                        data-testid="video-player"
                    />
                </div>
                
                <div className="mt-1">
                    <p className="font-medium">{title}</p>
                    <p
                        className="
                                   text-sm
                                   text-gray-500">
                        {description}
                    </p>

                    <div
                        className="
                                   flex
                                   items-center
                                   gap-3
                                   mt-1
                                   text-xs
                                   "
                        >
                        
                        <div>
                            <p className="text-gray-500">
                                Lessons
                            </p>

                            <p
                               className="
                                   flex
                                   font-medium
                                   gap-1
                               "
                            >
                                <FcAcceptDatabase size="16" />
                                {lessonsCount}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Rating</p>
                              <p
                               className="
                                   flex
                                   font-medium
                                   gap-1
                               "
                            >
                                <FcPositiveDynamic size="16" />
                                  
                                {rating}
                            </p>
                        </div>

                        <div>
                            <div className="flex gap-2">
                               <p className="text-gray-500">
                                    Skills
                                </p>
                                <FcVoicePresentation size="16" />
                            </div>
                            <ul>
                                {meta.skills ? (
                                    meta.skills?.map((skill, index) => (
                                        <li key={index}>
                                              <p className="w-50 font-medium">
                                                {skill}
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <p>?</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
};
