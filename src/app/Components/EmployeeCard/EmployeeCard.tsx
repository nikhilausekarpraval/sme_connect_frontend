
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
        <React.Fragment>
            <div className="candidate-card-section" >
                <div>
                    <div className="user-card">
                        <div className="card-header">
                            <Avatar
                                //sx={{ bgcolor: deepPurple[500] }}
                            >
                                <FaUserTie />
                            </Avatar>

                            <div className="user-info d-flex">
                                <h2 className='user-name-style' title={user?.name}>{user?.name}</h2>
                                <p className='user-name-style' title={user?.email}>{user?.email}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default EmployeeCard;