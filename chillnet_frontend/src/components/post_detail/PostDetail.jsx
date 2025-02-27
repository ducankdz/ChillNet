import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import PostCard from '../home_section/PostCard';
import { Avatar, Box, Button, Divider, Modal, Tooltip } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { useFormik } from 'formik';
import avatar from "../../assets/avatar.jpg"
import ImageIcon from '@mui/icons-material/Image';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useDispatch, useSelector } from 'react-redux';
import { commentPost, findPostById } from '../../redux/post/Action';
import { uploadToCloudinary } from '../../utils/UploadToCloudinary';
import { getUser } from '../../redux/user/Action';


const PostDetail = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { post, user } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        dispatch(findPostById(postId));
        dispatch(getUser(jwt));
    }, [postId, post.like, post.share, post.post])

    const handleBack = () => {
        navigate(-1);
    }
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const handleSubmit = (values, actions) => {
        console.log("data", values);
        dispatch(commentPost(values));
        actions.resetForm();
        setSelectedFiles([]);
    }
    const formik = useFormik({
        initialValues: {
            content: "",
            media: [],
            postId: postId
        },
        onSubmit: handleSubmit
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
        <div className='px-16'>
            <div className='border-l border-r border-gray-100'>
                <div className='bg-white/80 backdrop-blur-md sticky top-0 z-10 '>
                    <section className={`px-4 py-4 border-b border-gray-100`}>
                        <div className='flex items-center space-x-4'>
                            <KeyboardBackspaceIcon
                                onClick={handleBack}
                                className="cursor-pointer text-gray-700 hover:text-black transition duration-300"
                                sx={{ fontSize: "24px" }}
                            />
                            <h1 className='text-xl font-bold flex-1 text-center'>Post</h1>

                        </div>
                    </section>
                </div>
                <section>
                    {
                        post.post && <PostCard item={post.post} />
                    }
                    <Divider />
                </section>
                <section className={'py-5 px-5'}>
                    <div className='flex space-x-5'>
                        <Avatar
                            alt="Username"
                            src={user?.reqUser?.image}
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
                                        placeholder='Post your comment'

                                        className={`border-none outline-none text-xl bg-transparent w-full  px-4 rounded-md`}
                                        {...formik.getFieldProps("content")}
                                    />
                                    {formik.errors.content && formik.touched.content && (
                                        <span className='text-red-500 px-4'>{formik.errors.content}</span>
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
                                            <input type="file" name="imageFile" className='hidden' multiple
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
                                            disabled={!formik.values.content && !formik.values.image}
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
                <Divider />
                <section>
                    {
                        post.post?.comments.map((item) => <PostCard item={item} key={item} />)
                    }
                </section>
            </div>

        </div>
    )
}

export default PostDetail