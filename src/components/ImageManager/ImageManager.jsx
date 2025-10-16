// ImageManager.jsx
import React, { useRef, useState, useEffect, useContext } from 'react';
import { uploadImage } from '../../services/api';
import './ImageManager.css';
import { AiOutlineUpload, AiOutlineCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useIngredients } from '../../context/IngredientsContext';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';

const ImageManager = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [loading, setLoading] = useState(false); // ⬅️ NEW

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();
  const { setIngredients } = useIngredients();
  const { setFridgeImage } = useContext(AppContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImageSelected(true);

    const reader = new FileReader();
    reader.onload = () => setFridgeImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (imageFile) => {
    if (!imageFile || loading) return; // ⬅️ évite les doubles clics
    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('image', imageFile instanceof Blob ? imageFile : image);

      const data = await uploadImage(formData);
      if (!data?.ok) {
        throw new Error(data?.error || "Échec de l’envoi de l’image.");
      }

      // PAS de JSON.parse ici – c’est déjà du JSON
      const detected = Array.isArray(data.ingredients) ? data.ingredients : [];
      // normalise au cas où (déjà au bon format logiquement)
      const detectedIngredients = detected.map(obj => ({ name: String(obj.name || '').trim() }))
                                         .filter(o => o.name);

      setIngredients(detectedIngredients);
      setMessage('Image envoyée avec succès !');

      // Navigation explicite (SPA)
      navigate('/recipeSuggestion', { state: { ingredients: detectedIngredients } });
    } catch (err) {
      setMessage(err.message || "Échec de l’envoi de l’image.");
    } finally {
      setLoading(false);
    }
  };

  const startCamera = () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage("Votre navigateur ne supporte pas l'accès à la caméra.");
      return;
    }
    setIsCameraActive(true);
  };

  useEffect(() => {
    const initializeCamera = async () => {
      if (!isCameraActive || !videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          setMessage("Accès à la caméra refusé. Vérifiez vos permissions.");
        } else if (error.name === 'NotFoundError') {
          setMessage("Aucune caméra détectée sur cet appareil.");
        } else {
          setMessage("Erreur caméra : " + error.message);
        }
      }
    };
    initializeCamera();
  }, [isCameraActive]);

  const takePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    setPhotoBlob(blob);

    const reader = new FileReader();
    reader.onload = () => setFridgeImage(reader.result);
    reader.readAsDataURL(blob);

    setMessage('Photo capturée avec succès.');
  };

  return (
    <>
      {isLoggedIn && (
        <div className="upload-container">
          <h1 className='title-upload-image'>Quels aliments avez-vous ?</h1>

          <label htmlFor="file-input" className="upload-icon" title="Uploader une image">
            <AiOutlineUpload />
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden-input"
            onChange={handleFileChange}
          />

          {imageSelected && (
            <button className="ca-button" onClick={() => handleSubmit(image)} disabled={loading}>
              {loading ? "Envoi..." : "Envoyer l'image"}
            </button>
          )}

          <label className="upload-icon" onClick={startCamera} title="Activer la caméra">
            <AiOutlineCamera />
          </label>

          {isCameraActive && (
            <div className="camera-container">
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              <button className="ca-button" onClick={takePhoto}>
                Capturer une photo
              </button>
            </div>
          )}

          {photoBlob && (
            <button className="ca-button margin-top" onClick={() => handleSubmit(photoBlob)} disabled={loading}>
              {loading ? "Envoi..." : "Envoyer la photo"}
            </button>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {image && <p>{image.name}</p>}
          {message && <p>{message}</p>}
        </div>
      )}
    </>
  );
};

export default ImageManager;
