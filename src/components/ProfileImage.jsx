import React, { useState, useEffect } from 'react';

const ProfileImage = ({ initialSrc, alt = "Imagem de perfil", onImageChange }) => {
  const [hovering, setHovering] = useState(false);
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  const style = {
    width: '120px',
    height: '120px',
    borderRadius: '60%',
    objectFit: 'cover',
    margin: '0',
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column-reverse",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "baseline",
    justifyContent: "flex-start",
    position: 'relative', // Added for positioning the icon
    cursor: 'pointer' // Change cursor to indicate clickable area
  };

  const iconStyle = {
    position: 'absolute',
    bottom: '5px',
    height: '90px',
    right: '38px',
    width: '90px',
    fontSize: '24px',
    color: 'white',
    display: hovering ? 'block' : 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '26px',
    cursor: 'pointer',
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSrc(base64String);
        if (onImageChange) {
          onImageChange(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      style={divStyle} 
      onMouseEnter={() => setHovering(true)} 
      onMouseLeave={() => setHovering(false)}
    >
      <img src={src} alt={alt} style={style} />
      <input type="file" style={{ display: 'none' }} id="fileInput" onChange={handleImageUpload} />
      <label htmlFor="fileInput" style={iconStyle}>📁</label>
    </div>
  );
};

export default ProfileImage;
