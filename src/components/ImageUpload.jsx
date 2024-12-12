import React, { useState } from 'react';
import './ImageUpload.css'; // Assurez-vous d'importer le fichier CSS

const ImageUpload = () => {
  const [image, setImage] = useState(null);  // État pour l'image téléchargée
  const [imagePreview, setImagePreview] = useState(null);  // État pour l'aperçu de l'image

  // Fonction pour gérer l'upload d'image
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Créer un aperçu de l'image
      };
      reader.readAsDataURL(file);  // Lire le fichier comme base64
    }
  };

  // Fonction pour soumettre le formulaire (envoi à un serveur ou autre logique)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) {
      alert("Veuillez sélectionner une image.");
      return;
    }
    console.log("Image prête à être envoyée:", image);
    // Logique d'envoi de l'image à un serveur
  };

  return (
    <div className="image-upload-container">
      <h2>Uploader une Image</h2>
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
