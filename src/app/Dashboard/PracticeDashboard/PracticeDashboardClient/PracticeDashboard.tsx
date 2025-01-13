'use client';
import React, { useEffect, useState } from 'react';
import GroupCard from '@/app/Components/GroupCard/GroupCard';
import './practiceDashboard.scss';
import JoinedGroups from '@/app/Components/JoinedGroupList/JoinedGroupList';
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import PracticeHeader from '@/app/Components/PracticHeader/PracticeHeader';
import { IUserGroup, IUserJoinedGroups } from '@/app/Interfaces/Interfaces';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/app/Context/AppContext';

interface PracticeDashboardProps {
    initialGroups: IUserGroup[];
    initialUserGroups: IUserJoinedGroups[];
    recentDiscussions: any[];
    data:any
}

const PracticeDashboard: React.FC<PracticeDashboardProps> = ({
    initialGroups,
    initialUserGroups,
    recentDiscussions,
    data,
}) => {
    const [allGroups, setAllGroups] = useState<IUserGroup[]>(initialGroups);
    const [userJoinedGroups, setUserJoinedGroups] = useState<IUserJoinedGroups[]>(initialUserGroups);
    const [newGroups, setNewGroups] = useState<IUserGroup[]>(initialGroups.filter((group) => !initialUserGroups?.some((u) => u.group === group.name)));
    const [practiceTitle, setPracticeTitle] = useState("");
    const searchParams = useSearchParams();
    const userContext = useAppContext()[0] as any
    const practice = userContext?.user?.practice;

    useEffect(() => {
        const dataParam = searchParams?.get('data');
        if (dataParam) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(dataParam));
                const title = decodedData?.key?.title;
                setPracticeTitle(title ? title : practice); 
                console.log(data);
            } catch (error) {
                console.error('Error parsing data:', error);
                setPracticeTitle(practice); 
            }
        } else {
            setPracticeTitle(practice); 
        }
    }, [searchParams, practice]);

    return (
        <div className="d-flex h-100 border p-2">
            <div className='h-100 overflow-auto w-full'>
                <div className='font-bold m-0 pb-2 ps-3 text-xl'>
                    {practiceTitle}
                </div>
                <div className="border overflow-hidden group-grid-height">
                    <PracticeHeader />
                    <div className='grid-container overflow-hidden'>
                        {newGroups?.map((item) => (
                            <GroupCard key={item.id} group={item} />
                        ))}
                    </div>
                </div>

                <div className='recent-discussion-height border border-top-0 overflow-hidden'>
                    <div className='py-2 ps-3 font-bold'>Recent discussions from my Groups</div>
                    <DiscussionListCard discussions={recentDiscussions} isUpdate={false} cardStyle={'ps-3 pe-0'} listStyle={"overflow-y-auto pe-3 h-100"} />
                </div>
            </div>

            <div className="flex-shrink-0 ps-2 border col-sm-3 ms-2 h-100">
                <div className="py-2 h-100">
                    <div className='px-3 text-lg font-bold'>My Groups.</div>
                    <JoinedGroups userJoinedGroups={userJoinedGroups} />
                </div>
            </div>
        </div>
    );
};

export default PracticeDashboard;
