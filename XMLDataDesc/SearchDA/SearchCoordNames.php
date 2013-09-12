<?php
class SearchCoordNames 
{
	private static $coordNames = array(
//			InterfaceType::GetSearchCountOfDay
	); 
	
	private static $coordSubNames = array(
			InterfaceType::GetSearchCountOfDay => 'The every day search count',
			InterfaceType::GetSearchCountofMonth => 'The every month search count',
			
			InterfaceType::GetGotoDetailCountOfDay => 'The count of gotodetail by using search every day',
			InterfaceType::GetGotoDetailCountOfMonth => 'The count of gotodetail by using search every month',
			
			InterfaceType::GetAddtoCartCountOfDay => 'The count of addtocart by using search every day',
			InterfaceType::GetAddtoCartCountOfMonth => 'The count of addtocart by using search every month',
			
			InterfaceType::GetSearchUsersofDay => 'The count of user who use search every day',
			InterfaceType::GetSearchUsersofMonth => 'The count of user who use search every month'
	);
	
	private static $coordDescs = array(
			InterfaceType::GetSearchCountOfDay => 'The every day search count',
			InterfaceType::GetSearchCountofMonth => 'The every month search count',
			
			InterfaceType::GetGotoDetailCountOfDay => 'The count of gotodetail by using search every day',
			InterfaceType::GetGotoDetailCountOfMonth => 'The count of gotodetail by using search every month',
			
			InterfaceType::GetAddtoCartCountOfDay => 'The count of addtocart by using search every day',
			InterfaceType::GetAddtoCartCountOfMonth => 'The count of addtocart by using search every month',
			
			InterfaceType::GetSearchUsersofDay => 'The count of user who use search every day',
			InterfaceType::GetSearchUsersofMonth => 'The count of user who use search every month'
	);
	
	public static function GetCoordSubName($interfaceType)
	{
		if(isset(self::$coordSubNames[$interfaceType]))
		{
			return self::$coordSubNames[$interfaceType];
		}
		
		return NULL;
	}
	
	public static function GetCoordDesc($interfaceType)
	{
		if(isset(self::$coordDescs[$interfaceType]))
		{
			return self::$coordDescs[$interfaceType];
		}
		
		return NULL;
	}
}

?>