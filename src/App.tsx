import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { NavbarPage } from './components/stateful/Navbar'
import { LandingPage } from './pages/LandingPage'
import { PlannedDates } from './pages/PlannedDates'
import { Wishlist } from './pages/Wishlist'
import { Posts } from './pages/Posts'
// import { create } from 'ipfs-http-client'
// import { useLocalStorage } from './hooks/useLocalStorage'

// color={color}
          // onChangeHandler={onChangeHandler}

type styleObjType = {
  background: string 
}
// will have to put ipfs globally later but for now I will have to put the client locally in the file.

// const client = create();
        

function App() {  
  const [color, setColor] = useState<string | (null) >(localStorage.getItem('color'))

  function onChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    setColor(e.currentTarget.value)
    localStorage.setItem('color', e.currentTarget.value)
  }

  const styleObj: styleObjType = {
    background: color 
  }

  // useEffect


  return (
    <>
    <NavbarPage
    color={color}
            onChangeHandler={onChangeHandler}
            styleObj={styleObj}
    />
    <div 
    // className='container'
    style={styleObj}>

      <Container className='mb-4'>
        <Routes>
      
          <Route path='/' element={<LandingPage
            color={color}
            onChangeHandler={onChangeHandler}
            styleObj={styleObj}
            // client={client}
          />} />
          <Route path='/dates' element={<PlannedDates />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/posts' element={<Posts />} />


        </Routes>
      </Container>


    </div>
    </>
  )
}

export default App
