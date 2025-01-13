import { useAppContext } from '@/app/Context/AppContext'
import React from 'react'

interface IPracticHeaderProps{

}

 const PracticeHeader : React.FC<IPracticHeaderProps>=() =>{
    
    return (
        <div className='px-3 mt-2 flex  justify-between font-bold '>
            <span className='font-bold m-0'>New Groups</span>
        </div>
    )
};export default PracticeHeader;
