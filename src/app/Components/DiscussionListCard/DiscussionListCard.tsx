
import React from "react";
import './DiscussionListCard.scss';
import { Button } from "react-bootstrap";
import CommonButton from "../CommonButton/CommonButton";
import { discussionCloseType, discussionStatusTypes, routes } from "@/app/Constants/Constants";
import { IDiscussion } from "@/app/Interfaces/Interfaces";
import { useRouter } from "next/navigation";

interface discussionListCard {
    discussions: IDiscussion[],
    isUpdate?: boolean,
    listStyle?: string,
    cardStyle?: string,
    showEditForm:(discussion:any)=>void;
}

const discussionListCard: React.FC<discussionListCard> = ({ discussions, showEditForm, isUpdate = false, listStyle = "", cardStyle = "" }) => {
    const router = useRouter();

    const closeDiscussion = () => {

    }

    const openDiscussion = () => {

    }

    const starredDiscussion = () => {

    }

    const unStarrDiscussion = () => {

    }

    const setShowEdit=(discussion:any)=>{
        showEditForm(discussion);
    }

    const getButtonType = (buttonStatus: string) => {

        switch (buttonStatus) {
            case discussionStatusTypes.Open:
                return discussionStatusTypes.Close;

            case discussionStatusTypes.Close:
                return discussionStatusTypes.Open

            case discussionStatusTypes.Starred:
                return discussionStatusTypes.Close;
            default:
                return discussionStatusTypes.Open;
        }

    }

    const getFunction = (buttonStatus: string) => {
        switch (buttonStatus) {
            case discussionStatusTypes.Open:
                return closeDiscussion;
            case discussionStatusTypes.Close:
                return openDiscussion;
            case discussionStatusTypes.Starred:
                return unStarrDiscussion;
            case discussionStatusTypes.Unstar:
                return starredDiscussion;
            default:
                return () => { };
        }
    };

    const showDiscussion = (title: string) => {
        router.push(`${routes.discussionDashboard}?title=${title}`);
    }

    return (
        <React.Fragment>
            <div className={`technology-list h-100 ${cardStyle != "" ? cardStyle : ''}w-100`}>
                <ul className={listStyle}>
                    {discussions?.map((discussion, index) => (
                        <li key={index} className="discussion-item flex justify-between items-center">
                            <div>
                                <h2 className="cursor-pointer" onClick={() => showDiscussion(discussion.title)}>{discussion.title}</h2>
                                <p className="m-0 discussion-description-style" title={discussion?.description}>{discussion?.description}</p>
                            </div>
                            {isUpdate &&
                                <div className="flex w-1/2 justify-center items-center gap-3">
                                    <CommonButton handleClick={()=>setShowEdit(discussion)} title={"Edit"} styles={""} />
                                    {/* {isUpdate && (<React.Fragment>
                                        {
                                            discussion.status !== discussionStatusTypes.Close &&
                                            <CommonButton
                                                handleClick={getFunction(discussion.status === discussionStatusTypes.Starred ? discussionStatusTypes.Unstar : discussionStatusTypes.Star)}
                                                title={discussion.status === discussionStatusTypes.Starred ? discussionStatusTypes.Unstar : discussionStatusTypes.Star}
                                                styles={`button-width ${discussionCloseType.filter((item) => item === (discussion.status === discussionStatusTypes.Starred ? discussionStatusTypes.Unstar : discussionStatusTypes.Star)).length > 0 ? 'btn-secondary' : ''}`}
                                            />
                                        }

                                        < CommonButton
                                            handleClick={getFunction(discussion.status)}
                                            title={getButtonType(discussion.status) as string}
                                            styles={`button-width ${discussionCloseType.includes(getButtonType(discussion.status)) ? 'btn-secondary' : ''}`}
                                        />
                                    </React.Fragment>
                                    )
                                    } */}
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}; export default discussionListCard;
