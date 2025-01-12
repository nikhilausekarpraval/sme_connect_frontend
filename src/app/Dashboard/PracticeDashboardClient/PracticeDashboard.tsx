'use client';
import React, { useState } from 'react';
import GroupCard from '@/app/Components/GroupCard/GroupCard';
import './practiceDashboard.scss';
import JoinedGroups from '@/app/Components/JoinedGroupList/JoinedGroupList';
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import PracticeHeader from '@/app/Components/PracticHeader/PracticeHeader';
import { IUserGroup, IUserJoinedGroups } from '@/app/Interfaces/Interfaces';

interface PracticeDashboardProps {
    initialGroups: IUserGroup[];
    initialUserGroups: IUserJoinedGroups[];
    recentDiscussions: any[];
    practiceTitle: string;
}

const PracticeDashboard: React.FC<PracticeDashboardProps> = ({
    initialGroups,
    initialUserGroups,
    recentDiscussions,
    practiceTitle
}) => {
    const [allGroups, setAllGroups] = useState<IUserGroup[]>(initialGroups);
    const [userJoinedGroups, setUserJoinedGroups] = useState<IUserJoinedGroups[]>(initialUserGroups);
    const [newGroups, setNewGroups] = useState<IUserGroup[]>(
        initialGroups.filter((group) => initialUserGroups?.map((u) => u.group).includes(group.name))
    );

    return (
        <div className="d-flex h-100 border p-2">
            <div className='h-100 overflow-auto w-full'>
                <div className="border overflow-hidden group-grid-height">
                    <PracticeHeader title={practiceTitle} />
                    <div className='grid-container overflow-hidden'>
                        {newGroups?.map((item) => (
                            <GroupCard key={item.id} group={item} />
                        ))}
                    </div>
                </div>

                <div className='recent-discussion-height border mt-2 overflow-hidden'>
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
