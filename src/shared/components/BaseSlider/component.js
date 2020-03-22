import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import classnames from 'classnames'
import { isFunction } from '../../helpers/types'
import  SliderItem from './components/SliderItem'
import backIcon from '../../assets/back.svg'


const BaseSlider = ({ containerClassName, children }) => {
    
    const initialState = {
        index: -1,
        body: children,
    }

    const [show, setRender] = useState(true);
    const onAnimationEnd = () => {
        setRender(false);
      };

    const [currentTab, setCurrentTab] = useState(initialState)

    const onSelect = useCallback((index, internalChildren) =>{
        if (index === -1) {
            setCurrentTab(initialState)
            setRender(true)
        } else {
            setCurrentTab({ index, body: internalChildren})
            setRender(true)
        }
        })

    const getProps = useCallback(() => ({
        onSelect,
    }))

    const render = useMemo((index) => {
        return isFunction(currentTab.body) ? currentTab.body(getProps) :
        React.Children.map(currentTab.body, (item, index) => React.cloneElement(item,{ ...getProps(), index}))
         
    }, [currentTab])
    
    const mainHeader = currentTab.index > -1  ? <div className={styles.backIcon} onClick={() => onSelect(-1)}><img src={backIcon} alt="back" /></div> : null


    return (
        <div className={classnames(styles.container,containerClassName)}>
            <div>{mainHeader}</div>
            <div 
            className={ show ? styles.animation : '' }
            onAnimationEnd={onAnimationEnd}>
                {render}
            </div>
        </div>
    )
}

BaseSlider.Item = SliderItem


BaseSlider.propTypes = {
    containerClassName: PropTypes.string,
    children: PropTypes.any,
}

export default BaseSlider