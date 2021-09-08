import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { FormError } from './FormError';
import { FormButton } from './FormButton';

interface StepFormControlProps {
  step: number;
  lastStep: number;
  error: string;
  loading?: boolean;
  actionTitle: string;
  prevStep: () => void;
  nextStep: () => void;
  onAction: () => void;
}

function StepFormControl({
  step,
  lastStep,
  error,
  loading,
  actionTitle,
  prevStep,
  nextStep,
  onAction,
}: StepFormControlProps) {
  return (
    <div className="mt-10 text-right">
      {error && <FormError errMsg={error} />}
      {step > 1 && (
        <button className="p-4 mr-4 text-lime-500" onClick={prevStep}>
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          이전
        </button>
      )}
      {step < lastStep && (
        <button className="button" onClick={nextStep}>
          다음
        </button>
      )}
      {step === lastStep && (
        <FormButton actionText={actionTitle} isLoading={loading || false} isValid={true} onClick={onAction} />
      )}
    </div>
  );
}

export default StepFormControl;
