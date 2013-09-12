<?php
class ErrorDesc 
{
	private static  $errorDescs = array(
			ErrorCode::unknowError => "unknow error",
			
			ErrorCode::paramEmpty => "paramer is empty",
			ErrorCode::paramOverlong => "paramer is over long",
			ErrorCode::endDateError => "endDate is smaller then beginDate",
			ErrorCode::dateFormatError => "it is not fit date format string",
			
			ErrorCode::dbConnectError => "data base connect error",
			ErrorCode::dbAccessEorror => "data base access error"
	);
	
	private static $errorPrompts = array(
			ErrorCode::unknowError => "there is a unknow error"
	);
	
	public static function GetErrorDesc($errorCode)
	{
		if(isset(self::$errorDescs[$errorCode]))
		{
			return self::$errorDescs[$errorCode];
		}
		
		return NULL;
	}
	
	public static function GetErrorPrompt($errorCode)
	{
		if(isset(self::$errorPrompts[$errorCode]))
		{
			return self::$errorPrompts[$errorCode];
		}
		
		return NULL;
	}
}

?>