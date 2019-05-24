let w = window.innerWidth;
let h = window.innerHeight;

// set global elements.

// set switchs.

let isOpenInputText = false;
let isOpenInputConfirm = false;
let idOpenHelpDiv = false;
let isOpenXButtonHelp = false;
let isOpenInfoButtonHelp = true;

let recommendDiv =  $("#recommendDiv");
let inputArea = $("#inputArea");



function initLayoutLandscape() {

  w = window.innerWidth;
  h = window.innerHeight;

  //addButton.style.top = ((h / 2) - ($(addButton).height() / 2)) + "px";
  //addButton.style.left = ((w / 2) - ($(addButton).width() / 2)) + "px";



  var m = parseInt(inputArea.css("margin-left"));
  var p = parseInt(inputArea.css("padding"));
  var b = parseInt(inputArea.css("border"));

  inputArea.width( (w - (m * 2) - (p * 2 ) - (b * 2)) + "px" );

  // set help div
  let divHelp = document.getElementById("divHelp");
  //divHelp.style.width = w + "px";
  //divHelp.style.height = h + "px";
  //divHelp.style.width = w * 0.8 + "px"; 80%
  //divHelp.style.height = h * 0.9 + "px"; 90%
  //divHelp.style.marginLeft = w * 0.1 + "px"; 10%
  //divHelp.style.marginTop = h * 0.05 + "px"; 5%

  // set xbutton
  /*
  let xButtonHelp = document.getElementById("xButtonHelp");
  xButtonHelp.width = w * 0.1;
  xButtonHelp.style.marginLeft = w * 0.85 + "px";
  xButtonHelp.style.marginTop = h * 0.025 +"px";

  // set info button
  let infoButtonHelp = document.getElementById("infoButtonHelp");
  infoButtonHelp.width = w * 0.08;
  infoButtonHelp.style.marginLeft = w * 0.85 + "px";
  infoButtonHelp.style.marginTop = h * 0.05 +"px";
  */
}

function initOrientation() {

  // 세로모드일시
  if(window.orientation === 0) {
    recommendDiv.fadeIn();
  } else {

    // 가로모드일시 레이아웃 초기화
    initLayoutLandscape();
    recommendDiv.fadeOut();
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
    isOpenInputConfirm = true;

  } else {
    $("#inputConfirm").fadeOut();
    isOpenInputConfirm = false;
  }
}


// function to change layout when orientation convert
$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
    //setTimeout(initLayout, 100);
    recommendDiv.width = "100%";
    recommendDiv.height = "100%";
    recommendDiv.fadeIn();
  }
  else // Landscape
  {
    //setTimeout(initLayout, 100);
    recommendDiv.fadeOut();
    initLayoutLandscape();
  }
});
