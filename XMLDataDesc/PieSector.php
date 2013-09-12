<?php
class PieSector implements ICoordinator
{
	private $sectorTag;
	private $sectorValue;
	
	public function __construct($sectorTag,$sectorValue)
	{
		$this->sectorTag = $sectorTag;
		$this->sectorValue = $sectorValue;
	}
	
	public function GetSectorTag()
	{
		return $this->sectorTag;
	}
	
	public function GetSectorValue()
	{
		return $this->sectorValue;
	}
	
	public function ToXML()
	{
		$retVal = "<sector>\n
					<sectorTag>$this->sectorTag</sectorTag>\n
					<sectorValue>$this->sectorValue</sectorValue>\n
					</sector>\n";
		return $retVal;
	}
}

?>