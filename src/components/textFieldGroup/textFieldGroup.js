import React from 'react';

const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists, labelStyle, inputStyle, layout }) => {
    return (
        <div style={layout}>
            {/* <label style={labelStyle}>{label}</label> */}
            <input 
                onChange={onChange}
                placeholder={label}
                value={value}
                type={type}
                name={field}
                style={inputStyle}
            />
            {/* {error && <span>{error}</span>} */}
        </div>
    );
};


// onBlur={checkUserExists}

export default TextFieldGroup;