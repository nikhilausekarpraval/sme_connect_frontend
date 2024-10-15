import React from 'react'
import { questions } from '../Constants/Constants';
import { IUserForm } from '../Interfaces/Interfaces';
import FormPasswordInput from './FormPasswordInput';

interface FormSelectQuestionAndAnswerProps{
    formData: IUserForm;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errorMessage: string;
    title?:string;
}

const FormSelectQuestionAndAnswer : React.FC<FormSelectQuestionAndAnswerProps>=({ formData, handleChange, errorMessage ,title=""})=> {
  return (
    <div className='flex-col space-y-4'>
            <div className="form-group col-span-6">
              <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Questions</label>
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
            {/* <div className="form-group mb-4 ">
                <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">Answer</label>
                <input
                    type="password"
                    id="answer"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className='text-red-600'>
                        {errorMessage}
                </div>
            </div> */}
            <FormPasswordInput  filedName={"answer"} currentValue={formData.answer} handleChange={handleChange} errorMessage={errorMessage} title={"Answer"}/>
          </div>
  );
};export default FormSelectQuestionAndAnswer
