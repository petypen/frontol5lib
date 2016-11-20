// Класс propertyBMPfile для доступа к различным свойствам BMP файла
// Конструктор класса. Параметры:
// cFullPathFile - строка. полный путь к файлу картинки
// Свойства класса:
// fullPathFile - строка. Полный путь к картинке.
// nDepthColor - целое число. Глубина цвета в картинке (для монохромных nDepthColor=1).
// nWidth - целое число. Ширина картинки в пикселях.
// nHeigth - целое число. Высота картинки в пикселях.
// Методы класса - отсутствуют.

// ToDo:
// свойство наименование файла
// метод isBMPfile()
// обработка ошибок
function propertyBMPfile(cFullPathFile) {

  // публичные поля
  this.fullPathFile = cFullPathFile;
  this.nDepthColor = 0;   // количество бит цвета на точку (1 - монохромное)
  this.nWidth = 0;        // ширина картинки в пикселях
  this.nHeigth = 0;       //высота картинки в пикселях

  // приватные поля
  var FileReadTypes = { adTypeBinary: 1, adTypeText: 2 };
  var backward = []; // массив перекодировки
  var hD = "0123456789ABCDEF";
  var nNumberByte = 32; // количество байт, считываемых из заголовка

  // заполнение массива перекодировки
  // Алгоритм предоставлен alex turner 
  // http://www.codeproject.com/KB/scripting/Exsead7.aspx
  backward['C7'] = '80';
  backward['FC'] = '81';
  backward['E9'] = '82';
  backward['E2'] = '83';
  backward['E4'] = '84';
  backward['E0'] = '85';
  backward['E5'] = '86';
  backward['E7'] = '87';
  backward['EA'] = '88';
  backward['EB'] = '89';
  backward['E8'] = '8A';
  backward['EF'] = '8B';
  backward['EE'] = '8C';
  backward['EC'] = '8D';
  backward['C4'] = '8E';
  backward['C5'] = '8F';
  backward['C9'] = '90';
  backward['E6'] = '91';
  backward['C6'] = '92';
  backward['F4'] = '93';
  backward['F6'] = '94';
  backward['F2'] = '95';
  backward['FB'] = '96';
  backward['F9'] = '97';
  backward['FF'] = '98';
  backward['D6'] = '99';
  backward['DC'] = '9A';
  backward['A2'] = '9B';
  backward['A3'] = '9C';
  backward['A5'] = '9D';
  backward['20A7'] = '9E';
  backward['192'] = '9F';
  backward['E1'] = 'A0';
  backward['ED'] = 'A1';
  backward['F3'] = 'A2';
  backward['FA'] = 'A3';
  backward['F1'] = 'A4';
  backward['D1'] = 'A5';
  backward['AA'] = 'A6';
  backward['BA'] = 'A7';
  backward['BF'] = 'A8';
  backward['2310'] = 'A9';
  backward['AC'] = 'AA';
  backward['BD'] = 'AB';
  backward['BC'] = 'AC';
  backward['A1'] = 'AD';
  backward['AB'] = 'AE';
  backward['BB'] = 'AF';
  backward['2591'] = 'B0';
  backward['2592'] = 'B1';
  backward['2593'] = 'B2';
  backward['2502'] = 'B3';
  backward['2524'] = 'B4';
  backward['2561'] = 'B5';
  backward['2562'] = 'B6';
  backward['2556'] = 'B7';
  backward['2555'] = 'B8';
  backward['2563'] = 'B9';
  backward['2551'] = 'BA';
  backward['2557'] = 'BB';
  backward['255D'] = 'BC';
  backward['255C'] = 'BD';
  backward['255B'] = 'BE';
  backward['2510'] = 'BF';
  backward['2514'] = 'C0';
  backward['2534'] = 'C1';
  backward['252C'] = 'C2';
  backward['251C'] = 'C3';
  backward['2500'] = 'C4';
  backward['253C'] = 'C5';
  backward['255E'] = 'C6';
  backward['255F'] = 'C7';
  backward['255A'] = 'C8';
  backward['2554'] = 'C9';
  backward['2569'] = 'CA';
  backward['2566'] = 'CB';
  backward['2560'] = 'CC';
  backward['2550'] = 'CD';
  backward['256C'] = 'CE';
  backward['2567'] = 'CF';
  backward['2568'] = 'D0';
  backward['2564'] = 'D1';
  backward['2565'] = 'D2';
  backward['2559'] = 'D3';
  backward['2558'] = 'D4';
  backward['2552'] = 'D5';
  backward['2553'] = 'D6';
  backward['256B'] = 'D7';
  backward['256A'] = 'D8';
  backward['2518'] = 'D9';
  backward['250C'] = 'DA';
  backward['2588'] = 'DB';
  backward['2584'] = 'DC';
  backward['258C'] = 'DD';
  backward['2590'] = 'DE';
  backward['2580'] = 'DF';
  backward['3B1'] = 'E0';
  backward['DF'] = 'E1';
  backward['393'] = 'E2';
  backward['3C0'] = 'E3';
  backward['3A3'] = 'E4';
  backward['3C3'] = 'E5';
  backward['B5'] = 'E6';
  backward['3C4'] = 'E7';
  backward['3A6'] = 'E8';
  backward['398'] = 'E9';
  backward['3A9'] = 'EA';
  backward['3B4'] = 'EB';
  backward['221E'] = 'EC';
  backward['3C6'] = 'ED';
  backward['3B5'] = 'EE';
  backward['2229'] = 'EF';
  backward['2261'] = 'F0';
  backward['B1'] = 'F1';
  backward['2265'] = 'F2';
  backward['2264'] = 'F3';
  backward['2320'] = 'F4';
  backward['2321'] = 'F5';
  backward['F7'] = 'F6';
  backward['2248'] = 'F7';
  backward['B0'] = 'F8';
  backward['2219'] = 'F9';
  backward['B7'] = 'FA';
  backward['221A'] = 'FB';
  backward['207F'] = 'FC';
  backward['B2'] = 'FD';
  backward['25A0'] = 'FE';
  backward['A0'] = 'FF';

  // Приватные методы

  var d2h = function (d) {
    var h = hD.substr(d & 15, 1);
    while (d > 15) { d >>>= 4; h = hD.substr(d & 15, 1) + h; }
    return h;
  }

  var h2d = function (h) {
    return parseInt(h, 16);
  }

  var toByteArray = function (inString) {
    var encArray = [];
    var sL = inString.length;
    for (var i = 0; i < sL; i++) {
      var cc = inString.charCodeAt(i);
      if (cc >= 128) {
        var h = backward['' + d2h(cc)];
        cc = h2d(h);
      }
      encArray.push(cc);
    }
    return encArray;
  }

  // Подключение к ADODB потоку данных
  var _internalReadAll = function (cFullPathFile, nNumberByte) {
    try {
      var stream = new ActiveXObject("ADODB.Stream");
      stream.Type = FileReadTypes.adTypeText;
      stream.CharSet = '437';

      stream.Open();
      stream.LoadFromFile(cFullPathFile);
      var cTextStream = stream.ReadText(nNumberByte);
      stream.Close();

      return cTextStream;
    }
    catch (e) {
      // Ошибка при работе с ADODB.Stream
      cTextStream = "-1"; // код ошибки
      return cTextStream;
    }
  }

  var BytesToArray = function (cFullPathFile, nNumberByte) {
    var cTextStream = _internalReadAll(cFullPathFile, nNumberByte);
    if (cTextStream == "-1") {
      return cTextStream; // передать код ошибки в конструктор
    } else {
      return toByteArray(cTextStream);
    }
  }

  // тело конструктора
  if (cFullPathFile.length > 0) {
    var aByte = BytesToArray(cFullPathFile, nNumberByte);
    if (typeof aByte == "object" && aByte.length > 0) {
      if (aByte[0] == 66 && aByte[1] == 77) {
        this.nDepthColor = aByte[28] + aByte[29] * 256;
        this.nWidth = aByte[18] + aByte[19] * 256 + aByte[20] * 65536;
        this.nHeigth = aByte[22] + aByte[23] * 256 + aByte[24] * 65536;
      }
    }
  }
}