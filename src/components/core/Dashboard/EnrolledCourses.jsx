import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../Services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourse, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEnrolledCoursesHandler = async () => {
    try {
      const response = await getUserEnrolledCourses(token);

      console.log("Enrolled Courses Response:", response);

      // ✅ YOUR API STRUCTURE
      const courses = response?.courses || [];
      const progressData = response?.courseProgress || [];

      const updatedCourses = courses.map((course) => {
        const progressObj = progressData.find(
          (p) =>
            p?.courseID?.toString() ===
            course?._id?.toString()
        );

        const completedVideos =
          progressObj?.completedVideos?.length || 0;

        // ✅ STRICT: using SubSections only (your API)
        const totalVideos =
          course?.courseContent?.reduce((acc, section) => {
            return acc + (section?.SubSections?.length || 0);
          }, 0) || 0;

        const progressPercentage =
          totalVideos === 0
            ? 0
            : Math.round(
              (completedVideos / totalVideos) * 100
            );

        return {
          ...course,
          progressPercentage,
          totalDuration: `${totalVideos} Lectures`,
        };
      });

      setEnrolledCourses(updatedCourses);
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getEnrolledCoursesHandler();
  }, [token]);

  return (
    <div className="w-11/12 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">
        Enrolled Courses
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : enrolledCourse.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not enrolled in any course yet
        </p>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-12 bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-300">
            <p className="col-span-6">Course</p>
            <p className="col-span-2 text-center">Duration</p>
            <p className="col-span-4 text-center">Progress</p>
          </div>

          {/* Rows */}
          {enrolledCourse.map((course) => {
            const progress = course.progressPercentage || 0;

            return (
              <div
                key={course._id}
                onClick={() => {
                  const Section =
                    course?.courseContent?.[0];

                  const SubSection =
                    Section?.SubSections?.[0];

                  // ✅ strict check (based on your API)
                  if (!Section || !SubSection) {
                    console.log("No video available");
                    return;
                  }

                  navigate(
                    `/view-course/${course._id}/Section/${Section._id}/SubSection/${SubSection._id}`
                  );
                }}
                className="grid grid-cols-12 items-center px-4 py-4 border-t hover:bg-gray-800 transition cursor-pointer"
              >
                {/* Course Info */}
                <div className="col-span-6 flex gap-4 items-center">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="w-28 h-16 rounded object-cover"
                  />

                  <div>
                    <p className="text-gray-300 font-medium">
                      {course.courseName}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-2 text-center text-sm text-gray-400">
                  {course.totalDuration}
                </div>

                {/* Progress */}
                <div className="col-span-4 px-4">
                  <p className="text-sm text-gray-400 mb-1">
                    {progress}% completed
                  </p>
                  <ProgressBar
                    completed={progress}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;