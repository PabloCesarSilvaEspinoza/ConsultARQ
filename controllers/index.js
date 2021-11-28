/*const controller={};

controller.inicio =(req, res) => {
    res.render('auth/signup');
  };

module.exports = controller;*/
var fs=require('fs');
var path=require('path');

var files=fs.readdirSync(__dirname);
files.forEach(function(file){
  var fileName=path.basename(file,'.js');
  if(fileName!=='index'){
    exports[fileName]=require('./'+fileName);
  }
});