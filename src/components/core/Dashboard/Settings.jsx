import React from "react";
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";
import UpdateProfileDetails from "./UpdateProfileDetails";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";


const Settings = () => {

    return (
        <div>
            <h1 className="text-4xl font-semibold italic ">Edit Profile</h1>
            
            {/* upload image */}
            
             <UploadImage />
             
             {/* {Update Profile Detials } */}
             <UpdateProfileDetails />

             {/* Update Password */}
             <UpdatePassword />
            
            {/* Delete Account */}
            <DeleteAccount />
    
        </div>
    )
}

export default Settings;