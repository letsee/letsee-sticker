
app.addEventListener("trackstart", function(e) {
  var uri = e.target.uri;
  let CURRENT_URI = uri;

  // 현재 uri 와 currentUri 가 다를때 실행됨
  if (uri !== CURRENT_URI) {
    if (CURRENT_URI) {
      //app.LetseeEngine.getEntity(CURRENT_URI).removeRenderable(world);
    }
  }
});

app.addEventListener("trackmove", function(e) {
  //console.log(e);
  e.target.addRenderable(world);
});

app.addEventListener('app_status', e => {
  switch(e.code) {
    case 203:
      initWorldObject3D(app.letseeEngine.getEntities());
      break;
    default:
      console.log(e);
      break;
  }
});