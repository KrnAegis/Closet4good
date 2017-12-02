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


  // $(document).on("click", "button#build-closet", function(){
    
  // });
  $("#build-closet").on("click", function(){
    console.log("This is donations array" + donations[0].id);
    updateWardrobe();
    suggestion();

  })
  //this will make a link for donated item that will redirect to the amazon page


  var donations = [];
  $("select").change(function() {
    var itemId = $(this).data("wardrobeitem");
    var origCount = parseInt($(this).data("originalcount"));
    var donation = parseInt($(this).val());
    // var subcategory = $(this).attr("id");
    var subcategory = $(this).prev().prev().html();
    if (donation < origCount){
      var newCount = origCount - donation;
      $.ajax({
          type: "POST",
          url: "/user/wardrobeitemsave/" + itemId,
          data:{count: newCount},
          success: function(result){ 
            donations.push({
              amount: donation,
              subcategory: subcategory,
              id: itemId
            })
            // alert('Successfully called');
          },
          error:function(exception){
            // alert('Exeption:'+exception);
          }
      });
    }
  });

  // method to get wardrobe and construct table by mode setup
  function constructWardrobeForSetup(){
    $.get("/user/wardrobeitems/" + wardrobeId, function(data){
      console.log(data);
      for (var i=0; i<data.length; i++){
        var dataRow = data[i];
        var dd = $("#" + dataRow.subcategory);
        if (dd){
          dd.data("originalcount", dataRow.count);
          dd.data("wardrobeitem", dataRow.id);
          
          $( "<h5 class='closet-items'>(" + dataRow.count + ")</h5>" )
            .insertBefore( "#" + dataRow.subcategory );
        }

      }
    });
  }

  // update some counts of items in closet
  function updateWardrobe(){
    var dataRows = $("select");
    var updateMap = {};
    $.each(dataRows, function(){
      var itemId = $(this).data("wardrobeitem");
      var origCount = $(this).data("originalcount");
      var count = $(this).val();
      // updateMap[id] = {count: origCount - count};
    });
  //the id is the id of donated item

    // $.post("/user/buildWardrobe", updateMap)
    // .then(function(data) {
    //   window.location.replace(data);
    // }).catch(function(err) {
    //   console.log(err);
    // });   
  }
    function keywordSub(donation, cb) {
    $.get("/user/wardrobeitem/" + donation.id).then(function(data) {
       var sub = data.subcategory;
       var WardId = data.WardrobeId;
       keywordGen(WardId, sub, donation, cb);
    });
  };
  //id is the WardrobeId of wardrobeitem that was donated
  function keywordGen(id, sub, donation, cb){
    $.get("/user/wardrobe/" + id).then(function(data) {
       var gen = data.gender;
       console.log("this is gender" + gen)
       var keyword = gen + " " + sub;
       console.log("this is keyword" + keyword)
    $.get("/donate/searchamazon/" + keyword).then(function(data){
        console.log("This is link: " + data);
        var link = data.Items.MoreSearchResultsUrl;

        cb(donation, link);
    })
    });
  };
function suggestion(){
  for (var i = 0; i < donations.length; i++){
    keywordSub(donations[i], cb)
  }
}

function cb(donation, link){
  var text = donation.subcategory
  //making links with subcategory as text and link with result you get from running keywordSub function
  var sugLnk = $("<a>");
  sugLnk.attr("href", link);
  sugLnk.text(text);
  $("#donResult").append(sugLnk);
}
});