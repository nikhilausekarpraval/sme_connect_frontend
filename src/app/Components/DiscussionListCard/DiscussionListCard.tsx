
import React from "react";
import './DiscussionListCard.scss';

const discussionListCard : React.FC=({})=>{
    const discussions = [
        {
            name: ".NET discussion",
            description: "Focuses on .NET technologies for enterprise applications."
        },
        {
            name: "Frontend discussion",
            description: "Specializes in building modern UI using popular frontend tools.",
        },
        {
            name: "Python Developers",
            description: "Dedicated to Python and its diverse ecosystem.",
        },
    ];


return(
<React.Fragment>
        <div className="technology-list w-100">
            <ul>
                {discussions.map((discussion, index) => (
                    <li key={index} className="discussion-item">
                        <h2>{discussion.name}</h2>
                        <p className="m-0">{discussion.description}</p>
                    </li>
                ))}
            </ul>
        </div>
</React.Fragment>
)
};export default discussionListCard;
