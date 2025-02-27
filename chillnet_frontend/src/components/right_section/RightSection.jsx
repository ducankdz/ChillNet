import { Alert, Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import avatar from "../../assets/avatar.jpg"
import verrifiedIcon from "../../assets/verified.png"
import { useNavigate } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check';
import SubscribeModal from './SubscribeModal'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, suggestUser } from '../../redux/user/Action'

const RightSection = () => {
  const navigate = useNavigate();
  const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);
  const handleOpenSubscribeModal = () => setOpenSubscribeModal(true);
  const handleCloseSubscribeModal = () => setOpenSubscribeModal(false);
  const [followedUsers, setFollowedUsers] = useState({});
  const { user } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      dispatch(suggestUser());
    }
  }, [jwt])
  const handleFollowUser = (userId) => {
    dispatch(followUser(userId));
    setFollowedUsers(prev => ({ ...prev, [userId]: true }));
  }
  return (
    <div className='py-1.5 sticky top-0 h-screen overflow-y-auto scrollbar-hide'>
      {/* Premium Section */}
      <div className='px-3.5 py-3.5 sticky top-0 rounded-2xl pt-3 mt-3 border border-gray-100'>
        <h2 className='text-[20px] font-bold'>Subcribe to Premium</h2>
        <p className='py-2 mb-2 text-[16px] leading-5'>
          Subscribe to unlock new features and if eligible,
          receive a share of ads revenue.
        </p>
        <Button
          onClick={handleOpenSubscribeModal}
          variant='contained'
          sx={{
            bgcolor: '#1d9bf0',
            borderRadius: '9999px',
            textTransform: 'none',
            padding: '6px 16px',
            fontWeight: 'bold',
            fontSize: '15px',
            backgroundImage: "linear-gradient(to right, blue, purple)",
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
            },
          }}>
          Subscribe
        </Button>
      </div>
      {/* People you may know Section */}
      <div className='rounded-2xl mt-4 border border-gray-100'>
        <h2 className='text-[20px] font-bold px-4 pt-3 pb-1'>People you may know?</h2>
        {user.suggestUsers?.map((item, index) => (
          <div
            key={index}
            className='px-4 py-3 transition-colors flex items-center justify-between'
          >
            <div className='flex items-center'>
              <Avatar
                onClick={() => navigate(`/profile/${item?.id}`)}
                className='cursor-pointer'
                alt="Username"
                src={item?.image}
                sx={{
                  width: 40,
                  height: 40
                }}
              />
              <div className='ml-3'>
                <div className='flex items-center'>
                  <p onClick={() => navigate(`/profile/${item?.id}`)}
                    className='cursor-pointer font-bold text-[15px] hover:underline'>{item?.username}</p>
                  {item?.verified && (
                    <img
                      className='ml-0.5 w-[17px] h-[17px]'
                      src={verrifiedIcon}
                      alt=""
                    />
                  )}
                </div>
                <p className='text-[13px] text-gray-500'>Suggested for you</p>
              </div>
            </div>
            <Button
              onClick={() => handleFollowUser(item?.id)}
              disabled={followedUsers[item?.id]}
              variant="ghost"
              sx={{
                borderRadius: "20px",
                paddingX: "20px",
                color: "blue",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: "bold",
                transition: "0.3s", // Hiệu ứng mượt mà khi hover
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 255, 0.1)", // Màu nền khi hover
                  color: "darkblue" // Đổi màu chữ khi hover
                }
              }}
            >
              {followedUsers[item.id] ? "Followed" : "Follow"}
            </Button>
          </div>
        ))}
        <div className='px-4 py-3 text-[15px] text-[blue] hover:bg-gray-100 cursor-pointer transition-colors rounded-b-2xl'>
          
        </div>
      </div>

      {/* Footer Section */}
      <div className='px-4 py-3 text-[13px] text-gray-500'>
        <div className='flex flex-wrap gap-1'>
          <span className='hover:underline cursor-pointer'>Terms of Service</span>
          <span>·</span>
          <span className='hover:underline cursor-pointer'>Privacy Policy</span>
          <span>·</span>
          <span className='hover:underline cursor-pointer'>Cookie Policy</span>
          <span>·</span>
          <span className='hover:underline cursor-pointer'>Accessibility</span>
          <span>·</span>
          <span className='hover:underline cursor-pointer'>Ads info</span>
          <span>·</span>
          <span className='hover:underline cursor-pointer'>More</span>
        </div>
        <div className='mt-1'>© 2025 ChillNet Corp.</div>
      </div>
      {/* <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Shared post successfully
      </Alert> */}
      <SubscribeModal open={openSubscribeModal} handleClose={handleCloseSubscribeModal} />
    </div>
  )
}

export default RightSection