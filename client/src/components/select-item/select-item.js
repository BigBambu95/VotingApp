import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const SelectItem = ({
    children, className, value,
    setActiveItem, setIsOpen,
    setValue, disabled
}) => {

    const onClickAction = () => {
        setActiveItem(value);
        setValue(value);
        setIsOpen(false);
    }

    const classes = classnames(
        'select-item',
        className,
        { disabled }
    );

    if(!value) {
        value = children;
    }

    return(
        <div className={classes} onClick={onClickAction}>
            {children}
        </div>
    )
}

SelectItem.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    setActiveItem: PropTypes.func,
    setisOpen: PropTypes.func,
    setValue: PropTypes.func
}

SelectItem.defaultProps = {
    children: '',
    className: '',
    disabled: false,
    setActiveItem: () => {},
    setIsOpen: () => {},
    setValue: () => {}
}

export default SelectItem;