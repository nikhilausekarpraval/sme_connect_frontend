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
        // <Card
        //     className="card-container shadow-md cursor-pointer card-hover-effect"
        //     onClick={handleNavigation}
        // >
        //     <Card.Body className="card-body">
        //         <Card.Title className="card-title text-blue-500 ">
        //               <div className='practice-title-style' title={name}>{name}</div>
        //             <FaArrowRight className="arrow-icon" />
        //         </Card.Title>
        //         <Card.Text className="card-text">
        //             <strong className="card-description-label">Description:</strong>
        //             <div className="card-description text-black" title={description}>{description}</div>
        //         </Card.Text>
        //     </Card.Body>
        // </Card>

        <div
            onClick={handleNavigation}
            className="card-container  dark:bg-gray-900 shadow-md cursor-pointer rounded-lg p-4 transition-transform hover:scale-105"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-500 truncate" title={name}>
                    {name}
                </h3>
                <FaArrowRight className="text-gray-600 dark:text-gray-300" />
            </div>
            <p className="mt-2 card-text dark:text-gray-200">
                <strong className="card-description-label text-gray-600 dark:text-gray-300">Description:</strong>
                <span className=" card-description text-gray-600 dark:text-gray-400" title={description}>
                    {description}
                </span>
            </p>
        </div>

    );
};

export default PracticeCard;
