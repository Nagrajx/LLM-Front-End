import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASingalCourseDetail } from "../../../../Services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../Redux/Slices/courseSlice";
import RenderSteps from "../../Dashboard/AddCourse/RenderSteps"

const EditCourse = () => {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLodaing] = useState(false);
    const { token } = useSelector((state) => state.auth);


    useEffect(() => {
        const populateCourseDetails = async () => {
            setLodaing(true)
            const result = await getASingalCourseDetail(courseId, token);
            console.log("Course API Result:", result);

            if (result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            setLodaing(false);

        }

        populateCourseDetails()
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <h1>
                Edit Course
                <div>
                    {
                        course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                    }
                </div>
            </h1>
        </div>
    )
}

export default EditCourse;