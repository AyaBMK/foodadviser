import React, { useState } from 'react';
import './ImageUpload.css'; // Assurez-vous de lier le fichier CSS ici


const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fonction pour gérer l'upload d'image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Créer un aperçu de l'image
      };
      reader.readAsDataURL(file); // Lire l'image comme une URL
    }
  };

  // Fonction pour gérer l'envoi du formulaire (par exemple, pour envoyer à un serveur)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    // Logic to upload the image (e.g., sending it to a server) can be added here
    console.log("Image prête à être envoyée:", image);
  };

  return (
    <div>
      <h2 className="h2_globalUpload">Uploader une Image</h2>
      <form onSubmit={handleSubmit} className="image-upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-input"
        />
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Aperçu" className="image-preview" />
          </div>
        )}
        <button type="submit" className="submit-button">
          Télécharger
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
