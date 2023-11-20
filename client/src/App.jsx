import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const handleSelect = evt => {
    setFile(evt.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('You must select a file');
      return;
    }

    const formdata = new FormData();
    formdata.append('pdf', file);

    await fetch('http://localhost:3005/api/uploads', {
      method: 'POST',
      body: formdata,
    }).catch(err => console.error(err));

    document.getElementById('fileInput').value = null;
    toast.success('File uploaded successfully');

    setFile(null);
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
        ></textarea>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
