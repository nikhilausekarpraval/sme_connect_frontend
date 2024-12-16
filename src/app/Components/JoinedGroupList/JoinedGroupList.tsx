import React from "react";
import './joinedGroupList.scss';
import { FaBell } from "react-icons/fa"; // Importing a bell icon from react-icons

const JoinedGroups = () => {
    const groups = [
        {
            name: ".NET Group",
            activeChats: 5,
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
        },
        {
            name: "Python Developers",
            activeChats: 7,
        },
        {
            name: ".NET Group",
            activeChats: 5,
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
        },
        {
            name: "Python Developers",
            activeChats: 7,
        },
        {
            name: ".NET Group",
            activeChats: 5,
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
        },
        {
            name: "Python Developers",
            activeChats: 7,
        },
        {
            name: ".NET Group",
            activeChats: 5,
        },
        {
            name: "Frontend Enthusiasts",
            activeChats: 12,
        },
        {
            name: "Python Developers",
            activeChats: 7,
        },
    ];

    return (
        <div className="joined-groups-section h-100 overflow-y-auto">
            <ul className="group-list h-50 overflow-y-auto">
                {groups.map((group, index) => (
                    <li key={index} className="joined-group py-2 my-2">
                        <div className="group-header">
                            <h2>{group.name}</h2>
                        </div>
                        <div className="flex px-2 text-lg text-gray-700">
                            <div>
                                Lead
                            </div>
                            <div className="group-notification">
                                <FaBell className="bell-icon" />
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
