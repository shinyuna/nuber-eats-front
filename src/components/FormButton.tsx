interface IButtonProps {
  isLoading: boolean;
  isValid: boolean;
  actionText: string;
  onClick?: () => void;
}

export const FormButton: React.FC<IButtonProps> = ({ isLoading, isValid, actionText, onClick }) => (
  <button
    className={`button mt-4 ${isValid ? 'bg-uber hover:bg-uber-dark' : 'bg-gray-200 pointer-events-none'}`}
    onClick={onClick}
  >
    {isLoading ? 'Loading...' : actionText}
  </button>
);
