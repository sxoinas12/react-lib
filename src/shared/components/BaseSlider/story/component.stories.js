import React from 'react';
import { storiesOf } from '@storybook/react';
import BaseSlider from '../component';
import styles from './styles.module.css'

storiesOf('Slider', module)
  .add('Base Slider', () => 
    <BaseSlider
    containerClassName={styles.container} >
      <BaseSlider.Item
        tabHeader={<div>tab 1</div>}
      >
         <div>body of child 1</div>
      </BaseSlider.Item>
      <BaseSlider.Item
        tabHeader={<div>tab 2</div>}
      >
        <div>body of child 2</div>
      </BaseSlider.Item>
    </BaseSlider>
      )