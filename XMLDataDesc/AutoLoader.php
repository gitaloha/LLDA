<?php
spl_autoload_register(array('AutoLoader','AutoLoad'));

class AutoLoader
{
	private static $loaderClass = array(
			'CoordBase' => '/CoordBase.php',
			'CoordLine' => '/CoordLine.php',
			'CoordLines' => '/CoordLines.php',
			'CoordPie' => '/CoordPie.php',
			'CoordPies' => '/CoordPies.php',
			'CoordType' => '/CoordType.php',
			'ErrorCode' => '/ErrorCode.php',
			'ErrorDesc' => '/ErrorDesc.php',
			'ICoordinator' => '/ICoordinator.php',
			'LinePoint' => '/LinePoint.php',
			'LLDAData' => '/LLDAData.php',
			'LLDADataType' => '/LLDADataType.php',
			'LLDAException' => '/LLDAException.php',
			'LLDAXMLReturn' => '/LLDAXMLReturn.php',
			'PieSector' => '/PieSector.php',
			'ArrayMaxMin' =>'/SearchDA/ArrayMaxMin.php',
			'DBConfig' => '/SearchDA/DBConfig.php',
			'GetParamter' => '/SearchDA/GetParamter.php',
			'InterfaceType' => '/SearchDA/InterfaceType.php',
			'MySqlConnectManage' => '/SearchDA/MySqlConnectManage.php',
			'SearchCoordNames' => '/SearchDA/SearchCoordNames.php',
			'SearchDA' => '/SearchDA/SearchDA.php',
			'SearchIncrement' => '/SearchDA/SearchIncrement.php',
			'SearchIncrementType' => '/SearchDA/SearchIncrementType.php',
			'SearchDAResponse' => '/SearchDA/SearchDAResponse.php'
	);
	
	public static function AutoLoad($className)
	{
		if(isset(self::$loaderClass[$className]))
		{
			include dirname(__FILE__).self::$loaderClass[$className];
		}
	}
}

?>