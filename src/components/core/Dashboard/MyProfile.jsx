import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ActionBtn from '../../common/ActionBtn';
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
  const {user} = useSelector( (state) => state.profile);
  const navigate = useNavigate();
 console.log("user", user);
  return (
    <div>

      <h2 className='text-3xl font-medium text-[#F1F2FF] mb-14'>My Profile</h2>

      <div className='flex md:flex-row flex-col gap-y-5 justify-between items-center rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-6 md:px-12 md:py-8  '>
           
            <div className='flex gap-x-4 items-center'>
             <img
                src={user?.profileImage}
                alt='userImage'
                loading='lazy'
                className='rounded-full aspect-square w-[78px] object-cover'
             />
            <div className='space-y-1'>
                <p className='text-lg text-[#F1F2FF] font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                <p className='text-sm text-[#838894]'>{user?.email}</p>
            </div>
          </div>

          <div>
              <ActionBtn text={"Edit"} onclick={() => navigate("/dashboard/settings")}>
                 <RiEditBoxLine/>
              </ActionBtn>
          </div>
      </div>

      <div className='my-10 flex flex-col gap-y-8 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] md:px-12 md:py-8 p-6'>
          <div className='flex justify-between items-center'>
             <p className='text-lg font-semibold text-[#F1F2FF]'>About</p>
             <ActionBtn
               text={"Edit"}
               onclick={ () => navigate("/dashboard/settings")}>
                <RiEditBoxLine/>
             </ActionBtn>
          </div>

          <p className={`text-sm font-medium w-10/12 ${user?.additionalDetails.about ? "text-[#F1F2FF]" : "text-[#6E727F]"}`}>
             {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
      </div>

      <div className='my-10 flex flex-col gap-y-8 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] md:px-12 md:py-8 p-6'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-semibold text-[#F1F2FF]'>Persional Details</p>
            <ActionBtn
              text={"Edit"}
              onclick={ () => navigate("/dashboard/settings")}>
                <RiEditBoxLine/>
            </ActionBtn>
          </div>

          <div className='flex md:flex-row flex-col space-y-2 justify-between max-w-[500px]'>

              <div className='space-y-5'>
                <div className='space-y-2'>
                   <p className='text-sm text-[#424854]'>First Name</p>
                   <p className='text-sm font-medium text-[#F1F2FF]'>{user?.firstName}</p>
                </div>

                <div className='space-y-2'>
                   <p className='text-sm text-[#424854]'>Email</p>
                   <p className='text-sm font-medium text-[#F1F2FF]'>{user?.email}</p>
                </div>

                <div className='space-y-2'>
                   <p className='text-sm text-[#424854]'>Gender</p>
                   <p className={`text-sm font-medium ${user?.additionalDetails?.gender ? "text-[#F1F2FF]" : "flex text-[#999DAA]"}`}>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
              </div>

              <div className='space-y-5'>
                <div className='space-y-2'>
                   <p className='text-sm text-[#424854]'>Last Name</p>
                   <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                </div>

                <div className='space-y-2'>
                   <p className='text-sm text-[#424854]'>Phone Number</p>
                   <p className={`text-sm font-medium ${user?.additionalDetails?.contactNumber ? "text-[#F1F2FF]" : "flex text-richblack-200"}`}>{user?.additionalDetails?.contactNumber ?? "Add Phone Number"}</p>
                </div>

                <div className='space-y-2'>
                   <p className='text-sm text-[#424854]'>Date of Birth</p>
                   <p className={`text-sm font-medium ${user?.additionalDetails?.DateOfBirth ? "text-[#F1F2FF]" : "flex text-richblack-200"}`}>{user?.additionalDetails?.DateOfBirth  ??"Add Date of Birth"}</p>
                </div>
              </div>
             
          </div>


      </div>

    </div>
  )
}

export default MyProfile