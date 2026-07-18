import React, { useEffect, useState } from 'react'
import { Link, useLocation, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { getallcategories } from '../../Services/operations/courseAPI';
import { BsChevronDown } from "react-icons/bs"
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { ImCross } from "react-icons/im"
// import SmallScreenNav from './SmallScreenNav';


const Navbar = () => {
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [subLinks, setSublinks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [isClose, setIsClose] = useState(false);



    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const data = await getallcategories();
            setSublinks(data);
        };

        fetchCategories();
        setLoading(false);
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }


    return (
        <div className={`h-[3.5rem] border-b-[1px] border-[#2C333F] ${location.path === "/" ? "bg-[#000814]" : "bg-[#161D29]"} transition-all duration-200`}>
            <div className='flex justify-between items-center w-11/12 max-w-[1260px] h-full mx-auto'>

                {/* logo */}
                <Link to="/">
                    <img src={Logo}
                        alt='logo'
                        height={32}
                        width={160}
                        loading='lazy'
                    />
                </Link>

                {/* navigation  link  */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-[#DBDDEA]' >
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ?
                                            (<div className='group relative flex items-center gap-1 cursor-pointer'>
                                                {link.title}
                                                <BsChevronDown />

                                                <div className='absolute invisible opacity-0 lg:w-[300px] -left-[16.6rem] -top-[28%] translate-x-[50%] translate-y-[3rem] flex flex-col  rounded-lg p-4 bg-[#F1F2FF] transitin-all duration-200 group-hover:visible  group-hover:opacity-100 z-10 text-[#000814]'>
                                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                    {loading && (
                                                        <div className="text-center">Loading...</div>
                                                    )}

                                                    {!loading && subLinks?.length > 0 && (
                                                        subLinks.map((sublink) => {
                                                            const slug = sublink.name
                                                                .toLowerCase()
                                                                .replace(/[\/\s]+/g, "-");

                                                            return (
                                                                <Link to={`/catalog/${slug}`} key={sublink._id || slug}>
                                                                    <p className="rounded-lg bg-transparent py-4 pl-4 hover:bg-[#C5C7D4]">
                                                                        {sublink.name}
                                                                    </p>
                                                                </Link>
                                                            );
                                                        })
                                                    )}

                                                    {!loading && subLinks?.length === 0 && (
                                                        <div className="text-center">No Courses found!!</div>
                                                    )}


                                                </div>
                                            </div>) :
                                            (
                                                <Link to={link?.path}>
                                                    <p className={` ${matchRoute(link?.path) ? "text-yellow-50" : "text-[#DBDDEA]"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* signup and login  */}
                <div className='gap-x-4 items-center flex '>   {/* hidden md:flex */}
                    {
                        user ? (
                            <div className='flex gap-x-4 items-center'>
                                {
                                    user.accountType !== "Instructor" && (
                                        <Link to="/dashboard/cart"
                                            className='relative'>
                                            <AiOutlineShoppingCart className="text-2xl text-[#AFB2BF]" />
                                            {
                                                totalItems > 0 && (
                                                    <span className='absolute -bottom-2 -right-2 flex items-center justify-center h-5 w-5 overflow-hidden rounded-full bg-[#424854] text-center font-bold text-yellow-100'>
                                                        {totalItems}
                                                    </span>
                                                )
                                            }
                                        </Link>
                                    )
                                }
                                <ProfileDropDown/>
                            </div>
                        ) :
                            (
                                <div className='flex gap-x-4'>

                                    <Link to="/login">
                                        <button
                                            className='border border-[#2C333F] bg-[#161D29] rounded-[8px] text-[#AFB2BF] px-3 py-2'>
                                            Log in
                                        </button>
                                    </Link>

                                    <Link to="/signup">
                                        <button
                                            className='border  border-[#2C333F] bg-[#161D29] rounded-[8px] text-[#AFB2BF] px-3 py-2'>
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )
                    }

                    {
                        isClose === false ? (
                            <button
                                onClick={() => setIsClose(true)}
                                className='mr-4 md:hidden'>
                                <AiOutlineMenu fontSize={24} fill='#AFB2BF' />
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsClose(false)}
                                className='mr-4 md:hidden'>
                                <ImCross fill='#AFB2BF' />
                            </button>
                        )
                    }
                    {
                        // isClose && (
                        //     <SmallScreenNav />
                        // )
                    }
                </div>


            </div>
        </div>
    )
}

export default Navbar
