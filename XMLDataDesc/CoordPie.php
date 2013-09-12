<?php
class CoordPie implements ICoordinator
{
	private $pieName;
	private $sectorCount = 0;
	private $sectors = array();
	
	public function __construct($pieName)
	{
		$this->pieName = $pieName;
	}
	
	public function GetSectors()
	{
		return $this->sectors;
	}
	
	public function AddSector($sector)
	{
		if($sector instanceof PieSector)
		{
			array_push($this->sectors, $sector);
			++ $this->sectorCount;
			return true;
		}
		return false;
	}
	
	public function ToXML()
	{
		$retVal = "<pie>\n
					<pieName>$this->pieName</pieName>\n
					<sectorCount>$this->sectorCount</sectorCount>\n";
		foreach ($this->sectors as $sector)
		{
			$retVal .= $sector->ToXML();
		}
		
		$retVal .= "</pie>\n";
		
		return $retVal;
	}
	
}

?>