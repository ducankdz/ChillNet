import { Snackbar, Alert, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import HomeSection from '../home_section/HomeSection';
import RightSection from '../right_section/RightSection';
import { Route, Routes, useLocation } from 'react-router-dom';
import PostDetail from '../post_detail/PostDetail';
import Profile from '../profile/Profile';
import SearchSection from '../search_section/SearchSection';
import Bookmark from '../bookmark/Bookmark';
import Notifications from '../notifications/Notifications';
import Explore from '../explore/Explore';
import CheckIcon from '@mui/icons-material/Check';
import FollowPage from '../follow_page/FollowPage';
import { ToastContainer } from 'react-toastify';
import UpgradeSuccess from '../upgrade_success/UpgradeSuccess';

const HomePage = () => {
  return (
    <div>
      <Grid container className="justify-between px-5 lg:px-36">
        <Grid item xs={0} lg={2} className="hidden lg:block w-full relative border-r border-gray-100">
          <Navigation />
        </Grid>
        <Grid item xs={12} lg={7} className="hidden lg:block w-full relative">
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/home" element={<HomeSection />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/search" element={<SearchSection />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/follow/:userId" element={<FollowPage />} />
            <Route path='/upgrade/success' element={<UpgradeSuccess/>}></Route>
          </Routes>
        </Grid>
        <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
          <RightSection />
        </Grid>
      </Grid>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default HomePage;
