import React from 'react'
import { Button, Card } from 'react-bootstrap'

interface IGroupDetails {
  group: { id: number, name: string }
}

const GroupCard: React.FC<IGroupDetails> = ({ group }) => {

  const joinGroup = () => {

  }
  const variant = "Light";
  return (
    <div>
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '10rem' }}
        className="mb-2"
      >
        {/* <Card.Header>Group</Card.Header> */}
        <Card.Body className='flex flex-col'>
          <div className='flex justify-center items-center py-4'>
            <Card.Title>{group.name} </Card.Title>
          </div>
          <div className='flex justify-end'>
            <Button onClick={joinGroup}>Join</Button>
          </div>

        </Card.Body>
        {/* <Card.Footer>
          <Button onClick={joinGroup}>Join</Button>
        </Card.Footer> */}
      </Card>
    </div>
  )
}; export default GroupCard;
