import React, { useCallback, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import classnames from 'classnames'

const SliderItem  = ({children, onSelect, index, tabHeader }) => {

  const select = useCallback(() => onSelect(index, children))
    return ( 
        <div>
            <div onClick={select}>{tabHeader}</div>
        </div>
    )
}


SliderItem.propTypes = {
    children: PropTypes.any,
    handleChange: PropTypes.func,
    index: PropTypes.number,
}

export default SliderItem
