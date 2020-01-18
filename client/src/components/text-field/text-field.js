import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const TextField = ({
    className, name, type, 
    label, size, autoComplete,
    value, disabled, onChange,
    required, ...attrs
}) => {

    const [filled, setFilled] = useState(false);

    useEffect(() => {
        if(value && value != '') {
            setFilled(true);
        }
    });

    const classes = classnames(
        'text-field',
        className,
        size,
        { filled }
    )

    const handleChange = (e) => {
        if(e.target.value != '') {
            setFilled(true);
        } else {
            setFilled(false);
        }

        return onChange(e);
    }

    return(
        <div className={classes}>
            <input
                type={type}
                className="text-field__input"
                name={name}
                required={required}
                value={value}
                autoComplete={autoComplete}
                onChange={(e) => handleChange(e)}
                disabled={disabled}
                {...attrs}
            />
            <label className="text-field__label">{label}</label>          
        </div>
    )
}


TextField.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password']),
    size: PropTypes.oneOf(['small', 'normal']),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    autoComplete: PropTypes.oneOf(['on', 'off']),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func
}

TextField.defaultProps = {
    name: '',
    className: '',
    type: 'text',
    label: 'text field',
    size: 'normal',
    autoComplete: 'off',
    disabled: false,
    required: false,
    onChange: () => {}
}


export default TextField;