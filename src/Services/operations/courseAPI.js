import { toast } from "react-hot-toast";
import { categories } from "../api";
import { apiConnector } from "../apiConnector";

const {
    CATEGORIES_API
} = categories


export async function getallcategories() {
    const toastId = toast.loading("Fetching categories...");
    let result = [];

    try {
        const response = await apiConnector("GET", CATEGORIES_API);

        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to fetch categories");
        }
        result = response.data.allCategories;
    } catch (err) {
        console.log(err.message || "Get Categories API Failed");
        toast.error(err.message || "Something went wrong");
    } finally {
        toast.dismiss(toastId);
    }

    return result;
}
