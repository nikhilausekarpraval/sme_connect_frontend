'use client';
import EmployeeCard from '@/app/Components/EmployeeCard/EmployeeCard';
import { useAppContext } from '@/app/Context/AppContext';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import './GroupDashboard.scss'
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import { discussions, discussionTabs } from '@/app/Constants/Constants';
import DiscussionForm from '../Forms/DiscussionForm/DiscussionForm';
import { IDiscussion } from '@/app/Interfaces/Interfaces';

const page: React.FC = () => {

    const searchParams = useSearchParams();
    const group = searchParams.get('group');
    const userContext = useAppContext()[0] as any
    const [activeTab, setActiveTab] = useState("Open Discussions");
    const [showDisscussionForm, setShowDisscussionForm] = useState(false);
    const [allDiscussions, setAllDiscussions] = useState<IDiscussion[]>(discussions);
    const [selectedDiscussion,setSelectedDiscussion] = useState<IDiscussion>(discussions[0]);
    const [filteredDiscussions, setFilteredDiscussions] = useState(allDiscussions?.filter((discussion) => discussion.status === getKeyByValue(activeTab)));

   const users = [
        { "name": "JohnDoe", "email": "john.doe@example.com", "roleName": "SME" },
        { "name": "JaneSmith", "email": "jane.smith@example.com", "roleName": "Lead" },
        { "name": "SamWilson", "email": "sam.wilson@example.com", "roleName": "Viewer" },
        { "name": "EmilyClark", "email": "emily.clark@example.com", "roleName": "Member" },
       { "name": "JohnDoe", "email": "john.doe@example.com", "roleName": "SME" },
       { "name": "JaneSmith", "email": "jane.smith@example.com", "roleName": "Lead" },
       { "name": "SamWilson", "email": "sam.wilson@example.com", "roleName": "Viewer" },
       { "name": "EmilyClark", "email": "emily.clark@example.com", "roleName": "Member" },
       { "name": "JohnDoe", "email": "john.doe@example.com", "roleName": "SME" },
       { "name": "JaneSmith", "email": "jane.smith@example.com", "roleName": "Lead" },
       { "name": "SamWilson", "email": "sam.wilson@example.com", "roleName": "Viewer" },
       { "name": "EmilyClark", "email": "emily.clark@example.com", "roleName": "Member" }
    ]



    const handleTabChange = async (tab:any)  => {
       await setActiveTab(tab);
       await setFilteredDiscussions(allDiscussions.filter((discussion) => discussion.status === getKeyByValue(tab)))
       
    };

    const tabs = [
        { label: "Open Discussions" },
        { label: "Closed Discussions" },
        { label: "Starred", icon: <span className="text-red-600">*</span> },
    ];

    function getKeyByValue(value : string) {
        for (const [key, val] of Object.entries(discussionTabs)) {
            if (val === value) {
                return key;
            }
        }
        
    }

    const clearForm=()=>{
       // setSelectedDiscussion();
       setShowDisscussionForm(false);
    }

    const saveDiscussion=()=>{
        setShowDisscussionForm(false)
    }

    return (
        <div className='flex flex-1 overflow-hidden'>
            <DiscussionForm isCreate={showDisscussionForm} isEdit={false} clearForm={clearForm} selectedDiscussion={selectedDiscussion } save={saveDiscussion}/>
            <div className='col flex flex-1 flex-col h-100 overflow-auto'>
                <div className='flex p-4 gap-4 items-center'>
                    <div className='h4 font-bold m-0'>{group}</div>
                    <Button onClick={()=>setShowDisscussionForm(true)}>Create Discussion</Button>
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
                    <span onClick={() => handleTabChange("Starred")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Starred"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Starred <span className=" text-red-600 p-0">*</span></span>
                </div>

                <div className='flex flex-1 py-2 mt-3 mb-2 mx-2 border rounded overflow-y-auto '>
                    <DiscussionListCard discussions={filteredDiscussions}/>
                </div>

            </div>
            <div className="col col-sm-3 h-100">
                <div className="flex flex-1 flex-col h-100">
                    <div className="role-section p-2">
                        <div className="role-title">Leads</div>
                        <div className="role-content pe-2 flex flex-col gap-2">
                            {users.filter((user) => user.roleName === "Lead").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">SMEs</div>
                        <div className="role-content pe-2 flex flex-col gap-2">
                            {users.filter((user) => user.roleName === "SME").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">Members</div>
                        <div className="role-content pe-2 flex flex-col gap-2">
                            {users.filter((user) => user.roleName === "Member").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}; export default page;
