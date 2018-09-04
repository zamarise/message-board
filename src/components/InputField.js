import React from 'react';

function isVowel(char) {
  return /^[aeiou]$/.test(char.toLowerCase());
}
const InputField = props => {
  return (
    <div className="form-group row">
      <label htmlFor={props.id} className="col-sm-4 col-md-2 col-lg-2 col-form-label">
        {props.label}
      </label>
      <div className="col-sm-8 col-md-10 col-lg-10">
        <input
          onChange={props.inputAction}
          type={props.type}
          id={props.id}
          className="form-control"
          placeholder={`Please enter ${isVowel(props.label[0]) ? 'an' : 'a'} ${props.label}`}
          style={props.style}
        />
      </div>
    </div>
  );
};

export default InputField;
