import React, { useState } from 'react';

interface PasswordInputProps {
  filedName: string;
  currentValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  title?:string;
  maxLength?:number;
  isDisabled?:boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ filedName,maxLength = 100,isDisabled = false, currentValue, handleChange, errorMessage ,title=""}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
      <label className="block text-gray-700 font-bold mb-2">{title}<span className='text-danger font-14 ps-1'>*</span></label>
      <div className="relative">
        <input
          id={filedName}
          name={filedName}
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          className="pe-10 form-control"
          placeholder={`Enter ${title}`}
          value={currentValue}
          max={maxLength}
          required
          disabled={isDisabled}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
        >
          {showPassword ? (
            <svg
              className="shrink-0 size-3.5 hs-password-active:block"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          ) : (
            <svg
              className="shrink-0 size-3.5 hs-password-active:hidden"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
              <line x1="2" x2="22" y1="2" y2="22"></line>
            </svg>
          )}
        </button>
      </div>
      <div className="text-red-600">
                  {errorMessage}
      </div>
    </div>
  );
};

export default PasswordInput;
