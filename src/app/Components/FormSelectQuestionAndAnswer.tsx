import React, { useEffect, useState } from 'react'
import { quenstionsAndAnswers, questions } from '../Constants/Constants';
import { IRegisterUserErrors, IUserForm, IUserQuestions } from '../Interfaces/Interfaces';
import FormPasswordInput from './FormPasswordInput';
import { Form } from 'react-bootstrap';


interface FormSelectQuestionAndAnswerProps {
  formData: IUserQuestions;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: IRegisterUserErrors;
  title?: string;
  visibleQuestion:number;
}

const FormSelectQuestionAndAnswer: React.FC<FormSelectQuestionAndAnswerProps> = ({ formData, handleChange, errors, title = "",visibleQuestion = 1 }) => {

  const [visibleQuestions, setVisibleQuestions] =  useState(quenstionsAndAnswers.slice(0,1));

  useEffect(()=>{
      setVisibleQuestions(quenstionsAndAnswers.slice(0,1));

},[])


  useEffect(()=>{
      if(visibleQuestion === 1) {

        setVisibleQuestions(quenstionsAndAnswers.slice(0,1));

      }else if(visibleQuestion === 2){

        setVisibleQuestions(quenstionsAndAnswers.slice(1,2))

      }else if(visibleQuestion === 3){

        setVisibleQuestions(quenstionsAndAnswers.slice(2,3))

      }

  },[visibleQuestion])

  return (
    <div>
      {visibleQuestions.map((q) => (
        <div className='flex-col space-y-4'>
        <div className="form-group col-span-6">
          <Form.Label htmlFor="rolename" className="block text-gray-700 font-bold mb-2">Q{`${Object.keys(q)[0].slice(1).slice(0,7)} ${Object.keys(q)[0].slice(8,9)} `}</Form.Label>
          <Form.Select
            id={Object.keys(q)[0]}
            name={Object.keys(q)[0]}
            value={formData[Object.keys(q)[0] as keyof IUserForm]}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a question</option>
            {questions.map(question => (
              <option key={question} value={question}>{question}</option>
            ))}
          </Form.Select>
        </div>

        <FormPasswordInput filedName={Object.values(q)[0]} currentValue={formData[Object.values(q)[0] as keyof IUserForm]} handleChange={handleChange} errorMessage={errors[Object.values(q)[0] as keyof IRegisterUserErrors]} title={`A${Object.values(q)[0].slice(1).slice(0,5)} ${Object.values(q)[0].slice(6,7)}`} />
        </div>
        ))
      }
    </div>

  );
}; export default FormSelectQuestionAndAnswer
