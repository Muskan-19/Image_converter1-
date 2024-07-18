 // src/ImageConverter.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [format, setFormat] = useState('jpeg'); // Default format

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setConvertedImage(null); // Reset converted image when a new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Convert to the desired format
        const convertedImageURL = canvas.toDataURL(`image/${format}`);
        setConvertedImage(convertedImageURL);
      };
      
      img.src = image;
    }
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement('a');
      link.href = convertedImage;
      link.download = `converted-image.${format}`; // Use the format for the file extension
      link.click();
    }
  };

  return (
    <div className="image-container">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
        <button onClick={handleConvert}>Convert to {format.toUpperCase()}</button>
      </div>
      {image && (
        <div>
          <img src={image} alt="Selected" />
        </div>
      )}
      {convertedImage && (
        <div>
          <img src={convertedImage} alt="Converted" />
          <button onClick={handleDownload}>
            Download Converted Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
