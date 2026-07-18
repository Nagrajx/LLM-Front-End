import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({courseData , currentCard , setCurrentCard}) => {
  return (
    <div className={`md:w-[360px] lg:w-[30%] text-[#DBDDEA]
    ${ currentCard === courseData.heading ? 
    "bg-white shadow-[12px_12px_0_0] shadow-yellow-500" : "bg-[#161D29]"}   
    h-[300px] box-border cursor-pointer`}
    onClick={() => setCurrentCard(courseData.heading)}>
        
        <div className='h-[80%] flex flex-col gap-3 border-dashed border-[#6E727F] border-b-[2px] p-6'>

            <h2 className={`${currentCard === courseData.heading ? "text-[#161D29]" : ""} font-semibold text-[20px]`}>{courseData.heading}</h2>
            <p className='text-[#6E727F] text-[17px]'>{courseData.description}</p>

        </div>
        
        <div className={`flex justify-between ${currentCard === courseData.heading ? "text-blue-300" : 
        "text-[#838894]"} px-6 py-3 font-medium`}>

            <div className='flex items-center gap-1 text-[16px]'>
                <HiUsers/>
                <p>{courseData.level}</p>
            </div>

            <div className='flex items-center gap-2 text-[16px]'>
                <ImTree/>
                <p>{courseData.lessionNumber} Lession</p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard

