"use client";

import React, { ChangeEvent, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const imageInput = React.useRef<HTMLInputElement>(null);
  function handleImageClick() {
    imageInput.current?.click();
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image && <p>No image picked yet.</p>}
          {image && (
            <Image
              src={image.toString()}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleImageClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
