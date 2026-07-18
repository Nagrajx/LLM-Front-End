import React from 'react'

import ContactDetails from '../components/core/ContactUsPage/ContactUsDetails'
import ContactUsForm from '../components/core/ContactUsPage/ContactUsForm'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div>

        <div className='w-11/12 mx-auto max-w-[1260px] mt-20  text-white'>
            
            <div className='flex lg:flex-row flex-col gap-10 justify-between'>
                {/* contact details  */}
                <div className='lg:w-[40%]'>
                    <ContactDetails/>
                </div>
                {/* contact us form  */}
                <div className='lg:w-[60%] p-14 border border-[#424854] rounded-lg'>
                    <h2 className='text-4xl font-semibold text-white'>Got a Idea? We've got the skills. Let's team up</h2>
                    <p className='mt-3 text-[#838894] mb-10'>
                      Tell us more about yourself and what you're got in mind.
                    </p>
                    <ContactUsForm/>
                </div>
            </div>

            {/* review slider */}
            <div className='my-24 mx-auto'>
                <h2 className='text-center text-4xl font-semibold text-richblack-5'>Reviews from other learners</h2>
                  <ReviewSlider/>
            </div>

        </div>

        {/* footer   */}
        <Footer/>
    </div>
  )
}

export default ContactUs