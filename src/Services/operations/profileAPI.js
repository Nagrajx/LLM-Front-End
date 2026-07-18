import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
import { resetCart } from "../../Redux/Slices/cartSlice";
import toast from "react-hot-toast";
import { setUser } from "../../Redux/Slices/profileSlice";
import { logOut } from "./authAPI";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    UPLOAD_PROFILE_PICTURE_API,
    UPDATE_ADDITIONAL_DETAILS_API,
    DELETE_ACCOUNT_API,
    GET_INSTRUCTOR_DETAILS_API
} = profileEndpoints

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("API RESPONSE:", response);

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch courses");
        }

        result = response?.data?.data


    } catch (error) {
        console.error("API ERROR:", error);

        // 🔥 Important: show real backend error if exists
        const message =
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong";

        toast.error(message);
    }

    toast.dismiss(toastId);
    return result;
}


export const updateDisplayPicture = async (token, formData, dispatch) => {
    const toastId = toast.loading("loading...");

    try {
        const response = await apiConnector(
            "POST",
            UPLOAD_PROFILE_PICTURE_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );


        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        const updatedUser = response.data.updatedUser;

        //  Update Redux state
        dispatch(setUser(updatedUser));

        //  Save updated user in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Profile Image Updated");
    }
    catch (error) {
        console.log("UPDATE PROFILE PICTURE API ERROR : ", error);
        toast.error(error.message || "Failed to update profile picture");
    }

    toast.dismiss(toastId);
};


export const updateAdditionalDetails = async (token, formData, dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_ADDITIONAL_DETAILS_API,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        const updatedUser = response.data.updatedUser;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(setUser(updatedUser));
        toast.success("Profile Details Updated Successfully");
    } catch (err) {
        console.log(err.message || "Update Profile API Failed");
        toast.error(err.message);
    }
    toast.dismiss(toastId);
};

export const deleteAccount = async (token, navigate, dispatch) => {
    const toastId = toast.loading("Deleting account...");
    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_ACCOUNT_API,
            null, // DELETE has no body
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        dispatch(logOut(navigate));
        dispatch(resetCart());

        toast.success("Account deleted successfully");

    } catch (error) {
        console.log("Delete Account API Failed:", error);
        toast.error("Failed to delete account");
    }
    toast.dismiss(toastId);
};

