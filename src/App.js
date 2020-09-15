import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header/Header';
import Task from './task/Task';
import Footer from './footer/footer';

function App() {
  return (
    <div className="App">
     {/* <Header/> */}
     <Task/>
     <Footer/>
    </div>
  );
}

export default App;
