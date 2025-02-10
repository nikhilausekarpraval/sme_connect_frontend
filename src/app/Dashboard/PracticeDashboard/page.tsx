'use client';
import React, { useEffect, useState } from 'react';
import GroupCard from '@/app/Components/GroupCard/GroupCard';
import './page.scss';
import JoinedGroups from '@/app/Components/JoinedGroupList/JoinedGroupList';
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import PracticeHeader from '@/app/Components/PracticHeader/PracticeHeader';
import { IUserGroup, IUserJoinedGroups } from '@/app/Interfaces/Interfaces';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/app/Context/AppContext';
import GroupService from '@/app/Services/GroupService';
import GroupUserService from '@/app/Services/GroupUsersService';
import DiscussionsService from '@/app/Services/DiscussionService';

interface PracticeDashboardProps {
    // initialGroups: IUserGroup[];
    // initialUserGroups: IUserJoinedGroups[];
    // recentDiscussions: any[];
}

const PracticeDashboard: React.FC<PracticeDashboardProps> = () => {
    const [allGroups, setAllGroups] = useState<IUserGroup[]>([]);
    const [userJoinedGroups, setUserJoinedGroups] = useState<IUserJoinedGroups[]>([]);
    const [newGroups, setNewGroups] = useState<IUserGroup[]>([]);
    const [practiceTitle, setPracticeTitle] = useState("");
    const [recentDiscussions, setRecentDiscussions] = useState([]);
    const searchParams = useSearchParams();
    const userContext = useAppContext()[0] as any
    const practice = userContext?.user?.practice;
    const groupService = new GroupService();
    const userGroupService = new GroupUserService();
    const discussionService = new DiscussionsService();


    useEffect(() => {
        const dataParam = searchParams?.get('practice');
        if (dataParam) {
            try {
                setPracticeTitle(dataParam ? dataParam : practice);
                loadData(dataParam);
            } catch (error) {
                console.error('Error parsing data:', error);
                setPracticeTitle(practice);
            }
        } else {
            setPracticeTitle(practice);
        }
    }, [searchParams, practice]);

    useEffect(()=>{
        const dataParam = searchParams?.get('practice');
        if(dataParam){
            loadData(dataParam);
        }
    },[])


    const loadData = async (practiceName: any) => {

        try {

            const userGroupsResponse = await userGroupService.getUserGroups(practiceName);
            const allGroupsResponse = await groupService.getUserPracticeGroups(practiceName);
            const recentDis = await discussionService.getRecentDiscussion({ practice: practiceName, group: "", discussion: "", description: "" });
            
            const allGroupsData = allGroupsResponse?.value?.data || [];
            const userGroupsData = userGroupsResponse?.value?.data || [];
            
            setNewGroups(allGroupsData?.filter((group:any) => !userGroupsData?.some((u:any) => u.group === group.name)));
            setAllGroups(allGroupsData);
            setUserJoinedGroups(userGroupsData);
            setRecentDiscussions(recentDis?.value?.data || []);

        } catch (ex: any) {
            console.log(ex)
        }

    }


    const updateUserJoinedGroup = async (group: any) => {

        try {

            loadData(practiceTitle)

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
                    {newGroups &&
                        <div className='grid-container overflow-hidden'>
                            {newGroups?.map((item) => (
                                <GroupCard key={item.id} group={item} updateUserJoinedGroup={updateUserJoinedGroup} />
                            ))}
                        </div>
                    }
                </div>

                <div className='recent-discussion-height border rounded-3 mt-2 bg-white border-top-0 overflow-hidden'>
                    <div className='py-2 ps-3 font-bold'>Recent discussions from my Groups</div>
                    {recentDiscussions &&
                        <DiscussionListCard discussions={recentDiscussions} isUpdate={false} cardStyle={'ps-3 pe-2 '} listStyle={"overflow-y-auto pe-2 h-100"} />
                    }
                </div>
            </div>

            <div className="flex-shrink-0 ps-2 border col-sm-3 rounded-3 bg-white ms-2 h-100">
                <div className="py-2 h-100">
                    <div className='px-3 text-lg font-bold'>My Groups.</div>
                    {userJoinedGroups &&
                        <JoinedGroups userJoinedGroups={userJoinedGroups} />
                    }
                </div>
            </div>
        </div>
        // </div>
    );
};

export default PracticeDashboard;
