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


	$(document).on("click", "button#build-closet", updateWardrobe);

	$("select").change(function() {
		var itemId = $(this).data("wardrobeitem");
		var origCount = parseInt($(this).data("originalcount"));
		var count = parseInt($(this).val());
		if (origCount != count){
	    $.ajax({
	        type: "POST",
	        url: "/user/wardrobeitemsave/" + itemId,
	        data:{count: count},
	        success: function(result){ 
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
					dd.val(dataRow.count);
					dd.data("wardrobeitem", dataRow.id);
					dd.data("originalcount", dataRow.count);
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
			var origCount = parseInt($(this).data("originalcount"));
			var count = parseInt($(this).val());

			if (origCount != count){
				console.log(origCount + " != " + count)
				updateMap[itemId] = {count: count};
			}
			console.log(updateMap);
		});

		// $.ajax({
		//     type: "POST",
		//     url: "/user/updateWardrobeItems",
		//     // The key needs to match your method's input parameter (case-sensitive).
		//     data: JSON.stringify({ updates: updateMap }),
		//     contentType: "application/json; charset=utf-8",
		//     dataType: "json",
		//     success: function(data){
		//     	//alert(data);
		//     },
		//     failure: function(errMsg) {
		//       // alert(errMsg);
		//     }
		// });

		// $.post("/user/buildWardrobe", {
  //   	updates: updateMap
  //   })
  //   .then(function(data) {
  //     // ok
  //   }).catch(function(err) {
  //   	console.log(err);
  //   });		
	}
});