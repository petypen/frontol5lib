// Путь к базе данных Frontol5
// аргумент функции cPathVariant - строковой литерал со значением:
//		* OnlyPath - по умолчанию - функция возвращает только путь к БД (E:\BASE\POSBASE\FT_5_TRADE\)
//		* HostAndPath - функция возвращает хост и путь к БД (localhost:E:\BASE\POSBASE\FT_5_TRADE\)
// возвращает строку, содержащую путь к БД Frontol или пустую строку, в случае ошибки
function GetPathDBFrontol5(cPathVariant) {

	var cFrontolIniFileName = "Frontol.ini";
	var cFrontolIniFile = "";
	var cPathDB = "";
	var cString = "";
	var FOR_READING = 1;
	var TRISTATE_UNICODE = -1; // Использовать для Windows-7
	// var TRISTATE_ASCII = 0; // Использовать для Windows-XP
	
	if (cPathVariant==undefined || cPathVariant!="HostAndPath") {
		cPathVariant = 'OnlyPath';
	}
	
	var oFileSystem = new ActiveXObject("Scripting.FileSystemObject");

	// файл FronTol.ini может находиться или ProgramFiles или ProgramData
	// поиск папки \ProgramData\ATOL\Frontol5 на системном диске
	var Folderspec = 0; // каталог Windows
	var cSystemDrive = oFileSystem.GetSpecialFolder(Folderspec).Path.match(/\D:/i);
	if (cSystemDrive===null) {
		cSystemDrive = "C:";
	}

	var cPathProgramData = "\\ProgramData\\ATOL\\Frontol5\\Settings";  
	if (oFileSystem.FolderExists(cSystemDrive+cPathProgramData)) {
		cFrontolIniFile = cSystemDrive + cPathProgramData + "\\" + cFrontolIniFileName;
	}else{
		cFrontolIniFile = oFileSystem.GetAbsolutePathName("") + "\\" + cFrontolIniFileName;	
	}
	
	try {
		var TextStream = oFileSystem.OpenTextFile(cFrontolIniFile, FOR_READING, false, TRISTATE_UNICODE);
		while (!TextStream.AtEndOfStream) {
			cString = TextStream.ReadLine();
			if (/path=/i.test(cString)) {
				if (cPathVariant=="HostAndPath") {
					cPathDB = cString.substr(5, cString.length);	
				}else{
					cPathDB = cString.substr(5, cString.length).replace(/[\w\.]{2,}:/i,"");
				}
				break;
			}
		}
		TextStream.Close();
	}
	catch (error) {
		if (error.message == "") {
			throw error; // генерация ошибки
		} else {
			switch (error.number) {
				case -2146828218:
					frontol.actions.showError("Нет доступа для чтения файла " + cFrontolIniFile);
					break;
				case -2146828235:
					frontol.actions.showError("Файл " + cFrontolIniFile + " не найден.");
					break;
				default:
					frontol.actions.showError("Неизвестная ошибка : " + error.number + " " + error.message + " при работе с файлом " + cFrontolIniFile);
			}
		}
	}
	finally {
		TextStream.Close();
	}
	
	return cPathDB;
}