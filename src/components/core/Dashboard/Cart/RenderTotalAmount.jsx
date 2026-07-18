import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionBtn from "../../../common/ActionBtn";
import { buyCourse } from "../../../../Services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {

    const { totalPrice, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleBuyCourse = () => {

        if (cart.length === 0) return;

        //  get all course IDs
        const courseIds = cart.map((course) => course._id);

        if (token) {
            buyCourse(token, courseIds, navigate, dispatch, user);
            return;
        }

        setConfirmationModal({
            text1: "You Are Not Logged In",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        });
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm mt-1">

            <p className="text-gray-400 text-sm mb-2">
                Total:
            </p>

            <p className="text-2xl font-bold text-yellow-400 mb-4">
                ₹ {totalPrice}
            </p>

            <ActionBtn
                text="Buy Now"
                onclick={handleBuyCourse}
                customClasses="w-full justify-center bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
            />

        </div>
    );
};

export default RenderTotalAmount;