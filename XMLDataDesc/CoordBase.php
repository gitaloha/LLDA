<?php
//this class is the parent class of the all chart.it is only define the chart type and char name
class CoordBase implements ICoordinator
{
	private $coordType;
	private $coordName;
	private $coordSubName;
	private $coordDesc;
	
	public function __construct($coordType,$coordName,$coordSubName = NULL,$coordDesc = NULL)
	{
		$this->coordType = $coordType;
		$this->coordName = $coordName;
		$this->coordSubName = $coordSubName;
		$this->coordDesc = $coordDesc;
	}
	
	public function GetCoordType()
	{
		return $this->coordType;
	}
	
	public function GetCoordName()
	{
		return $this->coordName;
	}
	
	public function GetCoordSubName()
	{
		return $this->coordSubName;
	}
	
	public function GetCoordDesc()
	{
		return $this->coordDesc;
	}
	
	public function ToXML()
	{
		$retVal = "<coordType>$this->coordType</coordType>\n
				   <coordName>$this->coordName</coordName>\n
				   <coordSubName>$this->coordSubName</coordSubName>\n
				   <coordDesc>$this->coordDesc</coordDesc>\n";
		return $retVal;
	}
	
}

?>