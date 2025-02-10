
import React, { useEffect, useState } from "react";
import './DiscussionListCard.scss';
import CommonButton from "../CommonButton/CommonButton";
import { routes } from "@/app/Constants/Constants";
import { IDiscussion, IGroupUser } from "@/app/Interfaces/Interfaces";
import { useRouter } from "next/navigation";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import { useAppContext } from "@/app/Context/AppContext";

interface discussionListCard {
    discussions: IDiscussion[],
    showEditForm?: (discussion: any) => void;
    deleteDiscussion?: (discussion: any) => void;
    groupAllUsers?: IGroupUser[],
    isUpdate?: boolean,
    listStyle?: string,
    cardStyle?: string,

}

const discussionListCard: React.FC<discussionListCard> = ({ discussions, deleteDiscussion, showEditForm, groupAllUsers, isUpdate = false, listStyle = "", cardStyle = "" }) => {
    
    const router = useRouter();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [selectedDiscussion, setSelectedDiscussion] = useState<any>();
    const userContext = useAppContext()[0] as any;
    const userEmail = userContext?.user?.email;
    const [isLead, setIsLead] = useState(false);


    useEffect(() => {
        if (isUpdate && userEmail) {
            debugger;
            console.log(userEmail)
            const user = groupAllUsers?.find((user) => user.userEmail === userEmail);
            if (user?.groupRole.toLowerCase() === 'lead') {
                    setIsLead(true);
            }
        }
    }, [userContext])

    const deleteSelected = (discussion: IDiscussion) => {
        setShowConfirmPopup(true);
        setSelectedDiscussion(discussion);
    }

    const closeConfirmPopup = () => {
        setShowConfirmPopup(false);
        setSelectedDiscussion(null);
    }

    const deleteItem = () => {
        if (deleteDiscussion)
            deleteDiscussion(selectedDiscussion);

        setShowConfirmPopup(false);
    }

    const setShowEdit = (discussion: any) => {

        if (showEditForm)
            showEditForm(discussion);
    }



    const showDiscussion = (title: string, groupName: string) => {
        router.push(`${routes.discussionDashboard}?title=${title}&groupName=${groupName}`);
    }

    return (
        <React.Fragment>
            <div className={`technology-list h-100 ${cardStyle != "" ? cardStyle : ''}w-100`}>
                <ConfirmPopup show={showConfirmPopup} message={`Are you sure you want to delete selected discussion?`} deleteItem={deleteItem} handleClose={closeConfirmPopup} />
                <ul className={listStyle}>
                    {discussions?.map((discussion, index) => (
                        <li key={index} className="discussion-item flex justify-between items-center">
                            <div>
                                <h2 className="cursor-pointer" onClick={() => showDiscussion(discussion.name, discussion.groupName)}>{discussion.name}</h2>
                                <p className="m-0 discussion-description-style" title={discussion?.description}>{discussion?.description}</p>
                            </div>
                            {(isUpdate && isLead ) &&
                                <div className="flex w-1/2 justify-center items-center gap-3">
                                    <CommonButton handleClick={() => setShowEdit(discussion)} title={"Edit"} styles={"edit-button-style"} />
                                    <CommonButton handleClick={() => deleteSelected(discussion)} title={"Delete"} styles={"btn-danger"} />
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}; export default discussionListCard;
function userState(): [any, any] {
    throw new Error("Function not implemented.");
}

