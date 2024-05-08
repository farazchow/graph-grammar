import React, { useState } from "react";

const UploadImage = (props: any) => {


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files as FileList;
    const url = URL.createObjectURL(selectedFiles?.[0])
    props.getUpload({type: props.nodeType, url: url});
  }

  return (
    <div style={{width: '175px'}}>
      <input
        type="file"
        name="myImage"
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadImage;