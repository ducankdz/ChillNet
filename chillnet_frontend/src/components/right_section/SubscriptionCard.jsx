import { Button } from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
import { createPayment } from "../../redux/payment/Action";

const SubscriptionCard = ({ data }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            await dispatch(createPayment(data.planType));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col justify-between relative bg-gradient-to-br h-[530px] from-[#141E30] to-[#243B55]
         text-white rounded-2xl shadow-lg p-8 space-y-6 w-[40%] text-center border
          border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Hiệu ứng Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#9333ea] opacity-20 blur-3xl"></div>

            {/* Tiêu đề */}
            <h1 className="text-4xl font-extrabold">{data.planName}</h1>
            <p className="text-lg">
                <span className="text-4xl font-bold text-white">${data.price}/</span>
                <span className="text-gray-300">{data.planType}</span>
            </p>

            {/* Danh sách tính năng */}
            <div className="space-y-3 text-left">
                {data.features.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-lg">
                        <CheckCircleIcon className="text-white" />
                        <p>{item}</p>
                    </div>
                ))}
            </div>

            {/* Nút nâng cấp */}

            <Button
                onClick={handleUpgrade}
                variant="contained"
                disabled={loading || data.buttonName === "Current"}
                sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    padding: "12px 24px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    backgroundImage: "linear-gradient(to right, #FF512F, #DD2476)",
                    boxShadow: "0 4px 15px rgba(255, 81, 47, 0.4)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        backgroundImage: "linear-gradient(to right, #DD2476, #FF512F)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 20px rgba(255, 81, 47, 0.6)",
                    },
                    "&:disabled": {
                        bgcolor: "#333333", // Màu cho khi nút bị disable
                        opacity: 0.5,
                        color: "#ffffff"
                    }
                }}
            >
                {loading ? "Processing..." : data.buttonName}
            </Button>
        </div>

    );
};

export default SubscriptionCard;
