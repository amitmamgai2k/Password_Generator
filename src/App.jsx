import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setLength] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState();
  const [upperCaseAllowed,setUpperCaseAllowed] = useState();

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = '';
    if (numberAllowed) {
      str += '0123456789';
    }
    if (charactersAllowed) {
      str += ' !#$%&\'()*+,-./';
    }
    if (upperCaseAllowed){
      str+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if(lowerCaseAllowed){
      str+='abcdefghijklmnopqrstuvwxyz'
    }
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed,upperCaseAllowed,lowerCaseAllowed]);
 const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
   window.navigator.clipboard.writeText(password)
 },[password])
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charactersAllowed,upperCaseAllowed,lowerCaseAllowed,passwordGenerator])


  return (
    <>
   <div className='w-full max-w-md mx-auto py-10 shadow-md  px-10 my-40 border-solid border-2 border-gray-200 text-orange-600 bg-gray-800'>
    <h1 className='text-white text-center my-3 py-3 text-2xl font-mono'>Password Generator</h1>
    <div className='flex shadow  overflow-hidden '>
      <input type="text" value={password} onChange={passwordGenerator} min="6" max="100" className='outline-none w-full py-1 px-3 my-4 rounded-xl ' placeholder='Click on Generate button' readOnly ref={passwordRef}  
        />
    </div>
    <div className='flex gap-x-10 mt-0 '>
    <button className='outline-none hover:bg-blue-700 hover:font-bold bg-blue-500 rounded-lg  py-1 px-3 my-4  text-white' onClick={()=>{passwordGenerator()}}>Generate </button>
    <button className='outline-none hover:bg-blue-700 hover:font-bold bg-blue-500 rounded-lg  py-1 px-3 my-4  text-white' onClick={copyPasswordToClipboard}>Copy to Clipboard </button>
    </div>
    <div className='flex flex-col text-sm gap-y-2 '>
      <div className='flex items-center justify-between'>
        <label className='text-white text-semibold font-mono' htmlFor="">Password Length:</label>
        <input type="text" placeholder='0' min={6} max={100} value = {length} className=' border-solid border-white border-[1px] rounded-sm text-white  font-semibold font-mono w-10 bg-transparent' onChange={(e)=>{
          setLength(e.target.value)
        }} />
        
      </div>
      <div className='flex items-center justify-between'>
        <label htmlFor="numberInput" className='text-white text-semibold font-mono'> Included Numbers:</label>
        <input type="checkbox" defaultChecked={numberAllowed}   id="numberInput" onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }}/>
      </div>
      <div className='flex items-center justify-between'>
        <label className='text-white text-semibold font-mono'>Included Characters:</label>
        <input type="checkbox" defaultChecked={numberAllowed}    onChange={()=>{
          setCharacterAllowed((prev)=>!prev);
        }}/>
      </div>
      <div className='flex items-center justify-between'>
        <label className='text-white text-semibold font-mono'>Include uppercase letters:</label>
        <input type="checkbox" defaultChecked={numberAllowed}    onChange={()=>{
          setUpperCaseAllowed((prev)=>!prev);
        }}/>
      </div>
      <div className='flex items-center justify-between'>
        <label className='text-white text-semibold font-mono'>Include lowercase letters:</label>
        <input type="checkbox" defaultChecked={numberAllowed}    onChange={()=>{
          setLowerCaseAllowed((prev)=>!prev);
        }}/>
      </div>
    </div>
   </div>
    </>
  )
}


export default App
