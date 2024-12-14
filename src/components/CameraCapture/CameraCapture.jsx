// src/CameraCapture.jsx
import React, { useState, useRef } from 'react';
import './CameraCapture.css';  // Assurez-vous d'importer les styles ici
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const CameraCapture = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null); // Référence pour l'élément vidéo
  const canvasRef = useRef(null); // Référence pour le canevas où on va dessiner l'image capturée

  // Fonction pour démarrer la caméra
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream; // Lier le flux de la caméra à la vidéo
      setIsCameraOn(true);
    } catch (err) {
      console.error("Erreur d'accès à la caméra : ", err);
    }
  };

  // Fonction pour arrêter la caméra
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop()); // Arrêter toutes les pistes vidéo
    setIsCameraOn(false);
  };

  // Fonction pour capturer l'image
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height); // Dessiner l'image de la vidéo sur le canevas
    const imageUrl = canvas.toDataURL('image/png'); // Convertir l'image du canevas en URL
    setImage(imageUrl); // Sauvegarder l'image
    stopCamera(); // Arrêter la caméra après avoir capturé l'image
  };

  return (
    <div className="camera-capture">
      <h2 className="h2_globalUpload">Prendre une photo de votre frigo</h2>
      <div className="camera-container">
      <FontAwesomeIcon icon={faCamera} size="3x" className="camera-icon" />
      {/* <p className="camera-capture-text">Capturez une image</p>git  */}


        {!isCameraOn ? (
          <button onClick={startCamera}>Démarrer la caméra</button>
        ) : (
          <button onClick={stopCamera}>Arrêter la caméra</button>
        )}

        <div className="video-container">
          <video ref={videoRef} autoPlay></video> {/* Affichage de la vidéo de la caméra */}
        </div>

        <button onClick={captureImage}>Capturer l'image</button>

        {image && (
          <div className="image-preview">
            <h3>Image Capturée :</h3>
            <img src={image} alt="Frigo" />
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Canevas invisible pour capturer l'image */}
      </div>
    </div>
  );
};

export default CameraCapture;
