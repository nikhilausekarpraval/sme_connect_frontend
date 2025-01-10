'use client';
import { routes } from '@/app/Constants/Constants';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa'; 
import './PracticeCard.scss';

type DepartmentCardProps = {
    title: string;
    description: string[];
};

const PracticeCard: React.FC<DepartmentCardProps> = ({ title, description }) => {
    const router = useRouter();

    const handleNavigation = () => {
        const data = JSON.stringify({ key: { title } });
        router.push(`${routes.practiceDashboard}?data=${encodeURIComponent(data)}`);
    };

    return (
        <Card 
            className="shadow-md cursor-pointer rounded-lg card-hover-effect mb-3" 
            onClick={handleNavigation} 
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
        >
            <Card.Body style={{ padding: '20px' }}>
                <Card.Title 
                    className="text-primary pt-2 pb-3 font-weight-bold mb-2" 
                    style={{ fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    {title}
                    <FaArrowRight style={{ fontSize: '1rem', color: '#0056D2' }} />
                </Card.Title>

                <Card.Text style={{ color: '#616161', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#333' }}>Description:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                        {description.map((item, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PracticeCard;
