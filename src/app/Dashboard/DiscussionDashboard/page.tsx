'use client';
import EmployeeCard from '@/app/Components/EmployeeCard/EmployeeCard';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import './DiscussionDashboard.scss'
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import ChatSection from '@/app/Components/ChatSection/ChatSection';
import DiscussionsService from '@/app/Services/DiscussionService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const page: React.FC = () => {

    const searchParams = useSearchParams();
    const discussion = searchParams?.get('title');
    const [similarDiscussions, setSimilarDiscussions] = useState([]);
    const practice = useSelector((state: RootState) => state.user.practice);
    const groupName = decodeURIComponent(searchParams?.get('groupName') as string)?.toString();
    
    useEffect(()=>{
        loadData();
    },[])

    const loadData=async()=>{
        try{
            var result = await new DiscussionsService().getSimilarDiscussion({discussion:discussion,practice:practice,description:"",group:groupName});
            setSimilarDiscussions(result?.value?.data);

        }catch(ex:any){
            console.log(ex);
        }
    }

    const users = [
        { "name": "Nikhil Ausekar", "email": "nikhil.a@gmail.com", "roleName": "SME" },
        { "name": "Sachin Jaggumantri", "email": "sachin@gmail.com", "roleName": "Lead" },
        { "name": "Pradeep Ram", "email": "pradeep@gmail.com", "roleName": "Viewer" },
        { "name": "Uday G", "email": "uday@gmail.com", "roleName": "Member" },
        { "name": "Kedar Rodge", "email": "kedar@gmail.com", "roleName": "SME" },
        { "name": "Rakesh", "email": "rakesh@gmail.com", "roleName": "Lead" },
        { "name": "Solomon", "email": "solomon@gmail.com", "roleName": "Viewer" },
    ]

    const showEditForm=()=>{

    }

    return (
        <div className='flex h-100 flex-1 overflow-hidden'>

            <div className='col flex flex-1 flex-col h-100 overflow-auto'>
                <div className='px-3 pt-2'>
                    <div className='h4 font-bold m-0'>{discussion}</div>
                    {/* <div className='h6 m-0 py-3 font-bold'>Lets grow together.</div> */}
                </div>
                <div className="px-3 discussion-height mt-1 overflow-auto h-50 mb-2">
                    <div className='text-lg font-bold m-0'>Comments:</div>
                    <div className='comment-section-height  overflow-y-auto '>
                        <ChatSection title={discussion as string}/>
                    </div>
                </div>
                <div className='h6 font-bold py-2 mb-0 px-3'>Similar discussions:</div>
                <div className='flex flex-1 mb-2 overflow-y-auto '>
                    <DiscussionListCard showEditForm={showEditForm} discussions={similarDiscussions} />
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
