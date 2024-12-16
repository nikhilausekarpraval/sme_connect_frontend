
import React from "react";
import './DiscussionListCard.scss';

const GroupListCard : React.FC=({})=>{
    const groups = [
        {
            name: ".NET Group",
            description: "Focuses on .NET technologies for enterprise applications.",
            technologies: [".NET Core", "C#", "ASP.NET", "Entity Framework"],
        },
        {
            name: "Frontend Group",
            description: "Specializes in building modern UI using popular frontend tools.",
            technologies: ["React.js", "Vue.js", "Angular", "Tailwind CSS"],
        },
        {
            name: "Python Developers",
            description: "Dedicated to Python and its diverse ecosystem.",
            technologies: ["Python", "Django", "Flask", "Pandas"],
        },
    ];


return(
<React.Fragment>
        <div className="technology-list">
            <h1 className="list-heading">Technology Groups</h1>
            <ul>
                {groups.map((group, index) => (
                    <li key={index} className="group-item">
                        <h2>{group.name}</h2>
                        <p>{group.description}</p>
                        <ul className="technologies">
                            {group.technologies.map((tech, techIndex) => (
                                <li key={techIndex} className="technology-item">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
</React.Fragment>
)
};export default GroupListCard;
