import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(7)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
const [inputpass, setInputpass] = useState("")
const [isClicked, setIsClicked] = useState(false);
const passref = useRef(null)

const copytoClipboard = useCallback(()=>{
  passref.current?.select(); // question mark tbhi lagaya ha k kahin kabhi koi value b ho skti is liye optionaly use kiya agar value ha to copy kr lo
  passref.current?.setSelectionRange(0,20);
window.navigator.clipboard.writeText(inputpass)
setIsClicked(true) // onclick p true hojye ga kiun k jab click hoga to copied hojyga or green colour hijyga 
}, [inputpass])



const passwordGenerator = useCallback(()=>{
  let pass = ""
let strng = "ASDFDGFHGJFSDGHJETRYUweryuidfghxcvbnmmnbvcxjhgfd"

if (number) strng += "0123456789"
if (character) strng += "!@#$%^^&&*)(&{}%#!~`"

for (let i = 0; i<=length; i++) {
  let charac = Math.floor(Math.random() *strng.length + 1)  
  pass +=  strng.charAt(charac) // pass k agey k+ ni lagaoge tooverwrite krega ab ye concatinate hogya ha ab ye append krega values ko
}
setInputpass(pass)

}, [length, number, character, setInputpass]) // yahan p ham optimize kr rhe hain agar setinput ki jaghajust inputpas  denge to infinite ma chla jyga 

useEffect(()=>{
  passwordGenerator()
}, [length, number, character, passwordGenerator]) // yahan p ham bat kr rhe hain k agar in p koi b chair chaar yakoi issue ho doabra se run kr do

  return (
    <>
    <h1 className='text-teal-500 text-center text-5xl cursor-pointer bg-lime-400 max-w-md mx-auto rounded-lg px-3 py-2 font-serif '> Real Project of Password Generator</h1>
    <div className='max-w-md mt-32 bg-slate-700 text-white shadow-lg px-4 py-5 rounded-2xl text-center mx-auto'>
      <h1>Password Generator</h1>
      <div className='flex shadow rounded-xl overflow-hidden mb-4'>
        <input type="text"
        value={inputpass}
        className='outline-none py-2 px-3 w-full text-blue-700'
        placeholder='password'
        ref={passref}
        />
        <button onClick={ copytoClipboard}  id='shazishiza' className={`bg-blue-700 ${isClicked ? 'bg-green-500' : 'bg-blue-700'} text-white px-2 shrink-0 py-1`}>{isClicked? 'Copied!' : 'Copy'}</button>
       
      </div>
      
      <div className='flex item-sm gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          
          />
          <label className='text-orange-500'>length: {length} </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked= {number}
          id='numbercheck'
           onChange={()=>{
            setNumber((prev) => !prev)
           }}
          />
       <label  className = 'text-orange-500' htmlFor="numbercheck">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked= {character}
          id='charactercheck'
           onChange={()=>{
            setCharacter((prev) => !prev)
           }}
          />
          <label className='text-orange-500'  htmlFor="charactercheck">Characters</label>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
