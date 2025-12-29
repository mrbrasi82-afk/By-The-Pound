import React, {useState} from 'react';

export default function Upload(){
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  async function handleUpload(){
    if(!file) return alert('Choose a file');
    const fd = new FormData();
    fd.append('file', file);
    const resp = await fetch((process.env.REACT_APP_API||'') + '/upload', { method:'POST', body: fd });
    const data = await resp.json();
    if(data.url) setUrl(data.url);
    else alert('Upload failed');
  }
  return (<div>
    <input type="file" onChange={e=>setFile(e.target.files[0])} />
    <button onClick={handleUpload}>Upload</button>
    {url && <div style={{marginTop:12}}><img src={url} style={{maxWidth:300}} alt="uploaded" /></div>}
  </div>)
}
