import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { NavbarPage } from './components/stateful/Navbar'
import { LandingPage } from './pages/LandingPage'
import { PlannedDates } from './pages/PlannedDates'
import { Wishlist } from './pages/Wishlist'
import { Posts } from './pages/Posts'
import PolygonABI from './abi/PolygonDecentragram.json'
import { ethers } from 'ethers'
// import { create } from 'ipfs-http-client'
// import { useLocalStorage } from './hooks/useLocalStorage'
import {create} from 'ipfs-http-client'
// const ipfsClient = require('ipfs-http-client')
import { Buffer } from 'buffer'

globalThis.Buffer = Buffer
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

const projectId = '2K6YLgEl83aMaYLtTeuaRYDryk1';   // <---------- your Infura Project ID

const projectSecret = '109b19ae4445d41a41c433154449d9b2';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

//0x13CB06d41926Ce3d41265dE996C398D6db0F21f7 contract address
const CONTRACT_ADDRESS = '0x13CB06d41926Ce3d41265dE996C398D6db0F21f7'

const {ethereum} = window;
// color={color}
          // onChangeHandler={onChangeHandler}

type styleObjType = {
  background: string | null | undefined
}
// will have to put ipfs globally later but for now I will have to put the client locally in the file.

const client = create();
        

function App() {  
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [buffer, setBuffer] = useState()
  const [imageCount, setImageCount] = useState(0)

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const transactionContract = new ethers.Contract(CONTRACT_ADDRESS, PolygonABI, signer )
  console.log(transactionContract)

  const [color, setColor] = useState<string | (null) >()
  //localStorage.getItem('color')
  const [currentAccount, setCurrentAccount] = useState('') 

  useEffect(() => {
    console.log(window)
    const connectWallet = async () => {
      try{
        if(!ethereum) return alert('Please install metamask accounts')
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        setCurrentAccount(accounts[0])
      } catch(e) {
        console.log(e)
      }      
    }
    connectWallet()
      loadBlockchainData();

  }, [])
  

  function onChangeHandler(e: React.FormEvent<HTMLButtonElement>): void {
    setColor(e.currentTarget.value)
    // localStorage.setItem('color', e.currentTarget.value)
  }

  const styleObj: styleObjType = {
    background: color 
  }

  // useEffect


  function captureFile(e: React.FormEvent<HTMLInputElement>) : void {
    e.preventDefault()
    const file = e.target.files[0]
    // console.log(file)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      // console.log(Buffer(reader.result))
      setBuffer(Buffer(reader.result))
    }
    
  }
  
  async function uploadImage(description: string ) {
    console.log('Submitting file to ipfs')
    
    // console.log('buffer', buffer)
    const {cid} = await ipfs.add(buffer)
    // console.log(cid)

    setLoading(true)
    transactionContract.uploadImage(cid._baseCache.get('z'), description).send({from: currentAccount}).on('transactionHash', (hash) => {
      setLoading(false)
    })

  }

  async function loadBlockchainData() : Promise<void> {
    setLoading(true)
    const imagesCount = await transactionContract.imageCount()
    // console.log(imagesCount.toNumber())
    setImageCount(imagesCount.toNumber()) // this is a _hexadecimal we have to conver tot number

    for (let i= 1; i<= imageCount; i++) {
      const image = await transactionContract.images(i)
      setImages(imag => [...imag, image])
      console.log(image)
      // could sort later

    }
    
    setLoading(false)
    // return images

  }

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
            currentAccount={currentAccount}
            color={color}
            onChangeHandler={onChangeHandler}
            styleObj={styleObj}
            // client={client}
            captureFile={captureFile}
            uploadImage={uploadImage}
            images={images}
            // loadBlockchainData={loadBlockchainData}
          />} />
          <Route path='/dates' element={<PlannedDates />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/posts' element={<Posts 
          
          images={images}
          />}
            
            //  loadBlockchainData={loadBlockchainData}
          
          />


        </Routes>
      </Container>


    </div>
    </>
  )
}

export default App
