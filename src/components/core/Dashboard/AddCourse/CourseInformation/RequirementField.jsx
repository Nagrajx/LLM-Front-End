import React, { useState } from "react";
import { useEffect } from "react";
import { set } from "react-hook-form";

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([])


    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        }, [])
    })


    useEffect(()=>{
              setValue(name,requirementList);
    },[requirementList])

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1)
        setRequirementList(updatedRequirementList)
    }


    return (
        <div >
            <label htmlFor={name} className="block mb-3 font-semibold" >{label}<sup className="text-red-500">*</sup></label>
            <div >
                <input type="text"
                    id={name}
                    value={requirement}
                    placeholder={`Enter ${label}`}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full p-2 rounded-md bg-[#2C333F] border-b border-white "
                />
                <button
                    type="button"
                    onClick={() => handleAddRequirement()}
                    className="font-semibold text-yellow-500 pt-2"
                >
                    Add
                </button>
            </div>
            {
                requirementList.length > 0 && (
                    <ul className="space-y-2">
                        {
                            requirementList.map((requirement, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between text-[#F1F2FF]"
                                >
                                    <span>{requirement}</span>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRequirement(index)}
                                        className="text-sm text-gray-400 hover:text-red-400 transition"
                                    >
                                        CLEAR
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )

            }

            {errors[name] && (
                <span className="text-red-500 text-sm">
                    {label} is Required
                </span>
            )}

        </div>
    )
}

export default RequirementField;