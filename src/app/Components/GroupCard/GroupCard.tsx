import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';  // Importing a user group icon
import './GroupCard.scss';
import GroupUserService from '@/app/Services/GroupUsersService';
import { useAppContext } from '@/app/Context/AppContext';


interface IGroupDetails {
  group: { id: number, name: string };
  updateUserJoinedGroup:(group:any)=>void;
}

const GroupCard: React.FC<IGroupDetails> = ({ group ,updateUserJoinedGroup}) => {

  const groupService = new GroupUserService();
  const userContext = useAppContext()[0] as any
  
  const joinGroup = async() => {

    try{
      const newGroup ={
        Id : 0,
  
        Group : group.name,
      
        GroupRole : "Member",
      
         UserEmail : userContext?.user?.email,
      
         ModifiedOnDt : new Date(),
      
         ModifiedBy :""
      }
      const result = await groupService.addGroupUser(newGroup)

      updateUserJoinedGroup(newGroup);
  
    }catch(ex:any){
      console.log(ex);
    }

  };

  const variant = "Light";
  return (
    <div className="group-card cursor-pointer">
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        className="shadow-sm group-card-style group-card-max-wdith"
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="d-flex align-items-center">
            <FaUsers size={24} className="me-2 text-primary" /> 
            <Card.Title className="m-0 group-name-style" title={group.name}>{group.name}</Card.Title>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={joinGroup} size="sm">
              Join
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GroupCard;
