import { courseEndpoints } from '../Apis';
import apiConnector from '../apiConnector';
import {toast} from 'react-hot-toast';
const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    GET_ENROLLED_COURSES,
} = courseEndpoints



export const getUserEnrolledCourses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result;
    try {
        const res = await apiConnector('GET', GET_ENROLLED_COURSES,
            null,
            { Authorisation: `Bearer ${token}` }
        )
        if (!res) {
            throw new Error('Could not get user enrolled courses');
        }
        result = res?.data?.courses;
        console.log("USER ENROLLED COURSES API RESPONSE............", res);
        toast.success("User erolled course fetch successfull");
    } catch (error) {
        console.log("USER ENROLLED COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}
