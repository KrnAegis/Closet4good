// depending on mode, donate items or update closet

$(document).ready(function() {

  var userId = "";
  var wardrobeId = "";

  $.get("/api/user_data").then(function(data) {
    var userId = data.id;
    $(".member-name").text(data.email);

    $.get("/user/wardrobes/" + userId).then(function(data) {
      wardrobeId = data[0].id;

      constructWardrobeForSetup();
    });
  });


  // $(document).on("click", "button#build-closet", updateWardrobe);


  // method to get wardrobe and construct table by mode setup
  function constructWardrobeForSetup(){
    $.get("/user/wardrobeitems/" + wardrobeId, function(data){
      console.log(data);
      for (var i=0; i<data.length; i++){
        var dataRow = data[i];
        var countItem = $("#" + dataRow.subcategory);
        if (countItem){
          if (dataRow.count > 0){
            countItem.html("(" + dataRow.count +")");
          } else {
            countItem.html("");
          }
          countItem.data("wardrobeitem", dataRow.id);
        }

      }
    });
  }

});
