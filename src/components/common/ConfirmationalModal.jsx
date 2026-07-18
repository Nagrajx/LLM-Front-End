import React from 'react'
import ActionBtn from './ActionBtn'

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center
           bg-white/30 backdrop-blur-sm overflow-auto"
        >

            <div className='w-11/12 max-w-[350px] rounded-lg border border-#6E727F] bg-[#161D29] p-6'>

                <h2 className='text-2xl font-semibold text-[#F1F2FF]'>{modalData.text1}</h2>

                <p className='mt-3 leading-6 text-[#999DAA]'>{modalData.text2}</p>

                <div className='flex mt-6 items-center gap-x-2'>

                    <ActionBtn
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />

                    <button className='cursor-pointer bg-[#999DAA] py-[8px] px-[20px] rounded-md font-semiboldon text-[]'
                        onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>

                </div>
            </div>
        </div>

    )
}

export default ConfirmationModal