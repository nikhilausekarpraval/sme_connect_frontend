'use client';
import EmployeeCard from '@/app/Components/EmployeeCard/EmployeeCard';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import './GroupDashboard.scss'
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import { discussions, discussionTabs, emptyDiscussion, routes } from '@/app/Constants/Constants';
import DiscussionForm from '../Forms/DiscussionForm/DiscussionForm';
import { IDiscussion, IGroupUser } from '@/app/Interfaces/Interfaces';
import GroupUserService from '@/app/Services/GroupUsersService';
import { useRouter } from 'next/navigation';
import DiscussionsService from '@/app/Services/DiscussionService';

export default function page() {

    const searchParams = useSearchParams();
    const group = searchParams?.get('group');
    const group_id = searchParams?.get("group_id");
    const [activeTab, setActiveTab] = useState("Open Discussions");
    const [showDisscussionForm, setShowDisscussionForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [allDiscussions, setAllDiscussions] = useState<IDiscussion[]>();
    const [selectedDiscussion, setSelectedDiscussion] = useState<IDiscussion>();
    const [allUsers, setAllUsers] = useState<IGroupUser[]>();
    const [filteredDiscussions, setFilteredDiscussions] = useState(allDiscussions?.filter((discussion) => discussion.status === getKeyByValue(activeTab)));
    const router = useRouter();
    const [groupName, setGroupName] = useState<string>();
    const _discussionService = new DiscussionsService();


    useEffect(() => {
        loadData();
    }, [])


    useEffect(() => {
        handleTabChange("Open Discussions");
    }, [allDiscussions])


    const loadData = async () => {
        try {
            const decodedGroup = decodeURIComponent(group as string)?.toString();
            const allDiscussions = await _discussionService.getDiscussions(decodedGroup)
            const users = await new GroupUserService().getGroupAllUsers(decodedGroup);
            setGroupName(decodedGroup);
            setAllDiscussions(allDiscussions?.value?.data);
            setAllUsers(users?.value?.data);

        } catch (ex: any) {
            console.log(ex);
        }

    }

    const handleTabChange = async (tab: any) => {
        await setActiveTab(tab);
        await setFilteredDiscussions(allDiscussions?.filter((discussion) => discussion.status === getKeyByValue(tab)))

    };

    function getKeyByValue(value: string) {
        for (const [key, val] of Object.entries(discussionTabs)) {
            if (val === value) {
                return key;
            }
        }

    }

    const clearForm = () => {
        // setSelectedDiscussion();
        setShowDisscussionForm(false);
        setIsEdit(false);
    }

    const saveDiscussion = () => {
        setShowDisscussionForm(false);
        setIsEdit(false);
        loadData();
    }

    const exitGroup = async () => {
        try {
            const result = await new GroupUserService().deleteGroupUsers([group_id ? group_id : ""]);

            if (result?.statusCode == 200) {
                router.back();
            } else {
                console.error('Failed to exit the group');
            }
        } catch (error) {
            console.error('Error exiting the group:', error);
        }
    };

    const showCreateForm = () => {
        setSelectedDiscussion(emptyDiscussion);
        setShowDisscussionForm(true);
    }

    // useEffect(() => {
    //     if (selectedDiscussion) {
    //       setShowDisscussionForm(true);
    //     }
    //   }, [selectedDiscussion]);

    const showEditForm = (discussion: any) => {

        setSelectedDiscussion(discussion);
        setIsEdit(true);
    }

    const deleteDiscussion = async (discussion: any) => {
        try {
            const result = await new DiscussionsService().deleteDiscussion(discussion?.name);

            if (result?.statusCode == 200) {
                // call reload to load data
                loadData();
            } else {
                console.error('Failed to delete the discussion');
            }
        } catch (error) {
            console.error('Error while deleting discussion:', error);
        }
    }

    return (
        <div className='flex h-100 flex-1 overflow-hidden'>
            <DiscussionForm isCreate={showDisscussionForm} isEdit={isEdit} group={decodeURIComponent(group as string)?.toString()} clearForm={clearForm} selectedDiscussion={selectedDiscussion} save={saveDiscussion} />
            <div className='col flex flex-1 flex-col h-100 overflow-auto'>
                <div className='flex p-4 gap-4 items-center'>
                    <div className='h4 font-bold m-0'>{group}</div>
                    <Button onClick={showCreateForm}>Create Discussion</Button>
                    <Button type="button" className="btn-danger" onClick={exitGroup}>
                        Exit Group
                    </Button>
                </div>
                <div className="discussion-tabs ps-2">
                    <span
                        onClick={() => handleTabChange("Open Discussions")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Open Discussions"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Open Discussions</span>
                    <span onClick={() => handleTabChange("Closed Discussions")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Closed Discussions"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Closed Discussions</span>
                    <span onClick={() => handleTabChange("Star Discussions")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Star Discussions"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Star Discussions <span className=" text-red-600 p-0">*</span></span>
                </div>

                <div className='flex flex-1 py-2 mt-3 mb-2 mx-2 shadow-sm rounded overflow-y-auto '>
                    {
                    allUsers &&
                        <DiscussionListCard deleteDiscussion={deleteDiscussion} listStyle={"overflow-auto"} showEditForm={showEditForm} groupAllUsers={allUsers} discussions={filteredDiscussions as any} isUpdate={true} />
                    }
                </div>

            </div>
            <div className="col col-sm-3 h-100">
                <div className="flex flex-1 flex-col h-100">
                    <div className="role-section p-2">
                        <div className="role-title">Leads</div>
                        <div className="role-content pe-2 flex flex-col gap-2">
                            {allUsers?.filter((user) => user?.groupRole === "Lead").map((user1: any) => (
                                <EmployeeCard key={user1.userEmail} user={{ name: user1.name, email: user1.userEmail }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">SMEs</div>
                        <div className="role-content pe-2 flex flex-col gap-2">
                            {allUsers?.filter((user) => user?.groupRole === "SME").map((user1: any) => (
                                <EmployeeCard key={user1.userEmail} user={{ name: user1.name, email: user1.userEmail }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">Members</div>
                        <div className="role-content pe-2 flex flex-col gap-2">
                            {allUsers?.filter((user) => user?.groupRole === "Member").map((user1: any) => (
                                <EmployeeCard key={user1.userEmail} user={{ name: user1.name, email: user1.userEmail }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};
