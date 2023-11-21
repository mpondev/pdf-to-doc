import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  // Handler for file selection
  const handleSelect = evt => {
    setFile(evt.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('You must select a file');
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append('pdf', file);

      const response = await fetch('http://localhost:3005/api/uploads', {
        method: 'POST',
        body: formdata,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const textResponse = await response.text();
      setPdfText(textResponse);

      toast.success('File uploaded successfully');

      // Clear file input and reset state
      document.getElementById('fileInput').value = null;
      setFile(null);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = () => {};

  return (
    <>
      <div className="container">
        <input
          id="fileInput"
          className="input"
          name="src-file"
          type="file"
          aria-label="File"
          onChange={handleSelect}
        />
        <button className="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>

      <div className="text">
        <textarea
          name="pdfText"
          value={pdfText}
          onChange={handleChange}
          className="pdfText"
          cols="30"
          rows="10"
        >
          {pdfText}
        </textarea>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
