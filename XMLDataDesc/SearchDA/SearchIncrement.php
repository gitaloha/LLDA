<?php
class SearchIncrement 
{
	private static function GetData($mysqlSmt)
	{
		if(!$mysqlSmt->execute())
		{
			throw new LLDAException(ErrorCode::dbAccessEorror,$mysqlSmt->errno);
		}
		
		$increment = NULL;
		$create_time = NULL;
		
		$mysqlSmt->bind_result($increment,$create_time);
		
		$retValArray = array();
		while ($mysqlSmt->fetch())
		{
			if(!empty($create_time) && !empty($increment))
			{
				$retValArray[$create_time] = $increment;
			}
		}
		
		return $retValArray;
	} 
	
	public static function GetSearchCountofDay($beginDate,$endDate)
	{
		$queryString = "select increment,create_time from search_increment where factor=? and create_time>=? and create_time<=?";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::search;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetSearchCountofMonth($beginDate,$endDate)
	{
		$queryString = "select sum(increment) as increment,DATE_FORMAT(create_time,'%Y-%m') as create_time 
				from search_increment where factor=? and create_time>=? and create_time<=? group by DATE_FORMAT(create_time,'%Y-%m')";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::search;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetGotoDetailCountofDay($beginDate,$endDate)
	{
		$queryString = "select increment,create_time from search_increment where factor=? and create_time>=? and create_time<=?";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::gotodetail;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetGotoDetailCountofMonth($beginDate,$endDate)
	{
		$queryString = "select sum(increment) as increment,DATE_FORMAT(create_time,'%Y-%m') as create_time 
				from search_increment where factor=? and create_time>=? and create_time<=? group by DATE_FORMAT(create_time,'%Y-%m')";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::gotodetail;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetAddtoCartCountofDay($beginDate,$endDate)
	{
		$queryString = "select increment,create_time from search_increment where factor=? and create_time>=? and create_time<=?";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::addtocart;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetAddtoCartCountofMonth($beginDate,$endDate)
	{
		$queryString = "select sum(increment) as increment,DATE_FORMAT(create_time,'%Y-%m') as create_time 
				from search_increment where factor=? and create_time>=? and create_time<=? group by DATE_FORMAT(create_time,'%Y-%m')";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::addtocart;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetSearchUsersofDay($beginDate,$endDate)
	{
		$queryString = "select increment,create_time from search_increment where factor=? and create_time>=? and create_time<=?";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::searchusers;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
	
	public static function GetSearchUsersofMonth($beginDate, $endDate)
	{
		$queryString = "select sum(increment) as increment,DATE_FORMAT(create_time,'%Y-%m') as create_time 
				from search_increment where factor=? and create_time>=? and create_time<=? group by DATE_FORMAT(create_time,'%Y-%m')";
		$mysqlSmt = MySqlConnectManage::getInstance()->getMySqlStmt($queryString);
		$type = SearchIncrementType::searchusers;
		$mysqlSmt->bind_param('iss',$type,$beginDate,$endDate);
		
		return self::GetData($mysqlSmt);
	}
}

?>