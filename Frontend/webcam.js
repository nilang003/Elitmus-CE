function base64ToBlob(base64) {
  // Split the base64 string into data and contentType
  const [, data] = base64.split(',');
  const contentType = 'image/png';
  console.log(contentType);
  // Decode the base64 data
  const binaryData = atob(data);

  // Create a typed array from the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  // Return the Blob object
  return new Blob([uint8Array], { type: contentType });
}


const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.error(`An error occurred: ${err}`);
  });

let click = function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const uri = canvas.toDataURL(0.01);
  const date = Date.now();
  let ans = [uri, date]
  return ans;
};


const takePhoto = async () => {
  const [uri, date] = click();
  const blob = base64ToBlob(uri);
  console.log(blob);
  const formData = new FormData();
  formData.append('productImage', blob, `im.png`);
  formData.append('timeStamp',date);
  const response = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    console.error('Failed to send photo to API');
  }
}

// Take a photo at a continuous interval
setInterval(takePhoto, 5000);