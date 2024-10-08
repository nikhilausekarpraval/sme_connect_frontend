interface IInputType {
    label: string;
    type: string;
  }
  
  interface CustomInputProps {
    inputType: IInputType;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const CustomInput: React.FC<CustomInputProps> = ({ inputType, handleInputChange }) => {
    return (
      <div>
        <label className="input">{inputType.label}</label>
        <input type={inputType.type} onChange={handleInputChange}></input>
      </div>
    );
  };
  