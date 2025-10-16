import { useState } from 'react'
import './App.css'
import Hero from './components/Hero';
import Experience from './components/Experience';
import Coffee from './components/Coffee';
import Store from './components/Store';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import Logo from './components/Logo';
import Envelope from './components/Envelope';
import AmenitiesSection from "./components/AmenitiesSection";
import KairaGallery from './components/KairaGallery';

function App() {

  return (
    <>
      <Hero/>
      <Logo />
      <Experience/>
      <AmenitiesSection />
      <Coffee />
      <Store />
      <KairaGallery />
      <Envelope />
      <GetInTouch />
      <Footer />
    </>
  )
}

export default App
