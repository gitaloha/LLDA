<?php
class SearchDA
{
	private static $mysql;
	
	private static function ConnectDB()
	{
		self::$mysql = new MySqlConnectManage(DBConfig::dbHost, DBConfig::dbName, DBConfig::dbUser, DBConfig::dbPassword,DBConfig::dbPort);
	}
	
	private static function DisconnectDB()
	{
		self::$mysql-> closeConnect();
	}
	
	
	public static function GetSearchCountofDay()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$searchCount = SearchIncrement::GetSearchCountofDay($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetSearchCountOfDay, $searchCount);
	} 
	
	public static function GetSearchCountOfMonth()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$searchCount = SearchIncrement::GetSearchUsersofMonth($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetSearchCountofMonth, $searchCount);
	}
	
	public static function GetGotoDetailCountOfDay()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$gotoCount = SearchIncrement::GetGotoDetailCountofDay($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetGotoDetailCountOfDay, $gotoCount);
	}
	
	public static function GetGotoDetailCountofMonth()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$gotoCount = SearchIncrement::GetGotoDetailCountofMonth($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetGotoDetailCountOfMonth, $gotoCount);
	}
	
	public static function GetAddtoCartCountofDay()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$addcartCount = SearchIncrement::GetAddtoCartCountofDay($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetAddtoCartCountOfDay, $addcartCount);
	}
	
	public static function GetAddtoCartCountofMonth()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$addcartCount = SearchIncrement::GetAddtoCartCountofMonth($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetAddtoCartCountOfMonth, $addcartCount);
	}
	
	public static function GetSearchUsersofDay()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$addcartCount = SearchIncrement::GetSearchUsersofDay($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetSearchUsersofDay, $addcartCount);
	}
	
	public static function GetSearchUsersofMonth()
	{
		$beginDate = GetParamter::GetBeginTime();
		$endDate = GetParamter::GetEndTime();
		if($endDate < $beginDate)
		{
			throw new LLDAException(ErrorCode::endDateError);
		}
		
		self::ConnectDB();
		$addcartCount = SearchIncrement::GetSearchUsersofMonth($beginDate, $endDate);
		self::DisconnectDB();
		
		SearchDAResponse::IncrementLinesRespone($beginDate.' - '.$endDate, InterfaceType::GetSearchUsersofMonth, $addcartCount);
	}
}

?>