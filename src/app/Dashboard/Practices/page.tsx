'use client'
import PracticeCard from '@/app/Components/PracticeCard/PracticeCard'
import React, { useEffect, useState } from 'react';
import './page.scss';
import PracticesService from '@/app/Services/PracticesService';
import { IPractice } from '@/app/Interfaces/Interfaces';

export default function page() {

    const [practices,setPractces] = useState<IPractice[]>();
    const practiceService = new PracticesService();
    
       useEffect(() => {

               getData();
       }, []);

       const getData =async()=>{
        try {
            const practiceData = await practiceService.getPractices();
            setPractces(practiceData?.value?.data);
        } catch (error) {
            
        }

       }


    return (
        <div className="overflow-auto h-100 flex flex-1 flex-col">
            <div className="practice-grid-container h-100 overflow-auto ">
                {practices?.map((practice, index) => (
                    <PracticeCard key={index} {...practice} />
                ))}
            </div>
        </div>

    )
}
