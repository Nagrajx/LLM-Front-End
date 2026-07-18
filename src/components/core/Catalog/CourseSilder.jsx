import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import CourseCard from "./CourseCard";

const CourseSilder = ({ courses }) => {

    return (
        <div>
            {courses?.length ? (
                <Swiper
                    spaceBetween={20}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                    }}
                    className="mySwiper"
                >
                    {courses.map((course, index) => (
                        <SwiperSlide key={course._id || index}>
                            <CourseCard 
                                course={course} 
                                Height="h-[250px]" 
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>No courses found in this category</p>
            )}
        </div>
    );
};

export default CourseSilder;