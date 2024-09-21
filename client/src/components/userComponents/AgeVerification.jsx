import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './AgeVerificationModal.css';

const AgeVerificationModal = ({ show, onClose }) => {
    const [isAdult, setIsAdult] = useState(null);

    const handleConfirmation = () => {
        setIsAdult(true);
        localStorage.setItem('hasVerifiedAge', 'true');
        onClose();
    };

    const handleRejection = () => {
        setIsAdult(false);
        localStorage.setItem('hasVerifiedAge', 'false');
        window.close();
    };

    return (
        <Modal
            show={show}
            onHide={handleRejection}
            backdrop="static"
            keyboard={false}
            centered
            className="age-verification-modal"
        >
            <div className="age-verification-overlay" />
            <Modal.Dialog className="age-verification-dialog">
                <Modal.Header closeButton>
                    <Modal.Title>Age Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isAdult === false ? (
                        <div className="modal-content-rejected">
                            <p>You must be at least 18 years old to enter this site.</p>
                        </div>
                    ) : (
                        <div className="modal-content-default">
                            <p>Are you at least 18 years old?</p>
                            <Button variant="outline-danger" onClick={handleRejection}>
                                No
                            </Button>
                            <Button variant="outline-success" onClick={handleConfirmation}>
                                Yes
                            </Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    );
};

export default AgeVerificationModal;
