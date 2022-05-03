import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';

import "./ImageUploader.css";

const ALLOWED_EXTENSIONS = ['jpeg', 'jpg', 'png'];
const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';

const FileUploader = ({ onFileSelectSuccess, onFileSelectError, initialImage }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(EMPTY_IMAGE); // small image as placeholder
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    setImagePreview(initialImage || EMPTY_IMAGE);
  }, [initialImage]);

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleSelectFile = () => {
    // reset error message
    setFileError(null);
  
    // check if we have files selected
    if (fileInputRef.current?.files) {
      const currentFile = fileInputRef.current.files[0];
      
      // check extension
      const extension = currentFile.name.split('.').pop();
      if (ALLOWED_EXTENSIONS.indexOf(extension) === -1) {
        setFileError('Se pot incarca doar imagini cu extensia .jpg, .jpeg si .png');
        onFileSelectError(true);
      // check file size
      } else if (currentFile.size > 10_000_000) { // 1 000 - 1kb, 1 000 000 - 1mb
        setFileError('Se pot incarca doar imagini de maxim 10MB');
        onFileSelectError(true);
      // all good, we can upload the file
      } else {
        setImagePreview(URL.createObjectURL(currentFile));
        onFileSelectSuccess(currentFile);
      }
    }
  }

  return (
      <div className="file-uploader-wrapper">
        <div className="file-uploader">
          <input ref={fileInputRef} onChange={handleSelectFile} id="input-file" className="d-none" type="file" />
          <Button onClick={handleClick} variant="success">Incarca Poza</Button>
          <img className="image-preview" src={imagePreview} />
        </div>
        {fileError && <Alert variant="danger">{fileError}</Alert>}
      </div>
    )
};

export default FileUploader;