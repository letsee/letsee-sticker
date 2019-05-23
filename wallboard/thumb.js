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
  }
}
