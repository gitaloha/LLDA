<?php
class LLDAException extends Exception implements ICoordinator
{
	private $extend;
	private $prompt;
	
	public function __construct($errorCode,$errorExtend = NULL)
	{
		parent::__construct(ErrorDesc::GetErrorDesc($errorCode),$errorCode);
		$this->extend = $errorExtend;
		$this->prompt = ErrorDesc::GetErrorPrompt($errorCode);
	}
	
	public function GetExtend()
	{
		return $this->extend;
	}
	
	public function GetPrompt()
	{
		return $this->prompt;
	}
	
	public function ToXML()
	{
		$retVal = "<error>\n
				<errorCode>".$this->getCode()."</errorCode>\n";
		if(0 != $this->getCode())
		{
			$retVal .= "<errorMessage>".$this->getMessage()."</errorMessage>\n
				<errorExtend>".$this->GetExtend()."</errorExtend>\n
				<errorPrompt>".$this->GetPrompt()."</errorPrompt>\n";
		}
		$retVal .= "</error>\n";			
		
		return $retVal;
	}
}

?>