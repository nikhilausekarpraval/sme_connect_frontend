import React from 'react';

interface ButtonDetails {
  title: string;
}

const CustomButton: React.FC<ButtonDetails> = ({ title }) => {
  return (
    <button
      type='submit'
      className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      {title}
    </button>
  );
};

export default CustomButton;
