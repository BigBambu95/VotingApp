import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SvgIcon from '../svg-icon';
import Loader from '../loader';

const Button = ({ 
    children, onClick, className, 
    variant, size, active, 
    disabled, rounded, icon,
    loading, ...attrs 
}) => {

    const onClickAction = (e) => {
        if(disabled) {
            e.preventDefault();
        } else {
            return onClick(e);
        }
    }

    const classes = classnames(
        'btn',
        className,
        variant,
        size,
        { active },
        { disabled },
        { rounded },
        { loading }
    );

    const Tag = attrs.href ? 'a' : 'button';
    const renderIcon = icon && <span className="btn__icon"><SvgIcon Component={icon} width="100%" height="100%" viewBox="0 0 24 24" /></span>;
    const label = !loading && <span>{children}</span>;
    const loader = loading && <div className="btn__spinner"></div>;

    return (
        <Tag 
            {...attrs}
            className={classes} 
            onClick={onClickAction}
            disabled={disabled}
        >
            {renderIcon}
            {loader}
            {label}
        </Tag>
    )
};


Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    icon: PropTypes.func,
    loading: PropTypes.bool
}

Button.defaultProps = {
    children: 'Button',
    onClick: () => {},
    className: '',
    variant: 'text',
    size: '',
    active: false,
    disabled: false,
    rounded: false,
    icon: null,
    loading: false
}

export default Button;