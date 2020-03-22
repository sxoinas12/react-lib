import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const SliderItem  = ({ children, onSelect, index, tabHeader }) => {

    const select = useCallback(() => onSelect(index, children))

    return ( 
        <div className={styles.container} onClick={select}>
            {tabHeader}
        </div>
    )
}


SliderItem.propTypes = {
    children: PropTypes.any,
    handleChange: PropTypes.func,
    index: PropTypes.number,
}

export default SliderItem
