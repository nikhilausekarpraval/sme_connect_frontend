import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CgAttachment } from "react-icons/cg";
import { CiFileOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

interface IFileUpload {
  setSelectedFiles: (item: any) => void;
  selectedFiles: any;
  fileToRemove:string;

}

const FileUpload: React.FC<IFileUpload> = ({ setSelectedFiles, selectedFiles,fileToRemove }) => {
  const [openFileDialog, setOpenFileDialog] = useState<boolean>(false);

  useEffect(()=>{
    removeFile(fileToRemove);
  },[fileToRemove])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
    setOpenFileDialog(false); // Close the dialog after files are selected
  }, [setSelectedFiles]);

  const removeFile = (fileName: string) => {
    setSelectedFiles((prevFiles: any) =>
      prevFiles.filter((file: any) => file.name !== fileName)
    );
  };

  // Manually open file dialog if no files are selected
  const handleFileInputClick = () => {
    if (selectedFiles.length === 0) {
      setOpenFileDialog(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true, // Allow multiple files
    accept: undefined, // Accept all file types
    noClick: true, // Disable the default click behavior of input (to manually handle it)
    noKeyboard: true, // Disable keyboard events
  });

  return (
    <div className="flex items-center justify-between w-full max-w-md p-2 rounded-lg">
      <div {...getRootProps()} className="cursor-pointer">
        <input
          {...getInputProps()}
          onClick={handleFileInputClick} // Open file dialog manually
        />
        <CgAttachment className="text-2xl text-gray-600 hover:text-blue-500" />
      </div>
    </div>
  );
};

export default FileUpload;
