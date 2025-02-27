export const uploadToCloudinary = async (file) => {
    if (!file) {
        console.log("Error from upload function: file is undefined or null");
        return null;
    }

    try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "chillnet");
        data.append("cloud_name", "dmgmnyu6k");

        // Xác định loại tài nguyên (image hoặc video)
        const resourceType = file.type.startsWith("video") ? "video" : "image";

        const res = await fetch(`https://api.cloudinary.com/v1_1/dmgmnyu6k/${resourceType}/upload`, {
            method: "POST",
            body: data,
        });

        const fileData = await res.json();

        if (!res.ok || !fileData.secure_url) {
            throw new Error(fileData.error?.message || "Upload failed");
        }

        return fileData.secure_url.toString();
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return null; // Trả về null để tránh crash ứng dụng
    }
};
