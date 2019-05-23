

const CreateThumbnail = {
  init: function(file) {},
  getImage: function(_file) {
    const file = _file;
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      if (file.type.match('image')) {
        fileReader.onload = function () {
          // var img = document.createElement('img');
          // img.src = fileReader.result;
          // document.getElementsByTagName('div')[0].appendChild(img);
          resolve(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      } else {
        reject("please upload image only");
      }

    })
  },
  getImageResize: function (_file) {
    const file = _file;
    var fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      if (file.type.match('image')) {
        fileReader.onload = function (e) {
          let img = document.createElement('img');
          img.src = e.target.result;

          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 400;
          var MAX_HEIGHT = 400;
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          let dataurl;
          dataurl = canvas.toDataURL(file.type);
          resolve(dataurl);
        };
        fileReader.readAsDataURL(file);
      } else {
        reject("please upload image only");
      }
    })
  }
};
}