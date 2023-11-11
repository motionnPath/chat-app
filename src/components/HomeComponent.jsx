import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { Link} from 'react-router-dom';

const HomeComponent = () => {

  
  const [lisaStyle, setLisaStyle] = useState({
    gridColumn:"1/2",
    transform:"scale(1)",
    opacity:"0.9"
    
  })
  const [berlinStyle, setBerlinStyle] = useState({
    gridColumn:"2/3",
    transform:"scale(1)",
    opacity:"0.8"
    
  })
  const [catiaStyle, setCatiaStyle] = useState({
    gridColumn:"3/4",
    transform:"scale(1)",
    opacity:"1"
    
  })
  const [index, setIndex] = useState(0)

  

  useEffect(()=> {
    const values = [
      {
        gridColumn:"1/2",
        transform:"scale(0.8)",
        opacity:"0.4"
        
      },
      {
        gridColumn:"2/3",
        transform:"scale(1.2)",
        opacity:"1"
        
      },
      {
        gridColumn:"3/4",
        transform:"scale(0.8)",
        opacity:"0.6"
      },
    ];
    
    setTimeout(()=>{
      setIndex((index + 1) % values.length)
      setLisaStyle(values[index])
      setBerlinStyle(values[index + 1])
      setCatiaStyle(values[index - 1 ])
    },4000)
  })


  
  return (
    <>
        <div className="home-component-container">
            <header className="home-component-header">
                <p id='home-component-header-app-name'>ChatCat</p>
                <p id="home-component-header-right-container">
                  <Link to={'/signup'}>sign Up</Link>
                  <Link to={'/signin'}>sign In</Link>
                </p>
            </header>
            <div className="home-component-body">
              <h4>Start Connecting with People & making new Friends</h4>
              
              <div className="smart-phone-creen">
                <div id="message-one-emulator">
                  <p id='sender-info'>Sam</p>
                  <p id='sender-msg'>Hi there ! how is it going?</p>
                </div>
                <div id="message-two-emulator">
                  <p id='sender-info'>Kati</p>
                  <p id='sender-msg'>
                    Doing great ❤️ Any Plans for 
                    the Weekend ?
                  </p>
                </div>
                <div id="message-one-emulator">
                  <p id='sender-info'>Sam</p>
                  <p id='sender-msg'>Let's celebrate the new ChatCat 🎉🎉🎉 </p>
                </div>
              </div>
              <section>
                <div className="reviews">
                  <div id={"Lisa"} style={lisaStyle}>
                    <h4 id='review-statement-username'>Lisa</h4> <br />
                    <h6 id='review-statement-body'>It's a great way to meet new people and make new Friends</h6>
                  </div> 
                  <div id={"Berlin"} style={berlinStyle}>
                    <h4 id='review-statement-username'>Berlin 🎉🎉🎉</h4> <br />
                    <h6 id='review-statement-body'>It's a great way to meet new people and make new Friends</h6>
                  </div> 
                  <div id={"Catia"} style={catiaStyle}>
                    <h4 id='review-statement-username'> ❤️Catia❤️</h4> <br />
                    <h6 id='review-statement-body'>Nice App! easy to navigate and use I love it </h6>
                  </div> 
                </div>
              </section>
                  

            </div>
            <footer className="home-component-footer">
                <p>All rights Reserved &copy; {(new Date()).getFullYear()}</p>
            </footer>
        </div>
    </>
  )
}

export default HomeComponent