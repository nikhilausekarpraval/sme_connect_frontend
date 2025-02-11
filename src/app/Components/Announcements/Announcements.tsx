'use client'

import { useAppContext } from "@/app/Context/AppContext";
import { GetTimeStampFormatedDate } from "@/app/Helpers/Helpers";
import { IAnnouncement } from "@/app/Interfaces/Interfaces";
import AnnouncementService from "@/app/Services/announcementService";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnnouncementsCard() {

    const [announcements,setAnnouncements] = useState<IAnnouncement[]>([]);
        const userContext = useAppContext()[0] as any
        const user = userContext?.user;

    useEffect(()=>{
            loadData();
    },[])

    const loadData=async()=>{
          const data = await new AnnouncementService().getAnnouncement({userName:user.userName,practiceName:user.practice,groupName:"",isAdmin:user?.practice === "All Practices"} );
          setAnnouncements(data?.value?.data ?? []);
    }
    
    return (
        <div className="max-w-md bg-white  rounded-lg mt-4 ">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    Announcements 
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {announcements?.length}
                    </span>
                </h2>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-32">
                {announcements?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="flex-1">
                            <p className=" font-medium text-gray-800 truncate">
                                {item.message}
                            </p>
                            <p className="text-sm text-green-600">{GetTimeStampFormatedDate(item.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
