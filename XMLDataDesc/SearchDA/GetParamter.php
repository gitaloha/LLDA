<?php
class GetParamter 
{
	public static function GetCmd($enableNull = false, $maxlength = 32)
	{
		$param = $_GET['cmd'] == NULL ? $_POST['cmd'] : $_GET['cmd'];
		
		if(!$enableNull && empty($param))
		{
			throw new LLDAException(ErrorCode::paramEmpty,'cmd');
		}
		if($maxlength < strlen($param))
		{
			throw new LLDAException(ErrorCode::paramOverlong,'cmd');
		}
		
		return $param;
	}
	
	public static function GetBeginTime($enableNull = false,$maxlength = 32)
	{
		$param = $_GET['begindate'] == NULL ? $_POST['begindate'] : $_GET['begindate'];
		
		if(!$enableNull && empty($param))
		{
			throw new LLDAException(ErrorCode::paramEmpty,'begindate');
		}
		if($maxlength < strlen($param))
		{
			throw new LLDAException(ErrorCode::paramOverlong,'begindate');
		}
		
		return $param;
	}
	
	public static function GetEndTime($enableNull = false, $maxlength = 32)
	{
		$param = $_GET['enddate'] == NULL ? $_POST['enddate'] : $_GET['enddate'];
		
		if(!$enableNull && empty($param))
		{
			throw new LLDAException(ErrorCode::paramEmpty,'enddate');
		}
		if($maxlength < strlen($param))
		{
			throw new LLDAException(ErrorCode::paramOverlong,'enddate');
		}
		
		return $param;
	}
	
	public static function GetFlag($enableNull = false, $maxlength = 16)
	{
		$param = $_GET['flag'] == NULL ? $_POST['flag'] : $_GET['flag'];
		
		if(!$enableNull && empty($param))
		{
			throw new LLDAException(ErrorCode::paramEmpty,'flag');
		}
		if($maxlength < strlen($param))
		{
			throw new LLDAException(ErrorCode::paramOverlong,'flag');
		}
		
		return $param;
	}
}

?>