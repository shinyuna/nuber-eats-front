interface ModalBackgroundProps {
  children: React.ReactNode;
  modalSize?: string;
  onClose?: () => void;
}

const ModalBackground = ({ children, modalSize = 'max-w-md', onClose }: ModalBackgroundProps) => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div className={`w-full bg-white sm:absolute sm:bottom-0 rounded-md ${modalSize}`} onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};

export default ModalBackground;
