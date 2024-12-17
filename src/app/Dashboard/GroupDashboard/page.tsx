'use client';
import EmployeeCard from '@/app/Components/EmployeeCard/EmployeeCard';
import { useAppContext } from '@/app/Context/AppContext';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import './GroupDashboard.scss'
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';

const page: React.FC = () => {
    const searchParams = useSearchParams();
    const group = searchParams.get('group');
    const userContext = useAppContext()[0] as any
    const [activeTab, setActiveTab] = useState("Open Discussions");

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

    const handleTabChange = (tab:any) => {
        setActiveTab(tab);
    };

    const tabs = [
        { label: "Open Discussions" },
        { label: "Closed Discussions" },
        { label: "Starred", icon: <span className="text-red-600">*</span> },
    ];

    return (
        <div className='flex flex-1 overflow-hidden'>
            <div className='col flex flex-1 flex-col h-100 overflow-auto'>
                <div className='flex p-4 gap-4 items-center'>
                    <div className='h4 font-bold m-0'>{group}</div>
                    <Button>Create Discussion</Button>
                </div>
                <div className="discussion-tabs ps-2">
                    <span 
                        onClick={() => setActiveTab("Open Discussions")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Open Discussions"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Open Discussions</span>
                    <span onClick={() => setActiveTab("Closed Discussions")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Closed Discussions"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Closed Discussions</span>
                    <span onClick={() => setActiveTab("Starred")}
                        className={`relative px-6 py-3 font-medium text-sm cursor-pointer transition-colors duration-200 ${activeTab === "Starred"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}>Starred <span className=" text-red-600 p-0">*</span></span>
                </div>
                <div className='flex flex-1 mt-3 mb-2 mx-2 border rounded overflow-y-auto '>
                     <DiscussionListCard/>
                </div>
            </div>
            <div className="col col-sm-3 h-100">
                <div className="flex flex-1 flex-col h-100">
                    <div className="role-section p-2">
                        <div className="role-title">Leads</div>
                        <div className="role-content flex flex-col gap-2">
                            {users.filter((user) => user.roleName === "Lead").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">SMEs</div>
                        <div className="role-content flex flex-col gap-2">
                            {users.filter((user) => user.roleName === "SME").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">Members</div>
                        <div className="role-content flex flex-col gap-2">
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
