import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
 const [length,setLength] = useState(8)
 const [numberAllowed,setNumberAllowed] = useState(false);
 const [charactersAllowed, setCharacterAllowed] = useState(false);
 const [ password,setPassword] = useState("")
//  useRef Hook
const passwordRef = useRef(null)

 const passwordGenerator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed){
    str+="0123456789"
  }
  if(charactersAllowed){
    str+=" !#$%&'()*+,-./"
  }
  for (let i = 1; i <= length; i++) {
     let char =Math.floor(Math.random()*str.length+1)
     pass += str.charAt(char)
    
  }
  setPassword(pass)

 },[length,numberAllowed,charactersAllowed,setPassword])
 const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
   window.navigator.clipboard.writeText(password)
 },[password])
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charactersAllowed,passwordGenerator])
 

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-800'>
    <h1 className='text-white text-center my-3 py-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} className='outline-none w-full py-1 px-3 my-4 rounded-xl ' placeholder='password' readOnly ref={passwordRef}/>
      <button className='outline-none hover:bg-blue-700 hover:font-bold bg-blue-500 rounded-lg  py-1 px-3 my-4  text-white' onClick={copyPasswordToClipboard}>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2 '>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={100} value = {length} className='cursor-pointer' onChange={(e)=>{
          setLength(e.target.value)
        }} /> <label htmlFor="">Length:{length}</label>
        
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numberAllowed}   id="numberInput" onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }}/>
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numberAllowed}    onChange={()=>{
          setCharacterAllowed((prev)=>!prev);
        }}/>
        <label>Characters</label>
      </div>
    </div>
   </div>
    </>
  )
}

export default App
