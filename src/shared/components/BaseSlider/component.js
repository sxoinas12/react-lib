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
    const [show, setRender] = useState(false);
    const [currentIndex, setCurrentIndex] = useState()
   
    
    const onSelect = useCallback((index, internalChildren) => {
      setRender(true)
      const some = {
        index,
        body: internalChildren,
      }
       setCurrentIndex(some)
       
    }, [setCurrentIndex])

    const [currentTab, setCurrentTab] = useState(initialState)
    const afterSelect = useCallback((index, internalChildren) =>{
        if (index === -1) {
            setCurrentTab(initialState)
            
        } else {
            setCurrentTab({ index, body: 
            <React.Fragment>
              <MainHeader index={index} onClick={onSelect} />
              {internalChildren}
            </React.Fragment> })
        }
        })

    const onAnimationEnd = useCallback(() => {
      setRender(false);
      return afterSelect(currentIndex.index, currentIndex.body)
    },[currentIndex]);

    const setAnimation = useMemo(() => {
      if (currentTab.index === -1) {
        return styles.prevTab
      } 
      return styles.nextTab
    }, [currentTab])

    const getProps = useCallback(() => ({
        onSelect,
        setAnimation,
    }))

    const render = useMemo(() => {
        return isFunction(currentTab.body) ? currentTab.body(getProps) :
        React.Children.map(currentTab.body, (item, index) =>{ 
          return React.cloneElement(item, { ...getProps(), index})
        })
         
    }, [currentTab])
    
    return (
        <div className={classnames(styles.container,containerClassName)}>
          <div 
            className={classnames(show ? setAnimation : '',styles.content)}
            onAnimationEnd={onAnimationEnd}>
          {render}
          </div>
        </div>
    )
}

BaseSlider.Item = SliderItem


const MainHeader = ({ onClick, index }) => {
  return (
  index > -1 ? (
    <div className={styles.backIcon} onClick={() => onClick(-1)}><img src={backIcon} alt="back" /></div>
  ) : (null)
    )
  }
BaseSlider.propTypes = {
    containerClassName: PropTypes.string,
    children: PropTypes.any,
}

export default BaseSlider
