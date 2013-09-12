<?php
require 'AutoLoader.php';

try 
{
	$cmd = GetParamter::GetCmd();
	
	call_user_func(array('SearchDA',$cmd));
}
catch (Exception $e)
{
	if($e instanceof LLDAException)
	{
		$lldaReturn = new LLDAXMLReturn();
		$lldaReturn->SetLLDAException($e);
		
		header('Content-Type: text/xml');
		die($lldaReturn->ToXML());
	}
	else 
	{
		die($e->getCode().$e->getMessage());
	}
}

?>