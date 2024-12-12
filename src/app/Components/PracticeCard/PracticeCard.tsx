'use client';
import { routes } from '@/app/Constants/Constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';

type DepartmentCardProps = {
    title: string;
    metrics: string[];
    links: { text: string; url: string }[];
    highlights: string[];
    visuals?: { progress?: number };
};

const PracticeCard: React.FC<DepartmentCardProps> = ({ title, metrics, links, highlights, visuals }) => {

    const router = useRouter();

    const handleNavigation = () => {
        const data = JSON.stringify({ key: {title}});
        router.push(`${routes.practiceDashboard}?data=${encodeURIComponent(data)}`);
    };

    return (
        // <Link className={` justify-start transition-all duration-50 no-underline }`} href={{
        //     pathname: '/targetPage',
        //     query: { data: JSON.stringify({ practice: {title}}) }, 
        // }}>

        <Card className="shadow-sm" onClick={handleNavigation} >
            <Card.Body>
                <Card.Title className="text-primary">{title}</Card.Title>
                <Card.Text>
                    <strong>Key Metrics:</strong>
                    <ul>
                        {metrics.map((metric, index) => (
                            <li key={index}>{metric}</li>
                        ))}
                    </ul>
                </Card.Text>

                {visuals?.progress && (
                    <div className="my-3">
                        <ProgressBar now={visuals.progress} label={`${visuals.progress}%`} />
                    </div>
                )}

                <Card.Text>
                    <strong>Highlights:</strong>
                    <ul>
                        {highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                        ))}
                    </ul>
                </Card.Text>

                <div className="d-grid gap-2">
                    {links.map((link, index) => (
                        <Button key={index} variant="outline-primary" href={link.url} target="_blank">
                            {link.text}
                        </Button>
                    ))}
                </div>
            </Card.Body>
        </Card>
        // </Link>
    );
};

export default PracticeCard;


