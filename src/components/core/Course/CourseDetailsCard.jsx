import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/contant";
import { addToCart } from "../../../Redux/Slices/cartSlice";
import { FaRegShareSquare } from "react-icons/fa";

const CourseDetailsCard = ({ course, setConfirmationModal, hendleBuyCourse }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const naviagate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: currentPrice,



    } = course;


    const handleAddToCart = () => {
            if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
                toast.error("You are an Instructor ,you can't buy a course");
                return;
            }   
            if(token){
                dispatch(addToCart(course));
                return
            }
            setConfirmationModal({
                text1:"Your are not logged In",
                text2:"Please Login to add to cart",
                btn1Text:"Login",
                btn2Text:"Cancel",
                btn1Handler:()=>naviagate("/login"),
                btn2Handler:()=>setConfirmationModal(null),
            })
    }

    const handleShare = () => {
          copy(window.location.href);
          toast.success("Link Copy to Clickboard");              
    }

    return (
        <div className="bg-gray-900 rounded-xl p-3 h-[550px]">
            <img src={ThumbnailImage} alt="Thumnail Imgae"
                className="max-h-[200px] min-h-[150px] w-p[400px] rounded-xl" />

            <div className="p-3 font-extrabold text-2xl">
                Rs.{currentPrice}
            </div>
            <div className="flex flex-col gap-y-4">
                <button
                    className="bg-yellow-500  rounded p-2 text-black font-semibold"
                    onClick={user && course.studentsEnrolled.includes(user?._id) ? () => naviagate("/dashboard/enrolled-courses") : hendleBuyCourse}
                >
                    {
                        user && course.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Course"

                    }
                </button>

                {
                    (!course?.studentsEnrolled.includes(user?._id) && (
                        <button
                            className="bg-gray-600 rounded p-2 text-white font-semibold"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    ))
                }

            </div>
            <div >
                <div className="flex justify-center ">
                   <p className="mt-4">30-Day Money-Back Guarantee</p>
                </div>
               
                <p className="font-bold text-xl mt-4">This Course Includes:</p>
                <div className="flex flex-col gap-y-3">
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className="flex gap-2">
                                <span>{item}</span>
                            </p>
                        ))

                    }
                </div>

            </div>
            <div className="flex justify-center" > 
                <button
                className="flex  items-center gap-2 p-6 text-yellow-500"
                    onClick={handleShare}
                ><FaRegShareSquare />
                    Share
                </button>
            </div>

        </div>
    )
}

export default CourseDetailsCard;
