import React, { useEffect } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import PostCard from '../home_section/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSavedPosts } from '../../redux/post/Action';

const Bookmark = () => {
    const {post, user} = useSelector(store=>store);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserSavedPosts(user?.reqUser?.id));
    },[post.post])
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <div className='px-20'>
            <div className='border-l border-r border-gray-100'>
                {/* Header */}
                <div className='bg-white/80 backdrop-blur-md sticky top-0 z-10'>
                    <section className='px-4 py-4 border-b border-gray-100'>
                        <div className='flex items-center space-x-4'>
                            <KeyboardBackspaceIcon
                                onClick={handleBack}
                                className="cursor-pointer text-gray-700 hover:text-black transition duration-300"
                                sx={{ fontSize: "24px" }}
                            />
                            <h1 className='text-xl font-bold flex-1 text-center'>Bookmark</h1>
                        </div>
                    </section>
                </div>
                {
                    post.savedPosts?.map((item)=><PostCard item={item} key={item}/>)
                }
            </div>
        </div>
    )
}

export default Bookmark