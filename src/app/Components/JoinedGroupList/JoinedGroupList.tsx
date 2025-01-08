import React from "react";
import './joinedGroupList.scss';
import { FaBell } from "react-icons/fa"; // Importing a bell icon from react-icons
import Link from "next/link";
import { routes } from "@/app/Constants/Constants";
import  { useRouter } from "next/navigation";
import BellIconSVG from "@/app/Assets/Images/BellIconSVG";

const JoinedGroups = () => {
    const router = useRouter();
    const groups = [
        {
            name: ".NET Group",
            activeChats: 5,
            userGroupRole:"Admin",
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
            userGroupRole:"Member",
        },
        {
            name: "Python Developers",
            activeChats: 7,
            userGroupRole:"Admin",
        },
        {
            name: ".NET Group",
            activeChats: 5,
            userGroupRole:"SME",
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
            userGroupRole:"SME",
        },
        {
            name: "Python Developers",
            activeChats: 7,
            userGroupRole:"SME",
        },
        {
            name: ".NET Group",
            activeChats: 5,
            userGroupRole:"SME",
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
            userGroupRole:"SME",
        },
        {
            name: "Python Developers",
            activeChats: 7,
            userGroupRole:"SME",
        },
        {
            name: ".NET Group",
            activeChats: 5,userGroupRole:"SME",
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,userGroupRole:"SME",
        },
        {
            name: "Python Developers",
            activeChats: 7,userGroupRole:"SME",
        },
    ];

    const handleNavigation = (group:string) => {
        router.push(`${routes.groupDashboard}?group=${group}`);
    };

    return (
        <div className="joined-groups-section joined-group-list-style  overflow-y-auto ">
            <ul className="group-list h-100 overflow-y-auto pe-2">
                {groups.map((group, index) => (
                    <li key={index} className="joined-group cursor-pointer px-3 py-2 my-2" onClick={() => handleNavigation(group.name)}>
                        <div className="group-header">
                            <h2 className="m-0 text-start group-name-style">{group.name}</h2>
                            <div className="m-0 text-start text-sm text-gray-600 ps-1 pt-1">{group.userGroupRole}</div>
                        </div>
                        <div className="flex px-2 text-lg text-gray-700">
                            <div className="group-notification">
                                <BellIconSVG/>
                                <span className="chat-count">{group.activeChats}</span>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JoinedGroups;
