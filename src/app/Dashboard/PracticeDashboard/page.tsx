'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GroupCard from '@/app/Components/GroupCard/GroupCard';
import './practiceDashboard.scss';
import JoinedGroups from '@/app/Components/JoinedGroupList/JoinedGroupList';
import { useAppContext } from '@/app/Context/AppContext';
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import { discussions } from '@/app/Constants/Constants';


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

                <JoinedGroups/>


        </div>
    );
};

const PracticeDashboard: React.FC = () => {

    const searchParams = useSearchParams();
    const data = searchParams.get('data');
      const userContext = useAppContext() as any
    const parsedData = data ? JSON.parse(data) : {};
    const [recentDiscussions, setRecentDiscussions] = useState(discussions);

    const groups = [{ id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }, { id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }, { id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }]

    return (
        <div className="d-flex h-100 border p-2" >
            <div className='h-100 overflow-auto w-full'>
                <div className="border overflow-hidden group-grid-height" >
                    <div className='ps-3 mt-2 mb-2 font-bold text-xl'>Welcome, {useAppContext()[0]?.userContext?.user?.displayName} {userContext?.user?.displayName}.</div>
                    <div className='grid-container overflow-hidden'>
                        {groups.map((item) => (
                            < GroupCard group={{ ...item }} />
                        ))
                        }
                    </div>
                </div>

                <div className='recent-discussion-height border mt-2  overflow-hidden '>
                    <div className='py-2 ps-3 font-bold'>Recent discussions from my Groups</div>
                    <DiscussionListCard discussions={recentDiscussions} isUpdate={false} cardStyle={'ps-3 pe-0 '} listStyle= {"overflow-y-auto pe-3 h-100"}/>
                </div>
            </div>

            <div className="flex-shrink-0 ps-2 border col-sm-3 ms-2 h-100" >
                <Detail content={"Joined Groups "} title={parsedData?.key?.title} />
            </div>

        </div>
    );
};

export default PracticeDashboard;
