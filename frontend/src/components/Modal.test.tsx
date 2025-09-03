import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

const modalHeadingValue = 'foo bar';
const onSuccessMock = jest.fn();
const onCloseMock = jest.fn();

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

test('shows heading and content', async () => {
  render(
    <Modal
      modalHeading={modalHeadingValue}
      ModalContent={ModalContent}
      onSuccess={onSuccessMock}
      onClose={onCloseMock}
    />
  );

  expect(screen.getByRole('heading')).toHaveTextContent(modalHeadingValue);
  expect(screen.getByTestId('modal-content')).toBeInTheDocument();
});

test('passes callback functions to modal content component', async () => {
  render(
    <Modal
      modalHeading={modalHeadingValue}
      ModalContent={ModalContent}
      onSuccess={onSuccessMock}
      onClose={onCloseMock}
    />
  );

  fireEvent.click(screen.getByTestId('success-button'));
  expect(onSuccessMock).toHaveBeenCalled();
  fireEvent.click(screen.getByTestId('close-button'));
  expect(onCloseMock).toHaveBeenCalled();
});
