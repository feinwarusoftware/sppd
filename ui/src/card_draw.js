"use stict";

// Draws a clip path with rounded corners
export const roundedClipPath = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

// Drawn an image on the canvas and rounds the corners
export const ctxDrawImageRounded = (ctx, x, y, width, height, radius, ...args) => {
  ctx.save();
  roundedClipPath(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.drawImage(...args);
  ctx.restore();
};
