import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../Services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../Redux/Slices/courseSlice";
import { RxCross2 } from "react-icons/rx";
import Upload from "./Upload";
import ActionBtn from "../../../../common/ActionBtn";

const SubSectionModel = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,

}) => {


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()


    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    })

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        else {
            return false
        }
    }
    
    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        //Always send required fields
        formData.append("title", currentValues.lectureTitle);
        formData.append("description", currentValues.lectureDesc);
        formData.append("timeDuration", currentValues.timeDuration);

        //  Optional file
        if (currentValues.lectureVideo instanceof File) {
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id.toString() === modalData.sectionId.toString() ? result : section
            );

            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }));
        }

        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view)
            return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No Changes made to the form")
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("timeDuration", data.timeDuration);
        formData.append("videoFile", data.lectureVideo);

        setLoading(true);
        const result = await createSubSection(formData, token)
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id.toString() === modalData.sectionId.toString()
                    ? result
                    : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null)
        setLoading(false);
    }

    return (
        <div className="fixed inset-0 z-[1000]   flex flex-col items-center justify-center  mr-20  ">

            <div className="bg-[#161D29]    p-6 rounded-md w-[500px] "  >
                <div>

                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture </p>
                    <button
                        onClick={() => (!loading) ? setModalData(null) : {}}>
                        <RxCross2 size={30} className="cursor-pointer" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    <div className="mt-3">
                        <label htmlFor="lectureTitle">Lecture Title <sup>*</sup></label>
                        <input
                            id="lectureTitle"
                            placeholder="Enter Lecture title"
                            {...register("lectureTitle", { required: true })}
                            className="w-full p-2 mb-3 rounded-md bg-[#2C333F] border-b border-white"
                        />
                        {
                            errors.lectureTitle && (<span>
                                Lecture Title is Required
                            </span>)
                        }
                    </div>

                    <div className="mt-3">
                        <label htmlFor="lectureDesc">Lecture Description <sup>*</sup></label>
                        <textarea id="lectureDesc"
                            placeholder="Enter Description Here"
                            {...register("lectureDesc", { required: true })}
                            className="w-full h-[132px] p-2 mb-3 rounded-md bg-[#2C333F] border-b border-white"

                        >
                        </textarea>
                        {
                            errors.lectureDesc && (<span>
                                Lecture Description is required
                            </span>)
                        }
                    </div>

                    {
                        !view && (
                            <div className='flex justify-end'>
                                <ActionBtn
                                    text={loading ? "loading..." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }
                </form>
            </div>


        </div>
    )
}

export default SubSectionModel;