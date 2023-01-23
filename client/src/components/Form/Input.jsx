import "./input.css";

const Input = ({ ...props }) => {
  return (
    <input
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      className="input__controll"
    />
  );
};

export default Input;
