import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../api";

const {
    GET_ALL_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSE_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    GET_ALL_RATING_REVIEW_API

} = courseEndpoints

export const getallcourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_COURSE_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch courses");
        }

        result = response.data;
    }
    catch (err) {
        console.log("GET ALL COURSE API FAILED", err);
        toast.error(err.message);
    }
    finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const getallcategories = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "GET",
            COURSE_CATEGORIES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch courses");
        }

        result = response.data.allCategories;
    }
    catch (err) {
        console.log("GET ALL COURSE API FAILED", err);
        toast.error(err.message);
    }
    finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const createcourse = async (token, data) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_COURSE_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Create Course Failed");
        }

        toast.success("COURSE CREATED SUCCESSFULLY");
        result = response?.data?.data

    }
    catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "Create Course API Failed";

        console.error("CREATE COURSE API ERROR:", err);
        toast.error(message);
    }
    finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            EDIT_COURSE_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "COULD NOT EDIT COURSE");
        }

        toast.success("   COURSE  EDITED SUCCESSFULLY");
        result = response?.data?.course;
    }
    catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "EDIT COURSE  API Failed";

        console.error("EDIT COURSE API ERROR:", err);
        toast.error(message);
    }
    finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const createSection = async (data, token) => {
    const toastId = toast.loading("Creating section...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_SECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not create section");
        }

        toast.success("Section created successfully");
        result = response.data.data; // updated course object

    } catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "Create section API failed";

        console.error("CREATE SECTION API ERROR:", err);
        toast.error(message);

    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const updateSection = async (data, token) => {

    const toastId = toast.loading("Loading...")
    let result = null

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "could not update section ")
        }

        toast.success("Section Update Successfully");
        result = response?.data?.course;
    }
    catch (err) {
        console.log("Update Section API Failed" || err.message);
        toast.error(err.message);
    }
    finally {
        toast.dismiss(toastId);
    }
    return result;

}

export const createSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_SUBSECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "COULD NOT CREATE SUB-SECTION");
        }

        toast.success("SUB-SECTION CREATED SUCCESSFULLY");
        result = response?.data?.data;
    }
    catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "CREATE SUB-SECTION API FALIEDD";

        console.error("CREATE  SUB - SECTION API ERROR:", err);
        toast.error(message);
    }
    finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const updateSubSection = async (data, token) => {

    const toastId = toast.loading("Loading...")
    let result = null

    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "could not update Subsection ")
        }

        toast.success("Sub-Section Update Successfully");
        result = response?.data?.data;
    }
    catch (err) {
        console.log("Update Sub-Section API Failed", err.message);
        toast.error(err.message);
    }
    finally {
        toast.dismiss(toastId);
    }
    return result;

}


export const deleteSection = async (data, token) => {
    let result;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_SECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not delete section");
        }

        toast.success("Section deleted successfully");
        result = response.data.data;
    } catch (error) {
        console.log("DELETE SECTION API ERROR", error);
        toast.error(error?.response?.data?.message || "Section could not be deleted");
    }

    toast.dismiss(toastId);
    return result;
};

export const deleteSubSection = async (data, token) => {
    const toastId = toast.loading("Deleting...");
    let result = null;

    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_SUBSECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "COULD NOT DELETE SUB-SECTION");
        }

        toast.success("SUB-SECTION DELETED SUCCESSFULLY");

        // ✅ must match backend key
        result = response?.data?.data; // updatedSection
    } catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "DELETE SUB-SECTION API FAILED";

        console.error("DELETE SUB-SECTION API ERROR:", err);
        toast.error(message);
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const getInstructorCourseDetails = async (token) => {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSE_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(
                response?.data?.message ||
                "Could not get instructor course details"
            );
        }

        result = response?.data?.instructorCourses || [];
    }
    catch (err) {
        console.error(
            "GET-INSTRUCTOR-COURSE DETAILS API FAILED:",
            err
        );

        toast.error(
            err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch instructor courses"
        );
    }
    finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error("Course could not be deleted");
        }

        toast.success("Course Deleted Successfully");
    }
    catch (error) {
        console.log("DELETE COURSE API ERROR,", error);
        console.log(error.message);
        toast.error("Course could not be deleted");
    }
    toast.dismiss(toastId);
}

export const getASingalCourseDetail = async (courseId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector(
            "GET",
            `${GET_FULL_COURSE_DETAILS_API}/${courseId}`,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not fetch course details");
        }

        // 🔥 Flatten here
        result = {
            ...response.data.data.courseDetails,
            completedVideos: response.data.data.completedVideos,
        };

    } catch (err) {
        console.log("GET-SINGLE-COURSE-API-FAILED", err.message);
        toast.error(err.message);
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};

export const ratingAndReview = async (data, token) => {
    const toastId = toast.loading("Submitting your review...");

    try {
        const response = await apiConnector(
            "POST",
            CREATE_RATING_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        // ==============================
        // Check API success
        // ==============================
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not create rating");
        }

        // ==============================
        // Success Toast
        // ==============================
        toast.success("Rated successfully ✅");

        // ==============================
        // Return full response data
        // ==============================
        return response.data;

    } catch (err) {
        console.error("RatingAndReview API Failed:", err);

        // ==============================
        // Better Error Handling
        // ==============================
        const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            "Rating failed";

        toast.error(errorMessage);

        return null; // 
    } finally {
        toast.dismiss(toastId);
    }
};


export const updateCourseProgress = async (data, token) => {
    const toastId = toast.loading("Updating course progress...");
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            LECTURE_COMPLETION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(
                response?.data?.message || "Could not update course progress"
            );
        }

        toast.success("Course progress updated successfully");

        // ✅ Return full response
        result = response?.data;

    } catch (err) {
        console.log("UPDATE COURSE PROGRESS API ERROR", err.message);
        toast.error(err.message || "Course progress could not be updated");
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};



export  const getRatingAndReview =async (token) =>{
    const  toastId = toast.loading("Fetching Data From The API");
    let result = []
    try{

        const response =  await apiConnector("GET" ,GET_ALL_RATING_REVIEW_API,null,{
            Authorization: `Bearer ${token}`,
        })

        if(!response?.data?.success){
            throw new Error(
                response.data.message || "Something Wrong on getRatingAndReview"
            )
        }

        result = response.data.data
       

    }catch(err){
        console.log("GetRatingAndReviewAPIFailed");
        toast.error(err.message);
    }
    finally{
        toast.dismiss(toastId);
    }
    return  result;
}