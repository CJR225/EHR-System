import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control mb-2 mt-1" />
      {error && <div className="alert alert-danger" style={{fontSize: 14, padding: 10}}>{error}</div>}
    </div>
  );
};

export default Input;
