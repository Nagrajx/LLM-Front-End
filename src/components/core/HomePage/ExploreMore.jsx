import React, { useState } from 'react'
import HighlightText from './HighLightText';
import { HomePageExplore } from "../../../data/homepage-explore"; 
import CourseCard from "../../core/HomePage/CourseCard"


const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
  
const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
          setCurrentTab(value);
          const result = HomePageExplore.filter( (course) => course.tag === value);
          setCourses(result[0].courses);
          setCurrentCard(result[0].courses[0].heading);
    };
  return (
    <div className='flex flex-col '>

        <div className='font-semibold text-4xl text-center'>
            Unlock the 
            <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-[#838894] text-[18px] text-center font-semibold mt-2'>
           Learn to Build Anything You Can Imagine
        </p>


        {/* tabs section  */}
        <div className=' hidden lg:flex rounded-full gap-5 bg-[#161D29] text-[#999DAA] p-1 font-medium  border-b-[1.5px] border-[rgba(255,255,255,0.25)] mt-5 mb-3'>
            {
                tabsName.map( (tab , index) => {
                    return (
                        <div className={`text-[16px] px-4 py-[7px] rounded-full transition-all duratoin-200
                                        ${tab === currentTab ? "bg-[#000814] flex text-[#F1F2FF] " : ""}
                                        cursor-pointer hover:bg-[#000814] hover:text-[#F1F2FF]`}
                            key={index}
                            onClick={() => setMyCards(tab)}>
                            {tab}
                        </div>
                    )
                })
            }
        </div>

        <div className="hidden lg:block lg:h-[200px]"></div>
        
        {/* cards section  */}
        <div className='mt-5 gap-y-10 lg:absolute flex lg:flex-row flex-col lg:justify-between flex-wrap w-full lg:bottom-0 text-black lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] lg:mb-0 mb-7 lg:px-0 px-3 '>
            {
                courses.map( (card  , index) => {
                    return(
                        <CourseCard
                            key={index}
                            courseData = {card}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                        />
                    )
                })
            }
        </div>  
    </div>
  )
}

export default ExploreMore

