import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getallcategories } from "../../../../../Services/operations/courseAPI";
import { createcourse } from "../../../../../Services/operations/courseDetailsAPI";
import { PiCurrencyInrBold } from "react-icons/pi";
import RequirementField from "./RequirementField";
import ActionBtn from "../../../../common/ActionBtn"
import { editCourseDetails } from "../../../../../Services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { setCourse, } from "../../../../../Redux/Slices/courseSlice"
import { setStep } from "../../../../../Redux/Slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/contant"
import Upload from "../CourseBuilder/Upload";

const CourseInformationForm = () => {
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const { course, editCourse } = useSelector((state) => state.course);
   const [loading, setLoading] = useState(false);
   const [courseCategories, setCourseCategories] = useState([]);


   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
   } = useForm();


   useEffect(() => {
      const getCategories = async () => {
         setLoading(true);
         const Categories = await getallcategories();
         if (Categories.length > 0) {
            setCourseCategories(Categories);
         }
         setLoading(false);
      }
      if (editCourse) {
         setValue("courseTitle", course.courseName);
         setValue("courseShortDesc", course.courseDescription);
         setValue("coursePrice", course.price);
         setValue("courseTags", course.tag);
         setValue("courseBenefits", course.whatYouwillLearn);
         setValue("courseCategory", course.Category);
         setValue("courseRequirements", course.instructions);
         setValue("courseImage", course.thumbnail);
      }
      getCategories();
   }, [])




   const isFormUpdated = () => {
      const currentValues = getValues();
      if (currentValues.courseTitle !== course.courseName ||
         currentValues.courseShortDesc !== course.courseDescription ||
         currentValues.coursePrice !== course.coursePrice ||
         // currentValues.courseTags.toString() !== course.tag.toString() ||
         currentValues.courseBenefits !== course.whatYouWillLearn ||
         currentValues.courseCategory !== course.category._id ||
         // currentValues.courseImage !== course.thumbnail ||
         currentValues.courseRequirements.toString() !== course.instructions.toString())
         return true;
      else
         return false;

   }
   const onSubmit = async (data) => {
      if (editCourse) {
         if (isFormUpdated()) {
            const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);

            if (currentValues.courseTitle !== course.courseName) {
               formData.append("courseName", data.courseTitle);
            }
            if (currentValues.courseShortDesc !== course.courseDescription) {
               formData.append("courseDescription", data.courseShortDesc);
            }
            if (currentValues.coursePrice !== course.price) {
               formData.append("price", data.coursePrice);
            }
            if (currentValues.courseBenefits !== course.whatYouWillLearn) {
               formData.append("whatYouWillLearn", data.courseBenefits);
            }
            if (currentValues.courseCategory !== course.category._id) {
               formData.append("Category", data.courseCategory);
            }
            if (
               currentValues.courseRequirements.toString() !==
               course.instructions.toString()
            ) {
               formData.append("instructions", JSON.stringify(data.courseRequirements));
            }

            if (data.courseImage instanceof File) {
               formData.append("thumbnailImage", data.courseImage);
            }

            setLoading(true);
            const result = await editCourseDetails(token, formData);
            setLoading(false);

            if (result) {
               dispatch(setStep(2));
               dispatch(setCourse(result));
            }
         } else {
            toast.error("No Changes made on form");
         }
         return;
      }

      // ✅ CREATE COURSE
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);  // FIXED KEY
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("thumbnailImage", data.courseImage);
      formData.append("status", COURSE_STATUS.DRAFT);

      setLoading(true);
      const result = await createcourse(token, formData);   // FIXED ORDER
      setLoading(false);

     if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
     }
   };



   return (

      <form onSubmit={handleSubmit(onSubmit)}
         className="rounded-md bg-[#161D29] p-6 space-y-5 mt-10">
         <div >
            <label htmlFor="courseTitle" className="block mb-3 font-semibold">Course Title<sup className="text-red-400">*</sup></label>
            <input type="text"
               id="courseTitle"
               placeholder="Enter Course Title"
               {...register("courseTitle", { required: true })}
               className="w-full bg-[#2C333F] border-b border-white  p-2 rounded-md"
            />
            {
               errors.courseTitle && (
                  <span className="text-red-500 text-sm">Course Title is Required</span>
               )
            }
         </div>

         <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            errors={errors}
            setValue={setValue}
            editData={editCourse ? course.thumbnail : null}
         />

         <div >
            <label htmlFor="courseShortDesc" className="block mb-3 font-semibold">Course Short Description<sup className="text-red-400">*</sup></label>
            <textarea type="text"
               id="courseShortDesc"
               placeholder="Enter Course Description"
               {...register("courseShortDesc", { required: true })}
               className="min-h-[140px] w-full bg-[#2C333F] border-b border-white  rounded-md  p-3 "
            />
            {
               errors.courseShortDesc && (
                  <span className="text-red-500 text-sm">Course Description is Required</span>
               )
            }
         </div>



         <div className="relative">
            <label htmlFor="coursePrice" className="block mb-3 font-semibold">
               Course Price <sup className="text-red-400">*</sup>
            </label>

            <input
               type="number"
               id="coursePrice"
               placeholder="Enter Course Price"
               {...register("coursePrice", {
                  required: true,
                  valueAsNumber: true,
               })}
               className="w-full bg-[#2C333F] rounded-md border-b border-white  p-2 pl-10"
            />

            <PiCurrencyInrBold className="absolute left-3 top-12  text-gray-400  " />

            {errors.coursePrice && (
               <span className="text-red-500 text-sm">
                  Course Price is required
               </span>
            )}
         </div>
         <div className="relative">
            <label htmlFor="courseCategory" className="block mb-3 font-semibold">
               Course Category <sup className="text-red-400">*</sup>
            </label>

            <select
               id="courseCategory"
               defaultValue=""
               {...register("courseCategory", { required: true })}
               className="w-full  bg-[#2C333F] rounded-md p-2 border-b border-white  "
            >
               <option value="" disabled>
                  Choose a Category
               </option>

               {!loading &&
                  courseCategories.map((category) => (
                     <option key={category._id} value={category._id} className="bg-[#161D29]">
                        {category.name}
                     </option>
                  ))}
            </select>

            {errors.courseCategory && (
               <span className="text-red-500 text-sm">
                  Course Category is required
               </span>
            )}
         </div>

         {/* A custom components for hadling tags input */}
         {/* <ChipInputs 
          label="Tags"
          name="CourseTags"
          placeholder="Enter Tag and Press Enter"
           register={register}
           errors={errors}
           setValue={setValue}
           getValues={getValues}
          /> */}

         {/* create and uploading showing preview of media */}




         {/* Befits of the course */}
         <div>
            <label htmlFor="courseBenefits" className="block mb-3 font-semibold">Benefits of the Course <sup className="text-red-400">*</sup></label>
            <textarea
               type="text"
               id="courseBenefits"
               placeholder="Enter Benefits of the Course"
               {...register("courseBenefits", { required: true })}
               className="w-full  min-h-[140px] bg-[#2C333F] p-3  border-b border-white  rounded-md"
            />
            {
               errors.courseBenefits && (
                  <span className="text-red-500 text-sm"> Benefits Of the Course are Required</span>
               )
            }
         </div>

         <RequirementField
            name="courseRequirements"
            label="courseRequirements"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}

         />

         <div>
            {
               editCourse && (
                  <button
                     type="button"
                     disabled={loading}
                     onClick={() => dispatch(setStep(2))}
                     className="flex items-center  p-2 rounded gap-x-2 bg-[#838894] disabled:opacity-50"
                  >
                     Continue Without Saving
                  </button>

               )
            }
         </div>

         <ActionBtn
            text={!editCourse ? "Next" : "Save Change"}
         />

      </form >

   )

}

export default CourseInformationForm;