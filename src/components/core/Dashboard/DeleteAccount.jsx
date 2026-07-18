import React, { useState } from "react";
import { deleteAccount } from "../../../Services/operations/profileAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../common/ConfirmationalModal";

const DeleteAccount = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()
   const [confirmationModalData, setConfirmationModalData] = useState(null);



    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(token,navigate, dispatch );
        }
        catch (error) {
            console.log("ERROR MESSAGE : ", error.message);
        }
    }


    return (
        <div className="bg-red-900 flex space-x-4 p-4 rounded-md">
            {/* left Side */}
            <div className="bg-red-400 rounded-full h-[60px] w-[60px] flex items-center justify-center ">
                <RiDeleteBin6Line size={30} />
            </div>
            {/* Right Side  */}
            <div className="space-y-2">
                <h1 className="font-semibold text-[20px]">Delete Account</h1>
                <div>
                    <p>Would you like to delete account</p>
                    <p>This Account May contain paid courses.Deleting Your account is <br />
                        permanent and will remove all the contain associated with it.</p>
                </div>

                <button
                    onClick={() => setConfirmationModalData({
                        text1: "Are you sure??",
                        text2: "All your enrolled courses will be deleted permanently",
                        btn1Text: "Delete Account",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteAccount(),
                        btn2Handler: () => setConfirmationModalData(null)
                    })}
                    className="italic text-red-700 text-[20px] cursor-pointer">
                    I want to delete my account
                </button>
            </div>

            {confirmationModalData &&  <ConfirmationModal modalData={ confirmationModalData}/>}
        </div>
    )

}

export default DeleteAccount;