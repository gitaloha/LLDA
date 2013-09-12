<?php
class CoordLine implements ICoordinator
{
	private $lineTag;
	private $linePoints = array();
	
	public function __construct($lineTag)
	{
		$this->lineTag = $lineTag;
	}
	
	public function AddPoint($Point)
	{
		array_push($this->linePoints,$Point);
	}
	
	/*
	 * @Param $pointArray <p> The array should be like x => y;</p>
	 */
	public function AddPoints($pointArray)
	{
		foreach ($pointArray as $x => $y)
		{
			$point = new LinePoint($x, $y);
			array_push($this->linePoints, $point);
		}
	}
	
	public function GetLineTag()
	{
		return $this->lineTag;
	}
	
	public function GetLinePoints()
	{
		return $this->linePoints;
	}
	
	public function ToXML()
	{
		$retVal = "<lineData>\n
				 <lineTag>$this->lineTag</lineTag>\n";
		foreach ($this->linePoints as $point)
		{
			$retVal .= $point->ToXML();
		}
		$retVal .= "</lineData>\n";
		return $retVal;
	}
}

?>