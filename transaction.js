
var db = require("./models");
var Op = db.Sequelize.Op;

function constructPromises(t, dbTable, insertArray, updateMap, deleteIds){
	var promiseArray = [];

	if (insertArray.length > 0){
		promiseArray.push(
			dbTable.bulkCreate(
				insertArray, 
				{transaction: t}
			)
		);
	}

	for (itemId in updateMap){
		var jsonItem = updateMap[itemId];
		promiseArray.push(
			dbTable.update(jsonItem, {
				where: {id: itemId},
				transaction: t
			})
		);
	}

	if (deleteIds.length > 0){
		promiseArray.push(
			dbTable.destroy({
				where: {id: {[Op.in]: deleteIds }}, 
				transaction: t
			})
		);
	}
	
	return promiseArray;
}

function runMultiUpdate(dbTable, insertArray, updateMap, deleteIds){
	return db.sequelize.transaction().then(function (t) {
		var promiseArray = constructPromises(t, dbTable, insertArray, updateMap, deleteIds);
	  return Promise.all(promiseArray)
	  .then(function (data) {
	   	t.commit();
	   	return data;
	  })
	  .catch(function (err) {
	    t.rollback();
	    throw err;
	  });
	});
}

module.exports = runMultiUpdate;

// // Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function() {
// 	doPromises(db.TextItem, insertJsonArray, updateJsonMap, deleteIdArray)
// 	.then(function(t){
// 		console.log("Success!");
// 		console.log(t);
// 	}).catch(function(err){
// 		console.log("Error");
// 		console.log(err);
// 	});
// });