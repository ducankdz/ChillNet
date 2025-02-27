import api from "../../config/api"
import { toast } from "react-toastify";

export const createPayment = (planType) => async (dispatch) => {
    try {
        const { data } = await api.post(`/api/payment/${planType}`);
        if (data.paymentLinkUrl) {
            console.log("payment url", data.paymentLinkUrl);
            window.location.href = data.paymentLinkUrl; // Redirect tới PayPal
        }
    } catch (error) {
        toast.error(error?.response?.data);
        dispatch({
            type: "PAYMENT_FAILURE",
            payload: error?.response?.data,
        });
    }
};

export const executePayment = (paymentId, payerId, planType) => async (dispatch) => {
    try {
        const { data } = await api.get(
            `/api/payment/success?paymentId=${paymentId}&PayerID=${payerId}&planType=${planType}`
        );
        dispatch({
            type: "PAYMENT_SUCCESS",
            payload: data,
        });
        dispatch(upgradeToPremium(planType));
        toast.success("Payment completed successfully!");
        // Xóa query parameters khỏi URL
        window.history.replaceState({}, document.title, "/home");
    } catch (error) {
        toast.error(error?.response?.data || "Payment verification failed.");
        dispatch({
            type: "PAYMENT_FAILURE",
            payload: error?.response?.data,
        });
    }
};