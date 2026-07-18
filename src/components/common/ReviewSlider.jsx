import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";
import { getRatingAndReview } from "../../Services/operations/courseDetailsAPI";


const ReviewSlider = () => {

    const { token } = useSelector((state) => state.auth);
    const [review, setReviews] = useState([]);

    const turncateWords = 15;


    useEffect(() => {
        const RatingAndReview = async () => {
            const Result = await getRatingAndReview(token)
            setReviews(Result);
            console.log(Result);

        }
        RatingAndReview()
    }, [])


    return (
        <div className="text-white flex flex-col ">
            <div className="mt-20 ">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                    }}

                >
                    {
                        review.map((review, index) => (
                            (
                                
                                    <SwiperSlide
                                        key={index}>
                                        <img
                                            src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/7.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`}
                                            className="h-9 w-9 object-cover rounded-full  "
                                        />
                                        <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                        <p>{review?.course?.courseName}</p>
                                        <p>{review?.review}</p>
                                        <p>{review?.rating}</p>
                                        <ReactStars 
                                        count={5}
                                        value={review?.rating}
                                        size={24}
                                        edit={false}
                                        
                                        />
                                    </SwiperSlide>
                              

                            )
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider;