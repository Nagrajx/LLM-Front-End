import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import ActionBtn from "../../common/ActionBtn";
import { ratingAndReview } from "../../../Services/operations/courseDetailsAPI";
import { toast } from "react-hot-toast";

const CourseReviewModal = ({ setReviewModal }) => {
   const { user } = useSelector((state) => state.profile);
   const { token } = useSelector((state) => state.auth);
   const { courseEntireData } = useSelector((state) => state.viewCourse);

   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
   } = useForm();

   // ==============================
   // Initialize form values
   // ==============================
   useEffect(() => {
      register("courseRating", { required: true });
      setValue("courseExperience", "");
      setValue("courseRating", 0);
   }, [register, setValue]);

   const currentRating = watch("courseRating");

   // ==============================
   // Submit Handler
   // ==============================
   const onSubmit = async (data) => {
      if (!data.courseRating || data.courseRating === 0) {
         toast.error("Please select a rating ⭐");
         return;
      }

      if (!data.courseExperience?.trim()) {
         toast.error("Please write your review");
         return;
      }

      setLoading(true);

      const response = await ratingAndReview(
         {
            courseId: courseEntireData?._id,
            rating: data.courseRating,
            review: data.courseExperience,
         },
         token
      );

      setLoading(false);

      // ✅ Close modal only on success
      if (response) {
         setReviewModal(false);
      }
   };

   // ==============================
   // Rating Change
   // ==============================
   const ratingChange = (newRating) => {
      setValue("courseRating", newRating, { shouldValidate: true });
   };

   return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center 
    bg-black/50 backdrop-blur-sm p-4">

         {/* Modal Card */}
         <div className="w-full max-w-md bg-[#161D29] rounded-xl shadow-2xl p-6 border border-richblack-[#2C333F]">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#2C333F] pb-3">
               <p className="text-lg font-semibold text-white">Add Review</p>
               <button
                  onClick={() => setReviewModal(false)}
                  className="text-sm text-gray-400 hover:text-white transition"
               >
                  ✕
               </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mt-4">
               <img
                  src={user?.profileImage}
                  className="w-[50px] h-[50px] rounded-full object-cover border"
                  alt="user"
               />
               <div>
                  <p className="font-medium text-white">
                     {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-400">Posting Publicly</p>
               </div>
            </div>

            {/* Form */}
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="mt-6 flex flex-col gap-5"
            >
               {/* ⭐ Rating */}
               <div className="flex flex-col items-center">
                  <ReactStars
                     count={5}
                     onChange={ratingChange}
                     size={30}
                     color2={"#ffd700"}
                     value={currentRating}
                  />
                  {errors.courseRating && (
                     <span className="text-sm text-red-400 mt-1">
                        Please select rating
                     </span>
                  )}
               </div>

               {/* Review */}
               <div>
                  <label
                     htmlFor="courseExperience"
                     className="text-sm text-gray-300"
                  >
                     Add Your Experience
                  </label>

                  <textarea
                     id="courseExperience"
                     placeholder="Write your experience..."
                     {...register("courseExperience", { required: true })}
                     className="w-full mt-2 p-3 rounded-lg bg-richblack-700 
            text-white border border-richblack-600 focus:outline-none 
            focus:ring-2 focus:ring-yellow-400 transition"
                  />

                  {errors.courseExperience && (
                     <span className="text-sm text-red-400">
                        Please add your review
                     </span>
                  )}
               </div>

               {/* Buttons */}
               <div className="flex justify-end gap-3">
                  <button
                     type="button"
                     onClick={() => setReviewModal(false)}
                     className="px-4 py-2 rounded-lg bg-richblack-600 
            text-white hover:bg-richblack-500 transition"
                     disabled={loading}
                  >
                     Cancel
                  </button>

                  <ActionBtn
                     text={loading ? "Saving..." : "Save"}
                     type="submit"
                     disabled={loading}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default CourseReviewModal;