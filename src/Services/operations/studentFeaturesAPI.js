import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { setPaymentLoading } from "../../Redux/Slices/courseSlice"
import { resetCart } from "../../Redux/Slices/cartSlice";




const {
    COURSE_PAYMENT_API,
    VERIFY_PAYMENT_API,
    SEND_PAYMENT_SUCCESS_EMAIL
} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
    });
}




export async function buyCourse(token, courses, navigate, dispatch, user) {

    console.log(user);

    const toastId = toast.loading("Loading...");

    try {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Failed to load Razorpay SDK");
            return;
        }

        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        );

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const order = orderResponse.data.data;

        console.log("Order:", order);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: order.amount,
            currency: order.currency,
            order_id: order.orderId,

            name: "StudySphere",
            description: "Course Payment",

            prefill: {
                name: user.name,
                email: user.email,
            },

            handler: function (response) {

                sendPaymentSuccessEmail(response, order.amount, token);

                // Send complete data to backend verification
                const paymentData = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    courses: courses,
                    userId: user._id
                };

                console.log("Payment Data:", paymentData);

                verifyPayment(
                    paymentData,
                    token,
                    navigate,
                    dispatch
                );
            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment Failed");
            console.log(response.error);
        });

    } catch (error) {

        console.log("Backend Error:", error.response?.data);
        toast.error(error.response?.data?.message || "Payment failed");

    } finally {

        toast.dismiss(toastId);

    }
}


async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL, { orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, amount }, {
            Authorization: `Bearer ${token}`,
        });
    } catch (error) {
        console.error("Failed to send payment success email:", error);
    }
}


// verify payment signature and capture payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try {
        const verifyResponse = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        if (!verifyResponse.data.success) {
            throw new Error(verifyResponse.data.message);
        }

        toast.success("Payment verified successfully you are added to the course. Redirecting to your courses...");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        toast.error("Payment verification failed. Please contact support if your payment was successful.");
        console.error("Payment verification error:", error);
    }
    finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
}
