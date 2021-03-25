interface IButtonProps {
  isLoading: boolean;
  isValid: boolean;
  actionText: string;
}

export const FormButton: React.FC<IButtonProps> = ({ isLoading, isValid, actionText }) => (
  <button
    className={`p-3 mt-4 text-white focus:outline-none transition-colors cursor-pointer ${
      isValid ? 'bg-uber hover:bg-uber-dark' : 'bg-gray-200 pointer-events-none'
    }`}
  >
    {isLoading ? 'Loading...' : actionText}
  </button>
);
