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
import GroupService from '@/app/Services/GroupService';
import GroupUserService from '@/app/Services/GroupUsersService';

interface PracticeDashboardProps {
    initialGroups: IUserGroup[];
    initialUserGroups: IUserJoinedGroups[];
    recentDiscussions: any[];
    data: any
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
    const token = sessionStorage?.getItem("accessToken");

    useEffect(() => {
        const dataParam = searchParams?.get('data');
        if (dataParam) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(dataParam));
                const title = decodedData?.key?.title;
                setPracticeTitle(title ? title : practice);
            } catch (error) {
                console.error('Error parsing data:', error);
                setPracticeTitle(practice);
            }
        } else {
            setPracticeTitle(practice);
        }
    }, [searchParams, practice]);


    const updateUserJoinedGroup = async (group: any) => {

        const groupService = new GroupService();
        const userGroupService = new GroupUserService();

        try {

            const userGroupsResponse = await userGroupService.getUserGroups(practiceTitle, token ? token : "");

            const allGroupsResponse = await groupService.getUserPracticeGroups(practiceTitle, token ? token : "");

            const newGroups = allGroupsResponse?.value?.data || [];
            const newUserGroups = userGroupsResponse?.value?.data || [];
            setUserJoinedGroups(newUserGroups);
            setNewGroups(newGroups.filter((g: any) => !newUserGroups?.some((u: any) => u.group === g.name)));

        }
        catch (ex: any) {
            console.log(ex)
        }

    };


    return (

            <div className="d-flex h-100 border p-2 practice-dashboard-background-color">
            {/* 
            <div className='h-100 d-flex overflow-auto practice-dashboard-background-color'>
            <div className='font-bold m-0 pb-2 ps-3 text-xl'>
                {practiceTitle}
            </div> 
            */}
                <div className='h-100 overflow-auto w-full'>
                    <div className="border overflow-hidden rounded-3 bg-white group-grid-height">
                        <PracticeHeader />
                        <div className='grid-container overflow-hidden'>
                            {newGroups?.map((item) => (
                                <GroupCard key={item.id} group={item} updateUserJoinedGroup={updateUserJoinedGroup} />
                            ))}
                        </div>
                    </div>

                    <div className='recent-discussion-height border rounded-3 mt-2 bg-white border-top-0 overflow-hidden'>
                        <div className='py-2 ps-3 font-bold'>Recent discussions from my Groups</div>
                        <DiscussionListCard discussions={recentDiscussions} isUpdate={false} cardStyle={'ps-3 pe-2 '} listStyle={"overflow-y-auto pe-2 h-100"} />
                    </div>
                </div>

                <div className="flex-shrink-0 ps-2 border col-sm-3 rounded-3 bg-white ms-2 h-100">
                    <div className="py-2 h-100">
                        <div className='px-3 text-lg font-bold'>My Groups.</div>
                        <JoinedGroups userJoinedGroups={userJoinedGroups} />
                    </div>
                </div>
            </div>
        // </div>
    );
};

export default PracticeDashboard;
