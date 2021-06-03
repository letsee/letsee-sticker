import html2canvas from "html2canvas";
// @flow

function drawImg(imgData) {
  console.log(imgData);
  return new Promise(function resolve() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imageObj = new Image();
    imageObj.onload = function () {
      ctx.drawImage(imageObj, 10, 10);
    };
    imageObj.src = imgData;
  }, function reject() {
  });
}

function saveAs(uri, filename) {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
  const openCapture = () => {
    const htmlCollection = document.body;
    htmlCollection.querySelector('.shareModalScreenShot').style.display = 'none';
    html2canvas(htmlCollection)
        .then( function (canvas) {
          drawImg(canvas.toDataURL('image/png'));
          saveAs(canvas.toDataURL(), 'LetseeSticker.png')
    }).catch(function (err) { console.log(err); });
  };

export default openCapture;
