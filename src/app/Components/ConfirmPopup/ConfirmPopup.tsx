'use client'
import * as React from "react";
import "./ConfirmPopup.scss";
import { Modal } from "react-bootstrap";
import DangerSVG from "@/app/Assets/Images/DangerSVG";


interface IValidSuccessProps {
    show: boolean;
    message: string;
    deleteItem: () => void;
    handleClose: () => void;
}

interface IValidSuccesState {
    isDisabled: boolean,
}

export default class ConfirmPopup extends React.Component<IValidSuccessProps, IValidSuccesState> {
    constructor(props: IValidSuccessProps) {
        super(props);
        this.state = {
            isDisabled: false,
        };
    }

    componentDidMount() {
        this.setState({ isDisabled: false })
    }

    componentDidUpdate(prevProps: Readonly<IValidSuccessProps>, prevState: Readonly<IValidSuccesState>, snapshot?: any): void {
        if (this.props.show !== prevProps.show) {
            this.setState({ isDisabled: false });
        }
    }

    handleDelete = () => {
        this.setState({ isDisabled: true })
        this.props.deleteItem();
    }

    render() {
        return (
            <Modal dialogClassName="modal-width" centered show={this.props.show}>
                <div className="d-flex justify-content-center align-items-center validating-modal-container p-4">
                    <div className="d-flex w-100 flex-column justify-content-center align-items-center gap-4">
                        <div className="h5 m-0"><DangerSVG /></div>
                        <div className="dialog-heading pt-2">
                            <span >{this.props.message}</span>
                        </div>
                        <div className="gap-5 pt-2 d-flex justify-content-center">
                            <button
                                onClick={this.handleDelete}
                                className={this.state.isDisabled ? "btn button-style-disabled rounded-3" : "btn button-style rounded-3"}
                                disabled={this.state.isDisabled}
                            >
                                Yes
                            </button>
                            <button
                                onClick={this.props.handleClose}
                                className="btn cancel-button-style  border-2 rounded-3"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
