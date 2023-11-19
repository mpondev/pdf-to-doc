import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);

  const selectedHandler = evt => {
    setFile(evt.target.files[0]);
  };

  const submitHandler = () => {
    if (!file) {
      alert('You must select a file');
      return;
    }

    const formdata = new FormData();
    formdata.append('pdf', file);

    fetch('http://localhost:3005/uploads', {
      method: 'POST',
      body: formdata,
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));

    setFile(null);
  };

  return (
    <div className="container">
      <input
        className="input"
        name="src-file"
        type="file"
        aria-label="File"
        onChange={selectedHandler}
      />
      <button className="button" onClick={submitHandler}>
        Upload
      </button>
    </div>
  );
}

export default App;
