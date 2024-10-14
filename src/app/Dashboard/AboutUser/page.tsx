'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useAppContext } from '@/app/Context/AppContext';
import { questions } from '@/app/Constants/Constants';
import FormPasswordInput from '@/app/Components/FormPasswordInput';

const AboutUser = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    displayName: '',
    newPassword: "",
    confirmPassword: "",
    question: "",
    answer: "",
  });

  const [isResetUsingPassword, setIsResetUsingPassword] = useState(false);
  const [isResetUsingQuestion, setIsResetUsingQuestion] = useState(false);

  const userContext = useAppContext().userContext;

  useEffect(() => {
    console.log(userContext)
    setFormData({ ...formData, userName: userContext.user.userName, email: userContext.user.email, displayName: userContext.user.displayName })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const resetForm =()=>{
    setIsResetUsingQuestion(false);
    setIsResetUsingPassword(false);
  }

  const forgetPassword=()=>{
    setIsResetUsingQuestion(true);
    setIsResetUsingPassword(false);
  }

  const resetPassword=()=>{
    setIsResetUsingQuestion(false);
    setIsResetUsingPassword(true);
  }

  return (
    <div className='flex-grow justify-center items-center max-w-screen-md'>

      <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-white shadow-md rounded-lg col-span-full">
        <div className="form-group mb-4  col-span-6" >
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

        <div className="form-group mb-4  col-span-6">
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

        <div className="form-group mb-4 ">
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
          <div>
            <div className="form-group mb-4 col-span-6">
              <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">User Name</label>
              <select
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a qustion</option>
                {questions.map(question => (
                  <option key={question} value={question}>{question}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-4 ">
              <label htmlFor="Answer" className="block text-gray-700 font-bold mb-2">Answer</label>
              <input
                type="password"
                id="Answer"
                name="Answer"
                value={formData.answer}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        }

        {/* <div className="form-group mb-4 ">
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

        <FormPasswordInput currentValue={formData.password} handleChange={handleChange} filedName={isResetUsingPassword ? "Old Password": "password"} errorMessage={""}/>

        {isResetUsingPassword &&
          <div>

            <div className="form-group mb-4 ">
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

            <div className="form-group mb-4 ">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
        }

        <div className='text-blue-500 gap-3 flex justify-end items-center py-2'>
          <button type='button' onClick={()=>forgetPassword()} className='hover:underline'>Forget Password</button>
          <button type='button' onClick={()=>resetPassword()} className='hover:underline'>Reset Password</button>
        </div>
        <div className='flex gap-5 justify-center'>
          <button
            type="submit"
            className=" bg-blue-500 w-44 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
          Update
        </button>
          <button type='button' onClick={resetForm} className='w-44 bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300'>
            Reset
          </button>
        </div>

      </form>

    </div>
  );
};

export default AboutUser;
