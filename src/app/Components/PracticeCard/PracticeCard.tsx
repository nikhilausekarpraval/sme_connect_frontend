'use client';
import { routes } from '@/app/Constants/Constants';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import './PracticeCard.scss';
import { useDispatch } from 'react-redux';
import { setPractice } from '@/store/userSlice';


type DepartmentCardProps = {
    name: string;
    description: string;
};

const PracticeCard: React.FC<DepartmentCardProps> = ({ name, description }) => {

    const router = useRouter();
    const dispatch = useDispatch();

    const handleNavigation = () => {    
        dispatch(setPractice(name));
        router.push(`${routes.practiceDashboard}?practice=${name}`);
    };
    
    return (
        <Card
            className="card-container shadow-md cursor-pointer card-hover-effect"
            onClick={handleNavigation}
        >
            <Card.Body className="card-body">
                <Card.Title className="card-title text-blue-500 ">
                      <div className='practice-title-style' title={name}>{name}</div>
                    <FaArrowRight className="arrow-icon" />
                </Card.Title>
                <Card.Text className="card-text">
                    <strong className="card-description-label">Description:</strong>
                    <div className="card-description text-black" title={description}>{description}</div>
                </Card.Text>
            </Card.Body>
        </Card>

    );
};

export default PracticeCard;
