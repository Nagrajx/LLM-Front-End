import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ActionBtn from "../../../../common/ActionBtn";
import { resetCourseState, setStep } from "../../../../../Redux/Slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/contant";
import { editCourseDetails } from "../../../../../Services/operations/courseDetailsAPI";


const PublishCourse = () => {


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
            if(course?.status === COURSE_STATUS.PUBLISHED){
                setValue("public",true);
            }
    },[])

    const goBack =()=>{
         dispatch(setStep(2))
    }

  
    const goToCourses = () =>{
        dispatch(resetCourseState());
        
    }


    const handleCoursePublish = async()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true  || (course.status === COURSE_STATUS.DRAFT &&  getValues("public")===false)){
            //   no update in the form
                    //   no need to make api call
                goToCourses();
                return;
        }
        const formData = new FormData();
        formData.append("courseId",course._id)
        
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
 
        formData.append("status",courseStatus);
         
        setLoading(true);
        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourses();
        }
        setLoading(false);
    } 

    const onSubmit = () => {
        handleCoursePublish();
    }

    return (
        <div className="rounded-md  border-[1px] border-[#2C333F] p-6 bg-[#161D29] ">

            <p className="text-xl font-semibold">Publish Settings</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="public">
                        <input type="checkbox"
                            id="public"
                            {...register("public", { required: true })}
                            className="rounded-md h-4 w-4  mt-4 "
                        />
                        <span className="ml-3   "> Make this Course as Public</span>
                    </label>
                </div>

                <div className="flex justify-end mt-6 gap-x-3">
                     <button disabled={loading}
                      type="button"
                      onClick={goBack}
                      className="flex items-center rounded-md  border p-3 px-4"
                      >
                       Back
                     </button>


                     <ActionBtn
                      disabled={loading}
                      text="Save Changes">
                       
                     </ActionBtn>
                </div>
            </form>
        </div>
    )
}
export default PublishCourse;