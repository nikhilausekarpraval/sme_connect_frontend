'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useAppContext } from '@/app/Context/AppContext';
import { emptyUser, questions, registerUserFormErrors } from '@/app/Constants/Constants';
import FormPasswordInput from '@/app/Components/FormPasswordInput';
import FormSelectQuestionAndAnswer from '@/app/Components/FormSelectQuestionAndAnswer';
import usersService from '@/app/Services/usersService';

const AboutUser = () => {
  const [formData, setFormData] = useState(emptyUser);

  const [isResetUsingPassword, setIsResetUsingPassword] = useState(false);
  const [isResetUsingQuestion, setIsResetUsingQuestion] = useState(false);
  const [errors,setErrors] = useState(registerUserFormErrors)
  const [currentOperation,setCurrentOperation] = useState("Update");
  const service = new  usersService()
  const userContext = useAppContext()[0].userContext;

  useEffect(() => {
    setFormData({ ...formData, userName: userContext.user.userName, email: userContext.user.email, displayName: userContext.user.displayName })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    try {

      if(currentOperation === "Update"){

          const result =  await service.updateUser(formData);
    
        }else if(currentOperation === "Forget Password"){
    
          const result = await service.forgettUserPasssword(formData);
    
        }else if(currentOperation === "Reset Password"){
    
          const result = await service.resetUserPasssword(formData);
    
        }

    }catch(e:any){

      console.log(e)

    }

    updateApplication();

  };

  const updateApplication=()=>{

        localStorage.clear();
        window.location.reload();
  }

  const resetForm =()=>{
    setCurrentOperation("Update")
    setIsResetUsingQuestion(false);
    setIsResetUsingPassword(false);
  }

  const forgetPassword=()=>{
    setCurrentOperation("Forget Password")
    setIsResetUsingQuestion(true);
    setIsResetUsingPassword(false);
  }

  const resetPassword=()=>{
    setCurrentOperation("Reset Password")
    setIsResetUsingQuestion(false);
    setIsResetUsingPassword(true);
  }

  const updateUser= async()=>{

  }

  const forgetUserPassword =async ()=>{

  }

  const resetUserPassword = async()=>{

  }


  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>

      <form onSubmit={handleSubmit} className=" mx-auto flex-col space-y-4 p-6 bg-white shadow-md rounded-lg col-span-full">
        <div className="form-group   col-span-6" >
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group   col-span-6">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group  ">
          <label htmlFor="displayName" className="block text-gray-700 font-bold mb-2">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isResetUsingQuestion &&
          <FormSelectQuestionAndAnswer formData={formData} handleChange={handleChange} errorMessage={errors.answer}  />
        }

        {/* <div className="form-group  ">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">{isResetUsingPassword &&"Old" }Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <FormPasswordInput currentValue={formData.password} handleChange={handleChange} title ={isResetUsingPassword ? "Old Password": "Password"} filedName={"password"} errorMessage={""}/>

        {isResetUsingPassword &&
          <div className='flex-col space-y-4'>

            <div className="form-group  ">
              <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group  ">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
        }

        <div className='text-blue-500 gap-3 flex justify-end items-center py-2'>
          {(currentOperation !== "Reset Password") &&
              <button type='button' onClick={()=>resetPassword()} className='hover:underline'>Reset Password</button>
          }
          {(currentOperation !== "Forget Password") &&
            <button type='button' onClick={()=>forgetPassword()} className='hover:underline'>Forget Password</button>
          }

        </div>
        <div className='flex gap-5 justify-center'>
          <button
            type="submit"
            className=" bg-blue-500 w-48 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
          {currentOperation}
          </button>
          <button type='button' onClick={resetForm} className='w-48 bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300'>
            Reset
          </button>
        </div>

      </form>

    </div>
  );
};

export default AboutUser;
