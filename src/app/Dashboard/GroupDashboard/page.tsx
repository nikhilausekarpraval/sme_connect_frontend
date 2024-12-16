'use client';
import EmployeeCard from '@/app/Components/EmployeeCard/EmployeeCard';
import { useAppContext } from '@/app/Context/AppContext';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from 'react-bootstrap';
import './GroupDashboard.scss'
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';

const page: React.FC = () => {
    const searchParams = useSearchParams();
    const group = searchParams.get('group');
    const userContext = useAppContext()[0] as any

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


    return (
        <div className='flex flex-1 overflow-auto'>
            <div className='col'>
                <div className='flex p-4 gap-4 items-center'>
                    <div>{group}Group Name</div>
                    <Button>Create Discussion</Button>
                </div>
                <div className="discussion-tabs ps-2">
                    <span>Open Discussions</span>
                    <span>Closed Discussions</span>
                    <span>Starred <span className=" text-red-600 p-0">*</span></span>
                </div>
                <div className='flex flex-1 mt-3 border rounded overflow-y-auto '>
                        <div>
                                <DiscussionListCard/>
                        </div>
                </div>
            </div>
            <div className="col col-sm-3 h-100">
                <div className="flex flex-1 flex-col h-100">
                    <div className="role-section p-2">
                        <div className="role-title">Lead</div>
                        <div className="role-content flex flex-col gap-2">
                            {users.filter((user) => user.roleName === "Lead").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title flex flex-col gap-2">SMEs</div>
                        <div className="role-content">
                            {users.filter((user) => user.roleName === "SME").map((user1: any) => (
                                <EmployeeCard key={user1.email} user={{ name: user1.name, email: user1.email }} />
                            ))}
                        </div>
                    </div>
                    <div className="role-section p-2">
                        <div className="role-title ">Member</div>
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
