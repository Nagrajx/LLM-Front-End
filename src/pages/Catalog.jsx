import React, { useEffect } from "react";

import Footer from "../components/common/Footer"
import { apiConnector } from "../Services/apiConnector";
import { categories } from "../Services/api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CourseSilder from "../components/core/Catalog/CourseSilder";
import CourseCard from "../components/core/Catalog/CourseCard";
import NewCard from "../components/core/Catalog/NewCard";



const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogData, setCatalogData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [active, setActive] = useState(1)
    const [categoryId, setCategoryId] = useState("");

    //   fetch all categories and find the category id for the catalog name from url params


    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);

            const categoryId = res?.data?.allCategories?.find((cat) => cat.name.split(" ").join("-").toLowerCase() === catalogName.toLowerCase());
            setCategoryId(categoryId?._id);
        }
        getCategories();
    }, [catalogName])

    useEffect(() => {
        if (!categoryId) return;   // THIS MUST EXIST

        const getCategoryDetails = async () => {
            setLoading(true);

            try {
                const res = await apiConnector(
                    "POST",
                    categories.GET_CATEGORY_PAGE_DATA_API,
                    { categoryId }
                );

                setCatalogData(res?.data?.data);
            } catch (error) {
                console.log("Backend error:", error.response?.data);
            }

            setLoading(false);
        };

        getCategoryDetails();
    }, [categoryId]);


    return (
        <div >

            <div className="flex flex-col  bg-[#161D29] p-10" >
                <div className="flex flex-col gap-4 ml-25 text-white">
                    <p className="text-[#999DAA]">{`Home / Catalog / `}
                        <span className="text-yellow-500">{catalogData?.selectedCategory?.name}</span>
                    </p>
                    <p className="text-xl font-bold">{catalogData?.selectedCategory?.name}</p>
                    <p className="text-[#999DAA]">{catalogData?.selectedCategory?.description}</p>
                </div>

            </div>

            <div className="text-white relative w-11/12 max-w-[1260px] mx-auto flex flex-col gap-10">
                {/* Section 1 */}
                <div className=" mt-10 text-3xl font-extrabold">
                    Courses to get you started
                </div>
                <div >
                    <div className="flex gap-x-3 border-b border-richblack-[#2C333F]">
                        <p
                            className={`px-4 py-2 cursor-pointer ${active === 1 ? "border-b-yellow-500 border-b text-yellow-500" : "text-richblack-[#C5C7D4]"}`}
                            onClick={() => setActive(1)}>
                            Most Popular
                        </p>
                        <p
                            className={`px-4 py-2 cursor-pointer ${active === 2 ? "border-b-yellow-500 border-b text-yellow-500" : "text-richblack-[#C5C7D4]"}`}
                            onClick={() => setActive(2)}>
                            New
                        </p>
                    </div>

                    <div className="py-4 " >

                        {
                            <CourseSilder  courses={catalogData?.topSellingCourses} />
                        }
                    </div>
                </div>

                {/* Section 2 */}
                <div>
                    <div className="text-3xl p-2 mb-4 font-extrabold text-white">
                        Top Courses in {catalogData?.selectedCategory?.name}
                    </div>
                    <div>
                        <CourseSilder courses={catalogData?.topSellingCourses} />
                    </div>
                </div>

                {/* Section 3 */}
                <div className="mb-10"> 
                    <div className="text-3xl p-2 mb-10 font-extrabold text-white">Frequently Bought</div>
                    <div className="py-8">
                        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10">

                            {
                                catalogData?.topSellingCourses?.slice(0, 10)?.map((course, index) => (
                                    <CourseCard key={index} course={course} Height="h-[400px]" />
                                ))
                            }
                        </div>
                    </div>
                </div>



            </div>
            <Footer />
        </div>
    )
}

export default Catalog;