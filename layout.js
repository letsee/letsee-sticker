
let w = window.innerWidth;
let h = window.innerHeight;
let menu = $("#menu");

// set global elements.
let btnAdd = document.getElementById("btnAdd");
let imgHelp = document.getElementById("imgHelp");

// set switchs.
let isMenuOpen = false;
let isHelpOpen = false;
let isOpenInputText = false;
let isOpenInputConfirm = false;

inputArea = $("#inputArea");

// function for doing menu animation
function showMenu() {

  let btnAdd = document.getElementById("btnAdd");

  if(isMenuOpen === false) {
    btnAdd.style.WebkitTransform = "rotate(45deg)";
    menu.fadeIn();
    isMenuOpen = true;

  } else {
    btnAdd.style.WebkitTransform = "rotate(0deg)";
    isMenuOpen = false;
    menu.fadeOut();
  }
}

// function to set "#btnAdd" element display
function showAddBtn(isShow) {
  if (isShow) {
    btnAdd.style.display = "block";
  } else {
    btnAdd.style.display = "none";
  }

}

// function to set layout when app initialize.
function initLayout() {

  btnAdd.style.top = ((h / 2) - ($(btnAdd).height() / 2)) + "px";
  btnAdd.style.left = ((w / 2) - ($(btnAdd).width() / 2)) + "px";
  btnAdd.style.display = "block";

  initMenu();
  initHelpDiv();
  //createDOMRenderableFromJson();

  var m = parseInt(inputArea.css("margin-left"));
  var p = parseInt(inputArea.css("padding"));
  var b = parseInt(inputArea.css("border"));

  inputArea.width( (w - (m * 2) - (p * 2 ) - (b * 2)) + "px" );
}

// function for setting menu layout in the middle.
function initMenu() {

  menu.css("top", ((h / 2) - (menu.outerHeight() / 2)) + "px");
  menu.css("left", ((w / 2) - (menu.outerWidth() / 2)) + "px");

  let cSize = menu.width();
  let cHalf = cSize / 2;
  let bSize = 60;
  let bHalf = bSize / 2;

  let menuButtons = document.getElementsByClassName("btnMenu");
  for (let i=0 ; i<menuButtons.length ; i++) {
    let btn = menuButtons[i];
    btn.style.width = bSize + "px";
    btn.style.height = bSize + "px";
  }

  let t = (cHalf) / 5;

  let btnText = document.getElementById("addText");
  btnText.style.top = -bHalf + "px";
  btnText.style.left = (cHalf - bHalf) + "px";

  let btnImage = document.getElementById("addImage");
  btnImage.style.top = (t * 4) - bHalf + "px";
  btnImage.style.left = -bHalf + "px";

  let btnLink = document.getElementById("addLink");
  btnLink.style.top = (t * 4) - bHalf + "px";
  btnLink.style.right = -bHalf + "px";

  let btnSearch = document.getElementById("addSearch");
  btnSearch.style.bottom = -bHalf + "px";
  btnSearch.style.left = (t * 2) - bHalf + "px";

  let btnYoutube = document.getElementById("addYoutube");
  btnYoutube.style.bottom = -bHalf + "px";
  btnYoutube.style.right = (t * 2) - bHalf + "px"

}

// Function for set Help Button
function initHelpDiv() {
  let divHelp = document.getElementById("divHelp");
  divHelp.style.width = w + "px";
  divHelp.style.height = h + "px";

  imgHelp.style.width = "100%";
  imgHelp.style.height = "100%";
  imgHelp.src = "assets/web_help.png";
}

function showHelpImage() {

  // when help image invisible.
  if(isHelpOpen === false) {
    imgHelp.style.display = "block";
    btnAdd.style.display = "none";
    isHelpOpen = true;
  } else {
    imgHelp.style.display = "none";
    btnAdd.style.display = "block";
    isHelpOpen = false;
  }
}

// function for showing 'inputText' div element.
function showInputTextDiv() {
  if(isOpenInputText === false) {
    $("#inputText").fadeIn();
    showMenu();
    isOpenInputText = true;
  } else {
    $("#inputText").fadeOut();
    isOpenInputText = false;
  }
}

// function for showing 'inputConfirm' div element.
function showInputConfirmDiv() {
  if(isOpenInputConfirm === false) {
    $("#inputConfirm").fadeIn();
    isOpenInputConfirm = true;

  } else {
    $("#inputConfirm").fadeOut();
    isOpenInputConfirm = false;
  }
}

