import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchMyCourses } from '../../../services/operations/courseDetailsApi';
import IconButton from "../../common/IconButton";
import CoursesTable from "./InstructorCourses/CourseTable";

export default function MyCourses() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchMyCourses(token);
            if (result) {
                setCourses(result)
            }
        }
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
                <IconButton
                    text="Add Course"
                    icon={<VscAdd />}
                    btnHander={() => navigate("/dashboard/add-course")}
                />
            </div>
            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
        </div>
    )
}
