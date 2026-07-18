import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../Redux/Slices/cartSlice";

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="w-11/12 max-w-5xl  ">

            {cart.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">
                    Your cart is empty
                </p>
            ) : (
                <div className="space-y-6">

                    {cart.map((course, index) => (
                        <div
                            key={course._id || index}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
                        >

                            {/* LEFT: Image + Info */}
                            <div className="flex gap-4 w-full md:w-3/4">

                                <img
                                    src={course?.thumbnail}
                                    alt={course?.courseName}
                                    className="w-32 h-20 object-cover rounded"
                                />

                                <div className="flex flex-col justify-between">

                                    <div>
                                        <p className="text-lg font-semibold text-gray-100">
                                            {course?.courseName}
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            {course?.category?.name}
                                        </p>
                                    </div>

                                    {/* Ratings */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-yellow-400 font-medium">
                                            4.8
                                        </span>

                                        <ReactStars
                                            count={5}
                                            size={18}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<CiStar />}
                                            fullIcon={<FaStar />}
                                        />

                                        <span className="text-sm text-gray-400">
                                            {course?.ratingAndReviews?.length} Ratings
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* RIGHT: Price + Remove */}
                            <div className="flex md:flex-col items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-4">

                                <p className="text-xl font-semibold text-yellow-400">
                                    ₹ {course?.price}
                                </p>

                                <button
                                    onClick={() => dispatch(removeFromCart(course._id))}
                                    className="flex items-center gap-1 text-red-400 hover:text-red-500 transition"
                                >
                                    <MdDelete size={20} />
                                    <span>Remove</span>
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default RenderCartCourses;