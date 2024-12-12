import PracticeCard from '@/app/Components/PracticeCard/PracticeCard'
import { practicesData, practicesList } from '@/app/Constants/Constants'
import React from 'react';
import './page.scss';

export default function page() {
    return (
        <div className="overflow-auto flex flex-1 flex-col">
            <div className="grid-container overflow-auto ">
                {practicesList.map((department, index) => (
                    <PracticeCard key={index} {...department} />
                ))}
            </div>
        </div>

    )
}
