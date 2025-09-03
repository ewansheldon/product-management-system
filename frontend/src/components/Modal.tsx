type ModalProps = {
  modalHeading: string;
  ModalContent: React.ComponentType<{onClose: () => void, onSuccess: () => void}>;
  onClose: () => void;
  onSuccess: () => void;
};

const Modal = ({ modalHeading, ModalContent, onClose, onSuccess }: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" role="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" aria-modal="true" role="dialog">
        <h2>{modalHeading}</h2>
        <ModalContent onClose={onClose} onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default Modal;
