import { useAppContext } from '@/app/Context/AppContext'
import React from 'react'

interface IPracticHeaderProps{
    title:string
}

 const PracticeHeader : React.FC<IPracticHeaderProps>=({title}) =>{

    const userContext = useAppContext()[0].userContext
    
    return (
        <div className='px-3 mt-2 mb-2 flex  justify-between font-bold text-xl'>
            <span className='font-bold m-0'>New Groups</span>
            <span>Welcome, {userContext?.user?.displayName}</span>
        </div>
    )
};export default PracticeHeader;
