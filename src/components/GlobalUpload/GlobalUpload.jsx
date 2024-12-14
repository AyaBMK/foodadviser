import React from "react"
import ImageUpload from "../ImageUpload/ImageUpload"
import CameraCapture from "../CameraCapture/CameraCapture"
import SearchBar from "../SearchBar/SearchBar"


import "./GlobalUpload.css"

export default function GlobalUpload() {
  return (
        <div className="app-container">
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