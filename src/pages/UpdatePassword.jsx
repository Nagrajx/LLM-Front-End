import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from '../Services/operations/authAPI'
import toast from 'react-hot-toast'

const UpdatePassword = () => {

  const { id: passwordToken } = useParams(); // ✅ TOKEN YAHAN SE AAYEGA
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordToken) {
      toast.error("Invalid or expired reset link");
      return;
    }

    dispatch(resetPassword(password, confirmPassword, passwordToken, navigate));
  };

  return (
    <div className='min-h-[calc(100vh-3.5rem)] flex justify-center items-center'>
      {
        loading ? (
          <div className='spinner'></div>
        ) : (
          <div className='max-w-[500px] p-8 flex flex-col gap-4'>
            <h2 className='text-[1.875rem] text-[#F1F2FF] font-semibold'>
              Create new password
            </h2>

            <form onSubmit={submitHandler}>
              {/* password */}
              <label className='relative'>
                <p className="mb-1 text-[#F1F2FF]">New Password *</p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-[#2C333F] text-white p-3 rounded'
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </label>

              {/* confirm password */}
              <label className='relative mt-4 block'>
                <p className="mb-1 text-[#F1F2FF]">Confirm Password *</p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full bg-[#2C333F] text-white p-3 rounded'
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 cursor-pointer"
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </label>

              <button
                type='submit'
                className='w-full mt-6 bg-yellow-500 text-black py-3 rounded font-medium'
              >
                Reset Password
              </button>
            </form>

            <Link to="/login" className='text-richblack-5 flex items-center gap-2'>
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default UpdatePassword;
