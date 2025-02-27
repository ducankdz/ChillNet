import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SubscriptionCard from "./SubscriptionCard";
import { useSelector } from "react-redux";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1300,
    bgcolor: "rgba(20, 30, 48, 0.95)",
    border: "none",
    outline: "none",
    boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.3)",
    borderRadius: 4,
    maxHeight: "90vh", // Giới hạn chiều cao
    overflowY: "auto", // Cho phép cuộn nếu nội dung quá dài
    scrollbarWidth: "none", // Ẩn scrollbar trên Firefox
    msOverflowStyle: "none", // Ẩn scrollbar trên IE/Edge
};

const monthPlan = [
    "Access to premium content",
    "Ad-free experience",
    "Schedule up to 10 posts per month",
    "Basic analytics (likes, shares, comments)",
    "Priority customer support",
    "Custom profile themes",
    "Verified badge for enhanced credibility",
];

const annualPlan = [
    "All benefits of the Monthly Plan",
    "Discounted price compared to monthly subscription",
    "Unlimited post scheduling",
    "Advanced analytics (engagement trends, audience insights)",
    "Exclusive access to premium social media tools",
    "Early access to new features",
];

export default function SubscribeModal({ open, handleClose }) {
    const { user } = useSelector(store => store);
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
            <Box sx={{ ...style }}>
                {/* Header giữ nguyên */}
                <div className='bg-white/80 backdrop-blur-md sticky top-0 z-10'>
                    <section className={`px-4 py-4 border-b border-gray-100`}>
                        <div className='flex items-center space-x-4'>
                            <h1 className='text-xl font-bold flex-1 text-center'>Subscribe to Premium</h1>
                            <IconButton
                                onClick={handleClose}
                                className="hover:bg-gray-200 rounded-full"
                                size="small"
                            >
                                <CloseIcon className="text-[#536471]" />
                            </IconButton>
                        </div>
                    </section>
                </div>

                {/* Nội dung */}
                <div className="text-center py-6">
                    <h1 className="py-3 text-5xl font-extrabold text-white bg-clip-text">
                        Pricing
                    </h1>
                    <p className="py-3 text-lg text-gray-300">Choose the plan that works for you!</p>
                </div>

                {/* Cards */}
                <div className="pt-5 pb-10 flex flex-col lg:flex-row justify-center items-center gap-12">
                    <SubscriptionCard
                        data={{
                            planName: "Monthly Plan",
                            features: monthPlan,
                            planType: "Monthly",
                            price: 20,
                            buttonName: user.reqUser?.verification?.planType == "Monthly" ? "Current" : "Get Started"
                        }}
                    />
                    <SubscriptionCard
                        data={{
                            planName: "Annual Plan",
                            features: annualPlan,
                            planType: "Annually",
                            price: 400,
                            buttonName: user.reqUser?.verification?.planType == "Annually" ? "Current" : "Get Started"
                        }}
                    />
                </div>
            </Box>
        </Modal>
    );
}
