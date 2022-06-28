import "@tensorflow/tfjs-backend-webgl";
import * as blazeface from "@tensorflow-models/blazeface";

export const validateMedia = async (media: HTMLImageElement) => {
  //load model
  const model = await blazeface.load();
  return await model.estimateFaces(media, false);
};

export const BlobToHTMLImageEl = async (blob: Blob) => {
  let blobUrl = URL.createObjectURL(blob);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = blobUrl;
  }).then((img) => img);
};

export const BlobToImageData = async (
  blob: Blob,
  canvas: HTMLCanvasElement
) => {
  let blobUrl = URL.createObjectURL(blob);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = blobUrl;
  }).then((img) => {
    URL.revokeObjectURL(blobUrl);
    let [w, h] = [img.width, img.height];
    let aspectRatio = w / h;
    let factor = Math.max(w, h) / aspectRatio;
    w = w / factor;
    h = h / factor;

    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx && ctx.drawImage(img, 0, 0);

    return ctx?.getImageData(0, 0, w, h);
  });
};

export const FileToBlob = async (file: File) => {
  const url = URL.createObjectURL(file);

  return await fetch(url)
    .then((res) => res)
    .then((blob) => blob.blob());
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const blob = await fetch(url);
  //     resolve(blob);
  //   } catch (err) {
  //     reject(err);
  //   }
  // });
};

export const ImageDataToBlob = async (
  imageData: ImageData,
  canvas: HTMLCanvasElement
) => {
  let w = imageData.width;
  let h = imageData.height;
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext("2d");
  ctx && ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(resolve);
  });
};

//https://gist.github.com/Jonarod/77d8e3a15c5c1bb55fa9d057d12f95bd
