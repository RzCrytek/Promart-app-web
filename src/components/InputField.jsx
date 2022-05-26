import React from 'react';

const InputField = (props) => {
  const { label, type = 'text', name, value, onChange } = props;

  return (
    <div className="field">
      <label className="label">{label}</label>

      <div className="control">
        <input
          {...props}
          className="input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default InputField;
