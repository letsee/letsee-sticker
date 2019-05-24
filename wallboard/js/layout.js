
let w = window.innerWidth;
let h = window.innerHeight;
let menu = $("#menu");

// set global elements.
let addButton = document.getElementById("addButton");
let imgHelp = document.getElementById("imgHelp");

// set switchs.
let isOpenMenu = false;
let isOpenInputText = false;
let isOpenInputConfirm = false;
let isOpenAddBtn = false;

let idOpenHelpDiv = false;
let isOpenXButtonHelp = false;
let isOpenInfoButtonHelp = true;

inputArea = $("#inputArea");

// function to set layout when app initialize.
function initLayout() {
  addButton.style.top = ((h / 2) - ($(addButton).height() / 2)) + "px";
  addButton.style.left = ((w / 2) - ($(addButton).width() / 2)) + "px";
  addButton.style.display = "block";

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
  //divHelp.style.width = w + "px";
  //divHelp.style.height = h + "px";
  divHelp.style.width = w * 0.8 + "px";
  divHelp.style.height = h * 0.9 + "px";
  divHelp.style.marginLeft = w * 0.1 + "px";
  divHelp.style.marginTop = h * 0.05 + "px";

  let xButtonHelp = document.getElementById("xButtonHelp");
  xButtonHelp.width = w * 0.1;
  xButtonHelp.style.marginLeft = w * 0.85 + "px";
  xButtonHelp.style.marginTop = h * 0.025 +"px";

  let infoButtonHelp = document.getElementById("infoButtonHelp");
  infoButtonHelp.width = w * 0.1;
  infoButtonHelp.style.marginLeft = w * 0.85 + "px";
  infoButtonHelp.style.marginTop = h * 0.025 +"px";
}

// function for showing "menu" div element.
/*
function showMenuDiv() {
  let addButton = document.getElementById("addButton");

  if(isOpenMenu === false) {
    addButton.style.WebkitTransform = "rotate(45deg)";
    menu.fadeIn();
    isOpenMenu = true;

  } else {
    addButton.style.WebkitTransform = "rotate(0deg)";
    isOpenMenu = false;
    menu.fadeOut();
  }
}
*/

// function for showing "btnAdd" div element.
function showBtnAdd() {
  if (isOpenAddBtn === false) {
    $("#addButton").fadeIn();
    isOpenAddBtn = true;
  } else {
    $("#addButton").fadeOut();
    isOpenAddBtn = false;
  }
}

function showHelpImage() {
  if(idOpenHelpDiv === false) {
    idOpenHelpDiv = true;
    $("#divHelp").fadeIn();
    showInfoButtonHelp();
    showXButtonHelp();

  } else {
    idOpenHelpDiv = false;
    $("#divHelp").fadeOut();
    showInfoButtonHelp();
    showXButtonHelp();
  }
}

function showXButtonHelp() {
  if(isOpenXButtonHelp ===  false) {
    $("#xButtonHelp").fadeIn();
    isOpenXButtonHelp = true
  }
  else {
    $("#xButtonHelp").fadeOut();
    isOpenXButtonHelp = false;
  }
}

function showInfoButtonHelp() {
  if(isOpenInfoButtonHelp ===  false) {
    $("#infoButtonHelp").fadeIn();
    isOpenInfoButtonHelp = true
  }
  else {
    $("#infoButtonHelp").fadeOut();
    isOpenInfoButtonHelp = false;
  }
}

// function for showing 'inputText' div element.
function showInputTextDiv() {
  if(isOpenInputText === false) {
    $("#inputText").fadeIn();
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
    showBtnAddAndMenu();
    showHelpBtn();
    isOpenInputConfirm = true;

  } else {
    $("#inputConfirm").fadeOut();
    showBtnAddAndMenu();
    showHelpBtn();
    isOpenInputConfirm = false;
  }
}

