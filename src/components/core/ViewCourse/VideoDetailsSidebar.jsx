import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import ActionBtn from "../../common/ActionBtn"


const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStaus] = useState("");
    const [videActiveBar, setVideoActiveBar] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { SectionId, SubSectionId } = useParams();

    const {
        courseSectionsData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);



    useEffect(() => {
        const SetActiveFlag = () => {
            // ✅ Guard: data not loaded
            if (!courseSectionsData || courseSectionsData.length === 0) return;

            // ✅ Find current section
            const currentSectionIndex = courseSectionsData.findIndex(
                (data) => data._id === SectionId
            );



            const currentSection = courseSectionsData[currentSectionIndex];

            //  Find current subsection
            const currentSubSectionIndex = currentSection?.SubSections?.findIndex(
                (data) => data._id === SubSectionId
            );

            if (currentSubSectionIndex === -1) return;

            const activeSubSectionId =
                currentSection.SubSections[currentSubSectionIndex]?._id;

            //  Set active section
            setActiveStaus(currentSection._id);

            //  Set active video
            setVideoActiveBar(activeSubSectionId);
        };

        SetActiveFlag();
    }, [courseSectionsData, SectionId, SubSectionId, location.pathname]);


    return (
        <div className="text-white">

            <div className="mt-6 flex flex-col space-y-2 ">
                {/* buttons and heading */}
                <div  >
                    {/* buttons */}
                    <div className="flex  justify-around">
                        <div
                            onClick={() => {
                                navigate("/dashboard/enrolled-courses")
                            }}>
                            <IoChevronBackCircleSharp size={34} />

                        </div>
                        <div>
                            <ActionBtn
                                text="Add Review"
                                onclick={() => {
                                    setReviewModal(true)

                                }} />
                        </div>
                    </div>
                    {/* Heading */}

                </div>
                <div className="flex flex-col ml-10">
                    <p className="text-xl font-bold" >{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} /{totalNoOfLectures}</p>
                </div>
            </div>

            {/* For Sections And SubSections */}
            <div className="mt-1">
                {
                    courseSectionsData.map((course, index) => {
                        return (
                            <div

                                onClick={() => setActiveStaus(course?._id)}
                                key={index}
                            >
                                {/* Section  */}
                                <div className="p-4 bg-gray-500 ">
                                    <div className="ml-9">
                                        {course?.sectionName}
                                    </div>
                                    {/* Add Arrow Icon Here and handle roate logic */}
                                </div>
                                {/* For SubSection */}

                                <div>
                                    {
                                        activeStatus === course?._id && (
                                            <div>
                                                {
                                                    course.SubSections.map((topic, index) => (
                                                        <div
                                                            className={`flex gap-5 p-5 ${videActiveBar === topic._id
                                                                    ? "bg-amber-500 text-black"
                                                                    : "bg-black text-white"
                                                                }`}
                                                            key={topic._id}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/view-course/${courseEntireData?._id}/Section/${course?._id}/SubSection/${topic._id}`
                                                                );
                                                                setVideoActiveBar(topic?._id);
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    Array.isArray(completedLectures) &&
                                                                    completedLectures.includes(topic?._id)
                                                                }
                                                                readOnly
                                                                
                                                            />
                                                            <span>{topic.title}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VideoDetailsSidebar;