import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

type ModalContentProps = {
  onSuccess: () => void;
  onClose: () => void;
}

const ModalContent = ({ onSuccess, onClose }: ModalContentProps) => {
  return (
    <div data-testid="modal-content">
      <button data-testid="success-button" onClick={onSuccess} />
      <button data-testid="close-button" onClick={onClose} />
    </div>
  )
}

test('shows a heading', async () => {
  const modalHeadingValue = 'foo bar';
  const onSuccess = jest.fn();
  const onClose = jest.fn();
  render(
    <Modal
      modalHeading={modalHeadingValue}
      ModalContent={ModalContent}
      onSuccess={onSuccess}
      onClose={onClose}
    />
  );

  expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  expect(screen.getByRole('heading')).toHaveTextContent(modalHeadingValue);
  fireEvent.click(screen.getByTestId('success-button'));
  expect(onSuccess).toHaveBeenCalled();
  fireEvent.click(screen.getByTestId('close-button'));
  expect(onClose).toHaveBeenCalled();
});
