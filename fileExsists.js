// проверить существование файла на диске
// параметры:
// cPath - строка. Полный путь к проверяемому файлу.
// возвращается булево (true - файл существует; false - файл не существует)
function FileExists(cPath) {
  var bFileExist;
  var oFileSystem = new ActiveXObject("Scripting.FileSystemObject");

  if (oFileSystem.FileExists(cPath)) {
    bFileExist = true
  } else {
    bFileExist = false
  }
  return bFileExist;
}