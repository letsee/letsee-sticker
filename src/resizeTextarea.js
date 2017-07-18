// @flow
function resizeTextarea() {
  this.style.height = '48px';
  this.style.height = `${this.scrollHeight}px`;

  document.getElementById('temp').innerText = this.value;

  if (this.value === '') {
    this.style.width = '360px';
  } else {
    this.style.width = `${document.getElementById('temp').offsetWidth + 40}px`;
    // this.style.width = (document.getElementById('temp').offsetWidth+40)+'px';
  }
}

export default resizeTextarea;
