'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CandidateCard from '@/app/Components/EmployeeCard/EmployeeCard';
import GroupCard from '@/app/Components/GroupCard/GroupCard';
import './practiceDashboard.scss';
import GroupListCard from '@/app/Components/GroupListCard/GroupListCard';
import JoinedGroups from '@/app/Components/JoinedGroupList/JoinedGroupList';
import { useAppContext } from '@/app/Context/AppContext';
import DiscussionListCard from '@/app/Components/DiscussionListCard/DiscussionListCard';
import { discussions } from '@/app/Constants/Constants';

type ListProps = {
    items: string[];
    title: string;
    height: string;
};

type DetailProps = {
    content: string;
    title: string;
};

const candidates = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        mobile: "123-456-7890",
    },
    {
        id: "2",
        name: "Bob Smith",
        email: "bob.smith@example.com",
        mobile: "987-654-3210",
    },
    {
        id: "3",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        mobile: "555-123-4567",
    },
    {
        id: "4",
        name: "Diana Prince",
        email: "diana.prince@example.com",
        mobile: "444-987-6543",
    },
    {
        id: "5",
        name: "Ethan Hunt",
        email: "ethan.hunt@example.com",
        mobile: "333-222-1111",
    },
];


const List: React.FC<ListProps> = ({ items, title, height }) => {
    return (
        <div className={`p-4 border rounded shadow-sm ${height}`}>
            <h5 className="mb-3">{title}</h5>
            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="list-group-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
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

    const leftList = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const rightList = ["Option A", "Option B", "Option C", "Option D"];
    const details = [
        { header: "Detail Box 1", content: "This is the content for detail box 1." },
        { header: "Detail Box 2", content: "This is the content for detail box 2." },
    ];

    const groups = [{ id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }, { id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }, { id: 2, name: ".NET" }, { id: 3, name: "React" }, { id: 5, name: "Angular" }]

    const listOfEmployees = ["Sachin", "Nikhil", "Harsha"]


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


            {/* <div className="flex-shrink-0 col col-sm-3 my-2 me-2" >
                <div className='flex flex-col gap-2 h-100'>
                    <List items={rightList} title="Updates" height='h-50' />

                    <List items={listOfEmployees} title="Discussions" height='h-50' />
                </div>

            </div> */}
        </div>
    );
};

export default PracticeDashboard;
