var aws = require('aws-lib');
var prodAdv = aws.createProdAdvClient(
  "AKIAIFHLS6XGJ4I6JWNQ",
  "CIYvIPD5EEAkQZfW3LrNSVeGiRLW2luA/Iqwa8E6",
  "cnjdev-20");



var searchAmazon = function(keyword){
  return new Promise(function(resolve, reject){
    console.log("itemsearch: " + keyword);
    prodAdv.call("ItemSearch", 
      {SearchIndex: "Fashion", Keywords: keyword}, 
      function(err, result) {
        if (err){
          console.log(err);
          reject(err);
        }
        // console.log("result");
        // console.log(result);

    console.log("---------trying to get a single item----------" + result.Items.MoreSearchResultsUrl);
            resolve(result);
      }
    );
  });

};
module.exports = searchAmazon;

