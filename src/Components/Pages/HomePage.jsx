import React from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from './../CategorySlider/CategorySlider';
import Categories from '../Categories/Categories';


export default function HomePage() {
  return (
    <div className='mt-5 container-fluid'>
        <MainSlider/>
        <CategorySlider/>
        <Categories/>
    </div>
  )
}
