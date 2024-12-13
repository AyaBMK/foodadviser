

export default function GlobalUpload() {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="searchbar-container">
      <SearchBar />
    </div>
    <div className="upload-camera-container">
      <div className="image-upload-container">
        <ImageUpload />
      </div>
      <div className="camera-capture-container">
        <CameraCapture />
      </div>
    </div>
   </div>
  )
}