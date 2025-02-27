import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Divider } from '@mui/material';
import verrifiedIcon from "../../assets/verified.png"
import avatar from "../../assets/avatar.jpg"
import CircleIcon from '@mui/icons-material/Circle';

const MessageListSection = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  const handleSearchChange = (e) => {
    setKeyword(e.target.value)
  }
  return (
    <div className='py-3 px-5 sticky top-0 h-screen over-flow-y-auto scrollbar-hide'>
      <div className='sticky top-[79px] z-10 bg-white pb-3 flex items-center gap-3'>
        <div className='relative flex-1'>
          <div className='absolute left-3 h-full flex items-center'>
            <SearchIcon className='text-gray-500' sx={{ fontSize: 20 }} />
          </div>
          <input
            onChange={handleSearchChange}
            placeholder='Search'
            type="text"
            className='w-full bg-gray-100 rounded-full py-3 pl-11 pr-5 text-[16px] outline-none focus:bg-white focus:ring-1 focus:ring-primary-blue border border-transparent focus:border-primary-blue'
          />
        </div>
      </div>
      <div className='top-[20px] sticky rounded-2xl border border-gray-100'>
        <h2 className='text-[16px] font-bold px-4 pt-3 pb-1'>Recent messages</h2>
        {keyword ? [1, 1, 1, 1].map((index) => (
          <div
            key={index}
            className='hover:bg-gray-100 cursor-pointer border-b border-gray-100 px-4 py-4 transition-colors flex items-center justify-between'
          >
            <div className='flex items-center'>
              <Avatar
                onClick={() => navigate(`/profile/${1}`)}
                className='cursor-pointer'
                alt="Username"
                src={avatar}
                sx={{
                  width: 40,
                  height: 40
                }}
              />
              <div className='ml-3'>
                <div className='flex items-center'>
                  <p className='font-semibold text-[15px]'>chilllover</p>

                </div>
                {/* <p className='text-[13px] text-gray-500'>Trần Đức Anh</p> */}
                <p className='text-gray-500 text-sm'>You: Hi · 2m</p>
              </div>

            </div>
            {
              true && <CircleIcon sx={{
                fontSize: '15px',
                color: '#6bb0ff'
              }} />
            }
          </div>

        )) :
          [1, 1, 1, 1, 1, 1].map((index) => (
            <div
              key={index}
              className='hover:bg-gray-100 cursor-pointer border-b border-gray-100 px-4 py-4 transition-colors flex items-center justify-between'
            >
              <div className='flex items-center'>
                <Avatar
                  onClick={() => navigate(`/profile/${1}`)}
                  className='cursor-pointer'
                  alt="Username"
                  src={avatar}
                  sx={{
                    width: 40,
                    height: 40
                  }}
                />
                <div className='ml-3'>
                  <div className='flex items-center'>
                    <p className='font-semibold text-[15px]'>chilllover</p>

                  </div>
                  {/* <p className='text-[13px] text-gray-500'>Trần Đức Anh</p> */}
                  <p className='text-gray-500 text-sm'>You: Hi · 2m</p>
                </div>
              </div>
              {
                true && <CircleIcon sx={{
                  fontSize: '15px',
                  color: '#6bb0ff'
                }} />
              }
            </div>
          ))}
      </div>
    </div>
  )
}

export default MessageListSection