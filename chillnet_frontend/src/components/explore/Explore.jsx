import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Divider } from '@mui/material';
import avatar from "../../assets/avatar.jpg"
import verrifiedIcon from "../../assets/verified.png"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostCard from '../home_section/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowingUserPosts, getTrendingPosts } from '../../redux/post/Action';

const Explore = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('1');
    const {post} = useSelector(store=>store);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        if (jwt) {
            dispatch(getFollowingUserPosts());
            dispatch(getTrendingPosts());
        }
    }, [jwt, post.posts.length, post.like, post.post, post.share]);
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
                            <h1 className='text-xl font-bold flex-1 text-center'>Explore</h1>
                        </div>
                    </section>
                </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList variant='fullWidth'
                                textColor="secondary"
                                indicatorColor="secondary"
                                onChange={handleChange}
                                aria-label="lab API tabs example">
                                <Tab label={
                                    <span className='font-semibold'>Trending</span>
                                } value="1" />
                                <Tab label={
                                    <span className='font-semibold'>Following</span>
                                } value="2" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ padding: 0 }} value="1">
                            {
                                post.trendingPosts?.map((item) => <PostCard item={item} key={item} />)
                            }
                        </TabPanel>
                        <TabPanel sx={{ padding: 0 }} value="2">
                            {
                                post.followingPosts?.map((item) => <PostCard item={item} key={item} />)
                            }
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Explore