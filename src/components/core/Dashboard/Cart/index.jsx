import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate()

    const { totalItems } = useSelector((state) => state.cart);

    return (
        <div className="w-11/12 max-w-6xl mx-auto mt-10 text-gray-100">

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-2">
                Your Cart
            </h1>

            <p className="text-gray-400 mb-6">
                {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
            </p>

            {totalItems > 0 ? (

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* LEFT: Courses */}
                    <div className="flex-1 border-r border-gray-700 pr-6">
                        <RenderCartCourses />
                    </div>

                    {/* RIGHT: Total */}
                    <div className="w-full lg:w-[350px] pl-6">
                        <RenderTotalAmount />
                    </div>

                </div>

            ) : (

                <div className="flex flex-col items-center justify-center mt-20">
                    <p className="text-gray-400 text-lg mb-4">
                        Your Cart is Empty
                    </p>
                </div>

            )}

        </div>
    );
};

export default Cart;