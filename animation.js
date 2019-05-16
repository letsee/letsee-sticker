
let w = window.innerWidth;
let h = window.innerHeight;
let menu = $("#menu");
let btnAdd = document.getElementById("btnAdd");
let isMenuOpen = false;

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

function initLayout() {

  btnAdd.style.top = ((h / 2) - ($(btnAdd).height() / 2)) + "px";
  btnAdd.style.left = ((w / 2) - ($(btnAdd).width() / 2)) + "px";
  btnAdd.style.display = "block";

  initMenu();
}


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



