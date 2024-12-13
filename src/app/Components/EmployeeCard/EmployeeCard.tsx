
import './EmployeeCard.scss'
import { FaUserTie } from "react-icons/fa";
import React from 'react';
import Avatar from '@mui/material/Avatar';

type CandiateDataType = {
    id: string,
    name: string,
    email: string,
    mobile: string,
}


type CandidateProps = {
    user: CandiateDataType;
}

const CandidateCard: React.FC<CandidateProps> = ({ user }) => {

    return (
        <React.Fragment>
            <div className="candidate-card-section" >
                <div>
                    <div className="user-card">
                        <div className="card-header">
                            <Avatar
                                //sx={{ bgcolor: deepPurple[500] }}
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                            >
                                <FaUserTie />
                            </Avatar>

                            <div className="user-info d-flex">
                                <h2 >{user?.name}</h2>
                                <p>{user?.email}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default CandidateCard;