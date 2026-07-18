const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const categories = {
    CATEGORIES_API: BASE_URL + "/course/getallcategories",
    GET_CATEGORY_PAGE_DATA_API: BASE_URL + "/course/categorypagedetails"
};

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payments/capturePayment",
    VERIFY_PAYMENT_API: BASE_URL + "/payments/verifysignature",
    SEND_PAYMENT_SUCCESS_EMAIL: BASE_URL + "/payments/sendPaymentSuccessEmail"
}

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetpasswordtoken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetpassword",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword"
};


//   PROFILE ENDPOINTS

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getprofiledetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    UPLOAD_PROFILE_PICTURE_API: BASE_URL + "/profile/updateProfileImage",
    UPDATE_ADDITIONAL_DETAILS_API: BASE_URL + "/profile/updateprofile",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteaccount",
 

}

// COURSE ENDPOINTS

export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getallcourses",
    COURSE_CATEGORIES_API: BASE_URL + "/course/getallcategories",
    CREATE_COURSE_API: BASE_URL + "/course/create-course",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_SECTION_API: BASE_URL + "/course/createsection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createsubsection",
    UPDATE_SECTION_API: BASE_URL + "/course/updatesection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updatesubsection",
    DELETE_SECTION_API: BASE_URL + "/course/deletesection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    GET_ALL_INSTRUCTOR_COURSE_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_API:BASE_URL + "/course/getCourseDetails",
    CREATE_RATING_API: BASE_URL + "/course/createrating",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    GET_ALL_RATING_REVIEW_API:BASE_URL + "/course/getallrating"

}