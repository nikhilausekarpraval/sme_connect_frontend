import { useEffect, useState } from "react";

interface ConfirmPopupProps {
    isShowDelete: boolean; 
    onDelete: () => void; 
    onClearPopup: () => void; 
    title: string; 
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
    isShowDelete,
    onDelete,
    onClearPopup,
    title,
}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isShowDelete) {
            setIsModalVisible(true);
        }
    }, [isShowDelete]);

    const handleDelete = () => {
        onDelete(); 
        closeModal();
    };

    const closeModal = () => {
        setIsModalVisible(false);
        onClearPopup();
    };

    if (!isModalVisible) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={closeModal}
                    >
                    </button>
                </div>
                <div className="modal-body d-flex justify-content-center">
                    <div className="d-flex justify-content-between w-50">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
