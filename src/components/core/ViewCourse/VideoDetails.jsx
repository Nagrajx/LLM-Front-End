import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ActionBtn from "../../common/ActionBtn";

import { updateCourseProgress } from "../../../Services/operations/courseDetailsAPI";
import {updateCompletedLectures} from "../../../Redux/Slices/viewCourseSlice"

const VideoDetails = () => {
    const { courseId, SectionId, SubSectionId } = useParams();
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();

    const { token } = useSelector((state) => state.auth);
    const {
        courseSectionsData,
        completedLectures,
    } = useSelector((state) => state.viewCourse);


   

    const [videoData, setVideoData] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);


    // 🔹 Load current video
    useEffect(() => {
        if (!courseSectionsData?.length) return;

        if (!courseId || !SectionId || !SubSectionId) {
            navigate("/dashboard/enrolled-courses");
            return;
        }

        const currentSection = courseSectionsData.find(
            (sec) => sec._id === SectionId
        );

        if (!currentSection) return;

        const currentVideo = currentSection.SubSections.find(
            (sub) => sub._id === SubSectionId
        );

        if (!currentVideo) return;



        setVideoData(currentVideo);
        setVideoEnded(false);
    }, [courseSectionsData, courseId, SectionId, SubSectionId, location.pathname]);

    // 🔹 Helpers
    const getCurrentIndexes = () => {
        const sectionIndex = courseSectionsData.findIndex(
            (sec) => sec._id === SectionId
        );

        const subSectionIndex =
            courseSectionsData[sectionIndex]?.SubSections.findIndex(
                (sub) => sub._id === SubSectionId
            );

        return { sectionIndex, subSectionIndex };
    };

    const isFirstVideo = () => {
        const { sectionIndex, subSectionIndex } = getCurrentIndexes();
        return sectionIndex === 0 && subSectionIndex === 0;
    };

    const isLastVideo = () => {
        const { sectionIndex, subSectionIndex } = getCurrentIndexes();

        const lastSectionIndex = courseSectionsData.length - 1;
        const lastSubSectionIndex =
            courseSectionsData[sectionIndex]?.SubSections.length - 1;

        return (
            sectionIndex === lastSectionIndex &&
            subSectionIndex === lastSubSectionIndex
        );
    };

    // 🔹 Navigation
    const goToNextVideo = () => {
        const { sectionIndex, subSectionIndex } = getCurrentIndexes();

        const currentSection = courseSectionsData[sectionIndex];

        if (subSectionIndex < currentSection.SubSections.length - 1) {
            const nextSubSectionId =
                currentSection.SubSections[subSectionIndex + 1]._id;

            navigate(
                `/view-course/${courseId}/Section/${SectionId}/SubSection/${nextSubSectionId}`
            );
        } else {
            const nextSection = courseSectionsData[sectionIndex + 1];

            if (!nextSection) return;

            const nextSubSectionId = nextSection.SubSections[0]._id;

            navigate(
                `/view-course/${courseId}/Section/${nextSection._id}/SubSection/${nextSubSectionId}`
            );
        }
    };

    const goToPreVideo = () => {
        const { sectionIndex, subSectionIndex } = getCurrentIndexes();

        if (subSectionIndex > 0) {
            const prevSubSectionId =
                courseSectionsData[sectionIndex].SubSections[subSectionIndex - 1]._id;

            navigate(
                `/view-course/${courseId}/Section/${SectionId}/SubSection/${prevSubSectionId}`
            );
        } else {
            const prevSection = courseSectionsData[sectionIndex - 1];
            if (!prevSection) return;

            const prevSubSectionId =
                prevSection.SubSections[prevSection.SubSections.length - 1]._id;

            navigate(
                `/view-course/${courseId}/Section/${prevSection._id}/SubSection/${prevSubSectionId}`
            );
        }
    };

    //  Mark complete
    const handleLectureCompletion = async () => {
        setLoading(true);

        const res = await updateCourseProgress(
            { courseId:courseId, SubSectionId:SubSectionId },
            token
        );

        if (res) {
            dispatch(updateCompletedLectures(SubSectionId));
        }

        setLoading(false);
    };

    //  UI
    if (!videoData) {
        return <div className="text-white">No Data Found</div>;
    }


    return (
        <div className="text-white">
            {/* Video Player */}
            <div className="relative">
                <div>
                    <video
                        width="100%"
                
                        controls
                        onEnded={() => setVideoEnded(true)}
                    >
                        <source src={videoData?.videoUrl} type="video/mp4" />
                    </video>
                </div>
                {/* Overlay when video ends */}
                {videoEnded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 gap-4">

                        {/* Mark Completed */}
                        {!completedLectures.includes(SubSectionId) && (
                            <ActionBtn
                                disabled={loading}
                                onclick={handleLectureCompletion}
                                text={loading ? "Loading" : "Mark as Completed"}
                            />
                        )}

                        {/* Rewatch */}
                        <ActionBtn
                            onclick={() => {
                                playerRef.current?.seekTo(0);
                                setVideoEnded(false);
                            }}
                            text="Rewatch"
                        />

                        {/* Navigation */}
                        <div className="flex gap-4">
                            {!isFirstVideo() && (
                                <button
                                    onClick={goToPreVideo}
                                    className="px-4 py-2 bg-[#161D29] rounded"
                                >
                                    Prev
                                </button>
                            )}

                            {!isLastVideo() && (
                                <button
                                    onClick={goToNextVideo}
                                    className="px-4 py-2 bg-[#161D29] rounded"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Video Info */}
            <h1 className="text-2xl font-semibold mt-4">
                {videoData?.title}
            </h1>
            <p className="text-gray-400">{videoData?.description}</p>
        </div >
    );
};

export default VideoDetails;