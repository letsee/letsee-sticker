function addTextItem() {
  let text = $('#inputArea').val();

  // 첫번째 변수로 element의 css를 넣고 두번째 변수로
  //let jungwooText = createDOMRenderable("<div>" + text + "</div>", 'target-ready-content');
  let jungwooText = createDOMRenderable("<div>이정우입니다.</div>", 'target-ready-content');

  // 필요한 부분
  // 1. place 태그의 style 부분.
  // 2. 내가 삽입할 text의 style부분. (즉 element의 css가 필요함)
  // 3.

  //world.add(jungwooText);
  //editObject = jungwooText;

  showInputTextDiv();
  showInputConfirmDiv();
}


function createDOMRenderable(value, className) {
  let element = document.createElement('div');
  element.innerHTML = value;
  element.className = className ? className : '';

}