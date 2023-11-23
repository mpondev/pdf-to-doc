import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Header from './components/Header';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let BASE_URL;
if (import.meta.env.MODE === 'development') {
  BASE_URL = import.meta.env.VITE_BASE_URL;
} else if (import.meta.env.MODE === 'production') {
  BASE_URL = import.meta.env.VITE_API_URL;
}

function App() {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  // Handler for file selection through File API
  const handleSelect = evt => {
    setFile(evt.target.files[0]);
  };

  // Handler for submit the selected pdf file and get its extracted text as the response
  const handleSubmit = async () => {
    // Check if a file has been selected
    if (!file) {
      toast.error('You must select a file');
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append('pdf', file);

      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: formdata,
      });

      if (!response.ok) {
        toast.error('File upload failed');
        throw new Error('File upload failed');
      }

      const textResponse = await response.text();
      setPdfText(textResponse);

      toast.success('Text extracted successfully');

      // Clear file input and reset state
      document.getElementById('fileInput').value = null;
      setFile(null);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleReset = () => {
    setPdfText('');
  };

  return (
    <>
      <Header />

      <p>Convert PDF to text in an easy and safe way</p>

      <div className="head">
        <input
          type="file"
          accept="application/pdf" // file types the input should accept
          id="fileInput"
          className="input"
          name="src-file"
          aria-label="File"
          onChange={handleSelect}
        />
        <button className="button" onClick={handleSubmit}>
          Extract text
        </button>
      </div>

      <div className="text">
        <textarea
          name="pdfText"
          value={pdfText}
          readOnly
          placeholder="Waiting for text..."
          className="pdfText"
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <button className="button" onClick={handleReset}>
        Reset
      </button>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
