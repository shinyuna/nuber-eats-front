interface IButtonProps {
  isLoading: boolean;
  isValid: boolean;
  actionText: string;
}

export const FormButton: React.FC<IButtonProps> = ({ isLoading, isValid, actionText }) => (
  <button className={`button mt-4 ${isValid ? 'bg-uber hover:bg-uber-dark' : 'bg-gray-200 pointer-events-none'}`}>
    {isLoading ? 'Loading...' : actionText}
  </button>
);
