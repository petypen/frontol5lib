// Получить строку шрифтом bold для ККМ
// параметры:
// cString - строка, строка текста, которую необходимо преобразовать в написание bold
// возвращается строка преобразованная в шрифт bold, например "\tП\tР\tО\tД\tА\tЖ\tА"
function getBoldString(cString) {
  var cStringReturn = "";

  if (cString == "" || cString === undefined || typeof (cString) != "string") {
    cStringReturn = "";
  } else {
    for (var nPos = 0; nPos < cString.length; nPos++) {
      var cElement = cString.substr(nPos, 1);
      cStringReturn = cStringReturn + "\t" + cElement;
    }
  }
  return cStringReturn;
}