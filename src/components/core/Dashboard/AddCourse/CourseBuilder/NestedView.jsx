import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import ConfirmationModal from "../../../../common/ConfirmationalModal";
import { deleteSection, deleteSubSection } from "../../../../../Services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../Redux/Slices/courseSlice";
import SubSectionModel from "./SubSectionModel";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModel, setConfirmationModel] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection(
            {
                sectionId,
                courseId: course._id,
            },
            token
        );

        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModel(null);
    };

     const handleDeleteSubSection = async (subSectionId , sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId}, token );
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModel(null)
  }



    return (
        <div>
            <div className="space-y-3 mt-4 rounded-lg bg-[#2C333F] p-6 px-8  " >
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open>
                            <summary className="flex items-center justify-between gap-x-3 border-b border-white  ">
                                <div className=" flex items-center  gap-x-3  block mb-2 cursor-pointer">
                                    <RxDropdownMenu size={20} />
                                    <p>{section.sectionName}</p>

                                </div>

                                <div className="flex  items-center  space-x-3 cursor-pointer">
                                    <button
                                        onClick={() => (handleChangeEditSectionName(section._id, section.sectionName))}
                                        className="cursor-pointer"
                                    >
                                        <MdModeEditOutline size={20} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setConfirmationModel({
                                                text1: "Delete this Section",
                                                text2: "All the lecture in this section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModel(null)
                                            })
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <MdDeleteOutline size={20} />
                                    </button>

                                    <span>|</span>
                                    <MdOutlineArrowDropDown size={20} />
                                </div>
                            </summary>

                            <div>
                                {section?.SubSections?.map((data) => (
                                    <div
                                        key={data._id}
                                        onClick={() => setViewSubSection(data)}
                                        className="flex items-center justify-between cursor-pointer border-b-2 border-richblack-600 py-2"
                                    >
                                        <div className="flex gap-x-3 items-center py-2">
                                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                                            <p className="font-semibold text-richblack-50">{data.title}</p>
                                        </div>

                                        <div
                                            className="flex items-center gap-x-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() =>
                                                    setEditSubSection({ ...data, sectionId: section._id })
                                                }
                                            >
                                                <MdEdit className="text-xl text-richblack-300" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setConfirmationModel({
                                                        text1: "Delete this lecture",
                                                        text2: "This lecture will be deleted permanently",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () =>
                                                        handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModel(null),
                                                    })
                                                }
                                            >
                                                <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                            </button>
                                        </div>
                                    </div>
                                ))}


                                <button
                                    onClick={() => setAddSubSection({ sectionId: section._id })}   // ✅ FIXED
                                    className="flex items-center mt-5 gap-x-2 text-amber-300 cursor-pointer">
                                    <LuPlus />
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>
                    ))
                }
            </div>
            {
                addSubSection ? (<SubSectionModel
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true} />)
                    : viewSubSection ? (<SubSectionModel
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true} />)
                        : editSubSection ? (<SubSectionModel
                            modalData={editSubSection}
                            setModalData={setEditSubSection}
                            edit={true} />)
                            : (<div></div>)
            }


            {
                confirmationModel ? (<ConfirmationModal modalData={confirmationModel} />) : (<div></div>)
            }


        </div >
    )
}

export default NestedView;