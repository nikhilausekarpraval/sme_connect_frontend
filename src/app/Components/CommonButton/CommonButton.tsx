import React from 'react'
import { Button } from 'react-bootstrap'

interface ICommonButton{
    type?:string
    handleClick:()=>void;
    title:string;
    styles:string;
}

const CommonButton : React.FC<ICommonButton>=({type="button",handleClick,title,styles}) =>{
  return (
    <Button className={styles} type={ type === "submit" ? "submit" : "button"} onClick={handleClick} >
        {title}
    </Button>
  )
};export default CommonButton;
