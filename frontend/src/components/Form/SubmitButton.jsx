import "./submitButton.css";

const SubmitButton = ({ onClick, title, ...props }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn__submit"
      {...props}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
