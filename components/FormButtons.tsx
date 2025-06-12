interface IFormButtons {
  onClose: () => void;
  isDisabled: boolean;
  isSubmitting: boolean;
}

export const FormButtons = ({
  onClose,
  isDisabled,
  isSubmitting,
}: IFormButtons) => {
  return (
    <div className="form-buttons-wrapper">
      <button type="button" onClick={onClose} className="form-button-cancel">
        Cancel
      </button>
      <button
        type="submit"
        disabled={isDisabled}
        className="form-button-submit"
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};
