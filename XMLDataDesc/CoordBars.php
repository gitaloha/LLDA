<?php
class CoordBars extends CoordBase 
{
	private $xInterVal;
	private $yInterVal;
	private $xMax;
	private $yMax;
	private $xMin;
	private $yMin;
	private $xUnit;
	private $yUnit;
	private $lineCount = 0;
	private $lines = array();
	
	public function __construct($coordName,$coordType = CoordType::bar,$coordSubName = NULL, $coordDesc = NULL)
	{
		parent::__construct($coordType,$coordName,$coordSubName,$coordDesc);
	}
	
	public function SetXInterVal($xInterVal)
	{
		$this->xInterVal = $xInterVal;
	}
	
	public function SetYInterVal($yInterVal)
	{
		$this->yInterVal = $yInterVal;
	}
	
	public function SetXMax($xMax)
	{
		$this->xMax = $xMax;
	}
	
	public function SetYMax($yMax)
	{
		$this->yMax = $yMax;
	}
	
	public function SetXMin($xMin)
	{
		$this->xMin = $xMin;
	}
	
	public function SetYMin($yMin)
	{
		$this->yMin = $yMin;
	}

	public function SetXUnit($xUnit)
	{
		$this->xUnit = $xUnit;
	}
	
	public function SetYUnit($yUnit)
	{
		$this->yUnit = $yUnit;
	}
	
	public function  AddLine($line)
	{
		array_push($this->lines,$line);
		++ $this->lineCount;
	}
	
	
	public function ToXML()
	{
		$retVal = "<coordinator>\n".parent::ToXML()."
					<coordXInterVal>$this->xInterVal</coordXInterVal>\n
					<coordYInterVal>$this->yInterVal</coordYInterVal>\n
					<coordXUnit>$this->xUnit</coordXUnit>\n
					<coordYUnit>$this->yUnit</coordYUnit>\n
					<coordXMax>$this->xMax</coordXMax>\n
					<coordYMax>$this->yMax</coordYMax>\n
					<coordXMin>$this->xMin</coordXMin>\n
					<coordYMin>$this->yMin</coordYMin>\n
					<coordLineCount>$this->lineCount</coordLineCount>\n";
		foreach ($this->lines as $line)
		{
			$retVal .= $line->ToXML();
		}
		$retVal .= "</coordinator>\n";
		
		return $retVal;
	}
}

?>