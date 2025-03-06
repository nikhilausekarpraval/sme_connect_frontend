
import './EmployeeCard.scss'
import { FaUserTie } from "react-icons/fa";
import React from 'react';
import Avatar from '@mui/material/Avatar';

type CandiateDataType = {
    name: string,
    email: string,
}


type CandidateProps = {
    user: CandiateDataType;
}

const EmployeeCard: React.FC<CandidateProps> = ({ user }) => {

    return (
        <div className="candidate-card-section card dark:bg-gray-900 shadow-md rounded-lg p-2">
            <div className="flex items-center space-x-4">
                <Avatar>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 dark:bg-purple-400 text-white rounded-full">
                    <FaUserTie className="w-6 h-6" />
                </div>
                </Avatar>
                {/* User Info */}
                <div className='w-full'>
                    <h2 className="text-lg user-name-style font-semibold text-gray-600 dark:text-gray-400 truncate" title={user?.name}>
                        {user?.name}
                    </h2>
                    <p className="text-sm user-name-style text-gray-600 dark:text-gray-400 truncate" title={user?.email}>
                        {user?.email}
                    </p>
                </div>
            </div>
        </div>
    )
};
export default EmployeeCard;