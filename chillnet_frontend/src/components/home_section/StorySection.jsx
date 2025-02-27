import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import StoryModal from './StoryModal';
import ChooseStory from './ChooseStory';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedUserStories, viewStory } from '../../redux/story/Action';

const StorySection = () => {
  const dispatch = useDispatch();
  const { user, story } = useSelector((store) => store);
  const [openStoryModal, setOpenStoryModal] = useState(false);
  const [storyItemId, setStoryItemId] = useState(null);
  const [openChooseStory, setOpenChooseStory] = useState(false);

  const handleOpenStoryModal = () => setOpenStoryModal(true);
  const handleCloseStoryModal = () => {
    setOpenStoryModal(false);
    setStoryItemId(null); // Reset selected story
  };
  const handleOpenChooseStory = () => setOpenChooseStory(true);
  const handleCloseChooseStory = () => setOpenChooseStory(false);

  const handleClickStory = (item) => {
    setStoryItemId(item.id);
    handleOpenStoryModal();
  };

  useEffect(() => {
    dispatch(getFollowedUserStories());
  }, [dispatch, user?.reqUser?.id]); // Re-fetch if user changes

  return (
    <div className="relative">
      <Swiper modules={[Navigation]} slidesPerView={10}>
        {/* User’s Avatar for creating a story */}
        <SwiperSlide>
          <div className="relative flex flex-col items-center cursor-pointer">
            <div onClick={handleOpenChooseStory} className="relative cursor-pointer">
              <Avatar
                src={user?.reqUser?.image}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  boxSizing: 'border-box',
                }}
              />
              <AddCircleIcon
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: -5,
                  color: '#0095f6',
                  fontSize: 24,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        </SwiperSlide>

        {/* List of stories */}
        {!story?.stories ? (
          <SwiperSlide>Loading stories...</SwiperSlide>
        ) : (
          story.stories.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleClickStory(item)}
                className="relative flex items-center justify-center cursor-pointer"
              >
                <Avatar
                  src={item?.user?.image}
                  sx={{
                    width: 60,
                    height: 60,
                    border: !item?.watched ? '3px solid #0095f6' : '3px solid #919397',
                    transition: 'all 0.3s ease',
                    borderRadius: '50%',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <StoryModal id={storyItemId} open={openStoryModal} handleClose={handleCloseStoryModal} />
      <ChooseStory open={openChooseStory} handleClose={handleCloseChooseStory} />
    </div>
  );
};

export default StorySection;