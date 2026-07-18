import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import { useState } from "react";
import { useEffect } from "react";
import  GetAvgRating  from "../../../utils/avgRarting";



const CourseCard = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        let totalRating = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(totalRating);

    }, [course]);




    return (

        <div >
            <Link to={`/course/${course._id}`}>
                <div>
                    <div>
                        <img src={course.thumbnail} alt={course.name} className={`${Height} w-full rounded-xl object-cover`} />
                    </div>
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex gap-x-3">
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars ReviewCount={avgReviewCount}  />
                            <span>{course?.ratingAndReviews?.length || 0} students</span>
                        </div>
                        <p>Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default CourseCard;