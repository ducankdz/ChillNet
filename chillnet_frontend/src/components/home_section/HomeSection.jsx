import React, { useEffect, useState } from 'react'
import StorySection from './StorySection'
import avatar from "../../assets/avatar.jpg"
import { Avatar, Box, Button, Modal, Tooltip } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import EmojiPicker from 'emoji-picker-react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PostCard from './PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getAllPosts } from '../../redux/post/Action'
import { getUser, upgradeToPremium } from '../../redux/user/Action';
import { uploadToCloudinary } from '../../utils/UploadToCloudinary'
import { executePayment } from '../../redux/payment/Action'

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Text is required")
})

const HomeSection = () => {
    const dispatch = useDispatch();
    const { post, user } = useSelector(store => store);
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");
    const planType = params.get("planType");
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
            dispatch(getAllPosts());
        }
    }, [jwt, post.posts.length, post.like, post.post, post.share]);

    useEffect(() => {
        if (paymentId && payerId && planType) {
            dispatch(upgradeToPremium(planType));
        }
    }, [paymentId, payerId, planType, dispatch]);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const handleSubmit = (values, actions) => {
        console.log("data", values);
        dispatch(createPost(values));
        actions.resetForm();
        setSelectedFiles([]);
    }
    const formik = useFormik({
        initialValues: {
            content: "",
            media: []
        },
        onSubmit: handleSubmit,
        validationSchema
    })
    const handleEmojiClick = (emojiObject) => {
        formik.setFieldValue("content", formik.values.content + emojiObject.emoji);
    }
    const handleSelectFile = async (event) => {
        const files = Array.from(event.target.files); // Lấy danh sách file
        if (files.length === 0) return;
        try {
            // Upload từng file lên Cloudinary
            const uploadedFiles = await Promise.all(
                files.map(async (file) => {
                    return await uploadToCloudinary(file); // Trả về URL trực tiếp
                })
            );
            // Cập nhật vào formik (giữ lại các file cũ + file mới)
            formik.setFieldValue("media", [...(formik.values.media || []), ...uploadedFiles]);
            // Cập nhật state để hiển thị ảnh/video đã upload
            setSelectedFiles(prev => [...prev, ...uploadedFiles]);
        } catch (error) {
            console.error("Lỗi upload file:", error);
        }
    };


    return (
        <div className='space-y-5 px-16 '>
            <div className='sticky top-0 bg-white/80 backdrop-blur-md z-10 border-l border-r border-gray-100'>
                <section className='px-5 py-5 border-b border-gray-100'>
                    <StorySection />
                </section>
                <section className={'py-5 px-5 border-b border-gray-100'}>
                    <div className='flex space-x-5'>
                        <Avatar
                            alt="Username"
                            src={user.reqUser?.image}
                            sx={{
                                width: 40,
                                height: 40
                            }}

                        />
                        <div className='w-full'>
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        name='content'
                                        placeholder='What are you thinking?'
                                        className={`border-none outline-none text-xl bg-transparent w-full rounded-md`}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.content && formik.touched.content && (
                                        <span className='text-red-500'>{formik.errors.content}</span>
                                    )}
                                </div>
                                <div className='py-3 grid grid-cols-2 gap-3'>
                                    {selectedFiles.map((file, index) => {
                                        const isVideo = file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".avi");

                                        return (
                                            <div key={index} className="relative">
                                                {isVideo ? (
                                                    <video controls className="w-full h-auto rounded-md">
                                                        <source src={file} type="video/mp4" />
                                                        Trình duyệt của bạn không hỗ trợ video.
                                                    </video>
                                                ) : (
                                                    <img src={file} alt={`Upload ${index}`} className="w-full h-auto rounded-md" />
                                                )}
                                            </div>
                                        );
                                    })}

                                </div>


                                <div className='flex justify-between items-center mt-5'>
                                    <div className='flex space-x-5 items-center'>
                                        <label className='flex items-center space-x-2 rounded-full hover:bg-[#1d9bf0]/10 p-2 cursor-pointer transition-all'>
                                            <ImageIcon className='text-[#536471]' />
                                            <input type="file" name="media" className='hidden' multiple
                                                onChange={handleSelectFile} />
                                        </label>
                                        <div
                                            className='rounded-full hover:bg-[#1d9bf0]/10 p-2 cursor-pointer transition-all'
                                            onClick={() => setOpenEmojiPicker(true)}
                                        >
                                            <TagFacesIcon className='text-[#536471]' />
                                        </div>

                                    </div>
                                    <div>
                                        <Button
                                            sx={{
                                                width: "100%",
                                                borderRadius: "20px",
                                                paddingY: "8px",
                                                paddingX: "30px",
                                                backgroundImage: "linear-gradient(to right, blue, purple)", // Gradient xanh dương và tím
                                                color: "#ffffff",
                                                textTransform: "none",
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                opacity: 0.7,
                                                "&:hover": {
                                                    opacity: 1// Giữ gradient khi hover
                                                },
                                                "&:disabled": {
                                                    bgcolor: "#333333", // Màu cho khi nút bị disable
                                                    opacity: 0.5,
                                                    color: "#ffffff"
                                                }
                                            }}
                                            disabled={!formik.values.content && !formik.values.media.length}
                                            type='submit'
                                        >
                                            Post
                                        </Button>

                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
                <Modal
                    open={openEmojiPicker}
                    onClose={() => setOpenEmojiPicker(false)}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: '10px'
                    }}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </Box>
                </Modal>
                {/* Divider
            <div className='h-2 bg-gray-50 border-t border-b border-gray-100'></div> */}

                <section>
                    {
                        post.posts?.map((item) => <PostCard item={item} key={item.id} />)
                    }
                </section>
            </div>
        </div>
    )
}

export default HomeSection