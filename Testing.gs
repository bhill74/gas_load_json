function test_() {
  test_loadByPath_valid_();
  test_loadByPath_invalid_();
}

function test_loadByPath_valid_() {
  var name = "sample_config_valid";
  var obj = { "sample": "test", "other": "data", "number": 3 };
  var file = MyDriveUtil.createFileByPath(jsonFileName(name), JSON.stringify(obj));
  MyAssert.ok(file);
  
  var data = loadByPath(name);
  MyAssert.ok(data, "Data read OK");
  MyAssert.equal(Object.keys(obj).length, Object.keys(data).length, "Same object size");
  MyAssert.isNull(MyDriveUtil.getFileByPath(errorFileName(name)), "No error file created");
  MyAssert.equal(JSON.stringify(obj), JSON.stringify(data), "Same data in objects");
  
  MyDriveUtil.removeFile(file);
}

function test_loadByPath_invalid_() {
  var name = "sample_config_invalid";
  var file = MyDriveUtil.createFileByPath(jsonFileName(name), "{ \"sample\": \"test\", \"other\"");
  MyAssert.ok(file);
  
  var data = loadByPath(name);
  MyAssert.isNull(data, "Data read not OK");
  var err = MyDriveUtil.getFileByPath(errorFileName(name));
  MyAssert.ok(err, "Error file created");
  
  MyDriveUtil.removeFile(file);
  MyDriveUtil.removeFile(err);  
}