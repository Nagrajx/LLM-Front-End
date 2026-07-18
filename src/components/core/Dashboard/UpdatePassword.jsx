import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../Services/operations/authAPI";
import { useForm } from "react-hook-form";
import ActionBtn from "../../common/ActionBtn";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const UpdatePassword = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const submitNewPassword = async (data) => {
        try {
            await changePassword(token, data,navigate ,dispatch);
        }
        catch (error) {
            console.log("Error message :", error.message);
        }
    }

    return (
        <div className='my-10 rounded-md border border-[#2C333F] bg-[#161D29] md:p-8 md:px-12 p-6' >

            <form onSubmit={handleSubmit(submitNewPassword)}>
                <div className="flex gap-x-6  ">
                    <div className="flex flex-col w-full  space-y-3 relative" >
                        <label htmlFor="password">Old Password</label>
                        <input type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Your Old Password"
                            className="border border-white p-3 rounded-md"
                            {...register("password", { required: true })}
                        />
                        {
                            errors.password && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>Old Password Is Required</span>
                            )
                        }
                        <span
                            className='absolute right-3 top-[50px] cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2Bf" />) : (< AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf" />)}
                        </span>
                    </div>

                    <div className="flex flex-col w-full  space-y-3 relative" >
                        <label htmlFor="NewPassword">NewPassword</label>
                        <input type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter Your New Password"
                            className="border border-white p-3  rounded-md "
                            {...register("newPassword", { required: true })}
                        />
                        {
                            errors.newPassword && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>Old Password Is Required</span>
                            )
                        }
                        <span
                            className='absolute right-3 top-[50px] cursor-pointer '
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2Bf" />) : (< AiOutlineEyeInvisible fontSize={24} fill="#AFB2Bf" />)}
                        </span>

                    </div>

                </div>
                <div className='flex justify-end gap-2 mt-6'>
                    <button
                        onClick={() => navigate("/dashboard/my-profile")}
                        className='cursor-pointer rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-[#C5C7D4]'>
                        Cancel
                    </button>
                    <ActionBtn text="save" type="submit" />
                </div>

            </form>

        </div>
    )


}
export default UpdatePassword;