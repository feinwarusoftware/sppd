"use strict";

// TODO: test
// Checks if an image is loaded
export const checkImage = path => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${path}`);

    img.src = path;
  });
}

// TODO: test
// Checks if multiple images are loaded
export const checkImages = paths => Promise.all(paths.map(checkImage));
