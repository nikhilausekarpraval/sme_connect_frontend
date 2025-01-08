'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GroupCard from '@/app/Components/GroupCard/GroupCard';
import './practiceDashboard.scss';
import JoinedGroups from '@/app/Components/JoinedGroupList/JoinedGroupList';
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import { discussions } from '@/app/Constants/Constants';
import PracticeHeader from '@/app/Components/PracticHeader/PracticeHeader';
import { useAppContext } from '@/app/Context/AppContext';
import PracticesService from '@/app/Services/PracticesService';
import { IPractice } from '@/app/Interfaces/Interfaces';
import { json } from 'stream/consumers';


type DetailProps = {
    content: string;
    title: string;
};


const Detail: React.FC<DetailProps> = ({ content, title }) => {

    return (
        <div className="py-2  h-100">
            <div className='px-3 text-lg font-bold'>
                My Groups.
            </div>
            {/* <div className=''>
                {candidates.map((item, index) => (
                    <CandidateCard key={index} user={{ ...item }} />
                ))}
            </div> */}

            <JoinedGroups />


        </div>
    );
};

const PracticeDashboard: React.FC = () => {
    debugger;
    const searchParams = useSearchParams();
    const data = searchParams.get('data') as string;
    const parsedData = JSON.parse(data);
    const userContext = useAppContext()[0].userContext;
    const [recentDiscussions, setRecentDiscussions] = useState(discussions);
    const practiceService = new PracticesService();
    const [practice, setPractice] = useState<IPractice>();

    useEffect(() => {
        if (!parsedData?.key?.title) {
            if (userContext?.user?.practiceId) {
                const fetchPractice = async () => {
                    try {
                        const practiceData = await practiceService.getPractice(userContext.user.practiceId);
                        setPractice(practiceData);
                    } catch (error) {
                        console.error('Failed to fetch practice data:', error);
                    }
                };
                fetchPractice();
            }
        }
    }, [userContext]);

    const groups = [{ id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }, { id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }, { id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }]

    return (
        <div className="d-flex h-100 border p-2" >
            <div className='h-100 overflow-auto w-full'>
                <div className="border overflow-hidden group-grid-height" >
                    <PracticeHeader title={ parsedData?.key?.title ? parsedData?.key?.title : practice?.name as string} />
                    <div className='grid-container overflow-hidden'>
                        {groups.map((item) => (
                            < GroupCard group={{ ...item }} />
                        ))
                        }
                    </div>
                </div>

                <div className='recent-discussion-height border mt-2  overflow-hidden '>
                    <div className='py-2 ps-3 font-bold'>Recent discussions from my Groups</div>
                    <DiscussionListCard discussions={recentDiscussions} isUpdate={false} cardStyle={'ps-3 pe-0 '} listStyle={"overflow-y-auto pe-3 h-100"} />
                </div>
            </div>

            <div className="flex-shrink-0 ps-2 border col-sm-3 ms-2 h-100" >
                <Detail content={"Joined Groups "} title={parsedData?.key?.title} />
            </div>

        </div>
    );
};

export default PracticeDashboard;
