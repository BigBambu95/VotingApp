import React, { 
    useState, useEffect, useRef,
    Fragment, Children, cloneElement 
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import SvgIcon from '../svg-icon';
import ArrowIcon from '../../icons/arrow.svg';


const Select = ({
    className, children, defaultValue,
    setValue
}) => {

    const container = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    
    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);

        return function cleanup() {
            window.removeEventListener('click', onClickOutsideHandler);
        }
    });

    function onClickOutsideHandler(e) {
        if(isOpen && !container.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    const classes = classnames(
        'select',
        className,
        { 'visibility': isOpen }
    );

    const selectList = isOpen && (
        <div className="select__list">
            { Children.map(children, child => cloneElement(child, { setActiveItem, setIsOpen, setValue })) }
        </div>
    );

    return(
        <Fragment>
            <div className={classes} ref={container}>
                <div className="select__input" onClick={() => setIsOpen(!isOpen)}>
                    <span>{activeItem || defaultValue}</span>
                    <SvgIcon className="arrow-icon" Component={ArrowIcon} viewBox="0 0 24 24" width="20" height="20" />
                </div>
                {selectList}
                <input type="hidden" value={activeItem} />
            </div>
        </Fragment>
    )
}

Select.propTypes = {
    children: PropTypes.array,
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    setValue: PropTypes.func
}

Select.defaultProps = {
    children: null,
    className: '',
    defaultValue: 'Выберите',
    setValue: () => {}
}



export default Select;