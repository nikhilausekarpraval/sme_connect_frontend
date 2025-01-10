import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';  // Importing a user group icon
import './GroupCard.scss';

interface IGroupDetails {
  group: { id: number, name: string };
}

const GroupCard: React.FC<IGroupDetails> = ({ group }) => {

  const joinGroup = () => {
    console.log(`Joining group: ${group.name}`);
  };

  const variant = "Light";
  return (
    <div className="group-card cursor-pointer">
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        className="shadow-sm group-card-style"
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="d-flex align-items-center">
            <FaUsers size={24} className="me-2 text-primary" /> 
            <Card.Title className="m-0">{group.name}</Card.Title>
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
