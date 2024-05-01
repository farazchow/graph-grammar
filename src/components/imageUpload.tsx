import React, { useState } from "react";

const UploadImage = () => {

  const [selectedImage, setSelectedImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files as FileList;
    setSelectedImage(selectedFiles?.[0]);
    const url = URL.createObjectURL(selectedFiles?.[0])
    console.log(url);
    setPreviewImage(url);
  }

  return (
    <div>
      <input
        type="file"
        name="myImage"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadImage;