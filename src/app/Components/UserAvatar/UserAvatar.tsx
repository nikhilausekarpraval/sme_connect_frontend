import React, { useState } from 'react'
import UserMenuDropdown from '../UserMenuDropdown';
import { IUserContext } from '@/app/Interfaces/Interfaces';
import Avatar from '@mui/material/Avatar';
import deepOrange from '@mui/material/colors/deepOrange';
import deepPurple from '@mui/material/colors/deepPurple';


interface IUserAvatar{
    initials:string,
    userContext:IUserContext
}

const UserAvatar: React.FC<IUserAvatar>=({initials,userContext})=> {

    const [isDropdown, setIsDropdown] = useState(false);
    
  return (
      <div className="col col-sm-3 flex justify-end">
          <ul className='flex m-0'>
              <li>
                  <div className="current-user col d-inline-block text-dark ">
                      <div className="d-flex justify-content-end">
                          <div className="row user-container bg-none text-dark m-0">
                              <div className="p-0">
                                  <div className="row p-0 m-0">
                                      <Avatar
                                          sx={{ bgcolor: deepPurple[500] }}
                                          alt="Remy Sharp"
                                          src="/broken-image.jpg"
                                      >
                                          {initials?.toUpperCase()}
                                      </Avatar>
                                      <div className="col col-sm-9  px-2 d-flex  flex-column  justify-content-evenly ">
                                          <div>
                                              <h3 className="user-name h6 font-bold m-0 p-0 text-white">
                                                  {userContext?.user?.email}
                                              </h3>
                                          </div>
                                          <div className='flex gap-3 items-center'>
                                              <div className="text-sm text-white ">
                                                  {userContext?.roles[0]}
                                              </div>
                                              <div className=" text-gray-100 cursor-pointer" onClick={() => setIsDropdown(!isDropdown)}>
                                                  <UserMenuDropdown />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  )
};export default UserAvatar;
