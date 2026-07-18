import React from "react";
import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { categories } from "../api";

const {
    GET_CATEGORY_PAGE_DATA_API
} = categories;

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("POST", GET_CATEGORY_PAGE_DATA_API, { categoryId: categoryId });

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to load data");
        }

        result = response?.data?.data;
        toast.success("Data loaded successfully");
    }
    catch (error) {
        toast.error(error.message || "Catalog page data Error");

    }
    finally {
        toast.dismiss(toastId);
    }
    return result;
}

export default PageAndComponentDetails;