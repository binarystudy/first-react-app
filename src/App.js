import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
function App() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  const imageRef = useRef()
  const textInputRef = useRef()
  const fileInputRef = useRef()
  const loadModel = async () => {
    setIsModelLoading(true)
    try {
        const model = await mobilenet.load()
        setModel(model)
        setIsModelLoading(false)
    } catch (error) {
        console.log(error)
        setIsModelLoading(false)
    }
  }

  const uploadImage = (e) => {
    const { files } = e.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        setImageURL(url)
    } else {
        setImageURL(null)
    }
  }
  useEffect(() => {
        loadModel()
    }, [])
  // if (isModelLoading) {
  //     return <h2>Model Loading...</h2>
  // }
  
  return (
    <div className="App">
      <h1>Image Recognition React App</h1>
        <div className='inputHolder'>
          <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
        </div>
    </div>
  );
}

export default App;
