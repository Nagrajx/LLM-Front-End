import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCaretDown } from "react-icons/ai"
import { useState } from 'react';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logOut } from '../../../Services/operations/authAPI';
// import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileDropDown = () => {
    const {user} = useSelector( (state) => state.profile);
    const [open , setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const ref = useRef(null);

    // useOnClickOutside(ref, () => setOpen(false))
  return (
    <button className='relative' onClick={() => setOpen(!open)}>
        <div className='flex items-center gap-x-1 '>
            <img
                src={user?.profileImage}
                alt='profileimage'
                loading='lazy'
                className='aspect-square rounded-full w-[40px] object-cover'
            />
            <AiOutlineCaretDown className='text-sm text-[#AFB2BF]'/>
        </div>
        {
            open && (
                <div  onClick={(e) => e.stopPropagation()}
                 className='absolute right-0 top-[2.3rem] z-[1000] divide-y-[1px] divide-[#2C333F] rounded-md border border-[#2C333F] overflow-hidden bg-[#161D29]'>
                    <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                        <div className='flex items-center gap-x-1 py-[10px] px-3 text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]'>
                            <VscDashboard className='text-lg'/>
                            <span>Dashboard</span>
                        </div>
                    </Link>

                    <div onClick={() => {
                        dispatch(logOut(navigate));
                        setOpen(false);
                    }}
                    className='flex items-center gap-x-1 px-3 py-[10px] text-sm text-[#AFB2BF] hover:text-[#DBDDEA] hover:bg-[#2C333F] '>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>
                </div>
            )
        }
    </button>
  )
}

export default ProfileDropDown