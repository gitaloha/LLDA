<?php
class CoordPies extends CoordBase 
{
	private $pieCount = 0;
	private $pies = array();
	
	public function __construct($coordName,$coordSubName = NULL, $coordDesc = NULL)
	{		
		parent::__construct(CoordType::pie, $coordName,$coordSubName,$coordDesc);
	}
	
	public function GetPies()
	{
		return $this->pies;
	}
	
	public function AddPie($pie)
	{
		if($pie instanceof CoordPie)
		{
			array_push($this->pies, $pie);
			$this->pieCount++;
			//return true;
		}
		return false;
	}
	
	public function ToXML()
	{
		$retVal = "<coordinator>\n".parent::ToXML()."<pieCount>$this->pieCount</pieCount>\n";
		foreach ($this->pies as $pie)
		{
			$retVal .= $pie->ToXML();
		}
		$retVal .= "</coordinator>\n";
		return $retVal;
	}
}

?>