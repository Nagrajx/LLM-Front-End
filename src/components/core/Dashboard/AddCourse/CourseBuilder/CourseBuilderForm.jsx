import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import ActionBtn from "../../../../common/ActionBtn";
import { useDispatch, useSelector } from "react-redux";
import { setStep, setEditCourse, setCourse } from "../../../../../Redux/Slices/courseSlice";
import { IoMdArrowDropright } from "react-icons/io";
import toast from "react-hot-toast";
import { updateSection, createSection } from "../../../../../Services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const [editSectionName, setEditSectionName] = useState(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // Navigate to next step
    const goToNext = () => {
        if (!course?.courseContent || course.courseContent.length === 0) {
            toast.error("Please add at least one section to proceed.");
            return;
        }

        if (course.courseContent.some((section) => section.SubSections?.length === 0)) {
            toast.error("Please add at least one lecture in each section to proceed.");
            return;
        }

        dispatch(setStep(3));
    };

    const goToBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    const onsubmit = async (data) => {
        if (!data.sectionName) return;

        setLoading(true);
        let result;

        try {
            if (editSectionName) {
                // Update existing section
                result = await updateSection({
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id
                }, token);

                if (result?.success) toast.success("Section name updated successfully");
            } else {
                // Create new section
                result = await createSection({
                    sectionName: data.sectionName,
                    courseId: course._id,
                }, token);

                if (result) toast.success("Section created successfully");
            }

            if (result) {
                dispatch(setCourse(result)); // update Redux course
                setValue("sectionName", "");
                setEditSectionName(null);
            }

        } catch (error) {
            console.error("Error in creating/updating section: ", error);
            toast.error("Failed to create/update section. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            setEditSectionName(null);
            setValue("sectionName", "");
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    };


    return (
        <div className="bg-[#161D29] p-6 rounded-md">
            <form onSubmit={handleSubmit(onsubmit)}>
                <h1 className="text-2xl font-bold mb-4">Course Builder</h1>

                <div>
                    <label htmlFor="SectionName" className="block mb-3">
                        Section Name <sup>*</sup>
                    </label>
                    <input
                        type="text"
                        id="SectionName"
                        placeholder="Add to Build Your Section"
                        {...register("sectionName", { required: "Section Name is required" })}
                        className="w-full p-2 mb-3 rounded-md bg-[#2C333F] border-b border-white"
                    />
                    {errors.sectionName && <p className="text-red-500">{errors.sectionName.message}</p>}
                </div>

                <div className="flex items-center mt-4 gap-2">
                    <ActionBtn
                        type="submit"
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        disabled={loading}
                    >
                        <IoAddCircleOutline size={25} />
                    </ActionBtn>

                    {editSectionName && (
                        <button
                            type="button"
                            className="px-4 py-2 text-sm text-gray-300 underline"
                            onClick={() => { setEditSectionName(null); setValue("sectionName", ""); }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )}

            <div className="flex justify-end gap-3 mt-6">
                <button
                    className="px-6 py-3 rounded-md font-semibold border text-black bg-[#2C333F] cursor-pointer"
                    onClick={goToBack}
                >
                    Back
                </button>

                <ActionBtn text="Next" onclick={goToNext}>
                    <IoMdArrowDropright size={25} />
                </ActionBtn>
            </div>
        </div>
    );
};

export default CourseBuilderForm;
