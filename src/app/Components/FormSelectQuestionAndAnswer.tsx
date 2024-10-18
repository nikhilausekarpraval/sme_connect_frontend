import React from 'react'
import { quenstionsAndAnswers, questions } from '../Constants/Constants';
import { IRegisterUserErrors, IUserForm } from '../Interfaces/Interfaces';
import FormPasswordInput from './FormPasswordInput';


interface FormSelectQuestionAndAnswerProps {
  formData: IUserForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: IRegisterUserErrors;
  title?: string;
}

const FormSelectQuestionAndAnswer: React.FC<FormSelectQuestionAndAnswerProps> = ({ formData, handleChange, errors, title = "" }) => {
  return (
    <div>
      {quenstionsAndAnswers.map((q) => (
        <div className='flex-col space-y-4'>
        <div className="form-group col-span-6">
          <label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Q{Object.keys(q)[0].slice(1)}</label>
          <select
            id={Object.keys(q)[0]}
            name={Object.keys(q)[0]}
            value={formData[Object.keys(q)[0] as keyof IUserForm]}
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

        <FormPasswordInput filedName={Object.values(q)[0]} currentValue={formData[Object.values(q)[0] as keyof IUserForm]} handleChange={handleChange} errorMessage={errors[Object.values(q)[0] as keyof IRegisterUserErrors]} title={`A${Object.values(q)[0].slice(1)}`} />
        </div>
        ))
      }
    </div>

  );
}; export default FormSelectQuestionAndAnswer
