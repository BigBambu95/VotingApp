import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SvgIcon = ({ 
    Component, width, height, viewBox, fill, className 
}) => {

    const classes = classnames(
        'svg-icon',
        className
    );

    return(
        <React.Fragment>
            <Component 
                className={classes}
                width={width} 
                height={height}
                viewBox={viewBox}
                fill={fill}
            />
        </React.Fragment>
    )
}

SvgIcon.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string,
    fill: PropTypes.string
}

SvgIcon.defaultProps = {
    width: '32',
    height: '32',
    viewBox: '0 0 512 512',
    fill: null
}

export default SvgIcon;