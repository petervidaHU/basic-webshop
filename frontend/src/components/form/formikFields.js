import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import { Box, } from 'rebass/styled-components';
import { Label, Input } from '@rebass/forms/styled-components'

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    
    return (
        <Box>
            <Label color={['error']} htmlFor={props.name}>{label}</Label>
            <Input width={[1,,,1/2]} className="text-input" {...field} {...props} 
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </Box>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyRadio = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <Label color={['error']} htmlFor={props.name}>{label}</Label>
            <input type="radio" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </Box>
    );
};


const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
  }) => {
    return (
      <div>
        <input
          name={name}
          id={id}
          type="radio"
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames('radio-button')}
          {...props}
        />
        <label htmlFor={id}>
          {label}
        </label>
      </div>
    );
  };


export {
    MySelect,
    MyCheckbox,
    MyTextInput,
    MyRadio
};