import "./label.css";

const Label = ({ children, title, htmlFor = "" }) => {
  return (
    <div className="input" htmlFor={htmlFor}>
      <label className="input__label">{title}</label>
      {children}
    </div>
  );
};

export default Label;
