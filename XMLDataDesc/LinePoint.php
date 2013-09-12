<?php
class LinePoint implements ICoordinator
{
	private $x;
	private $y;
	
	public function __construct($x,$y)
	{
		$this->x = $x;
		$this->y = $y;
	}
	
	public  function GetX()
	{
		return $this->x;
	}
	
	public function GetY()
	{
		return $this->y;
	}
	
	public function ToXML()
	{
		return "<Point>\n
		<x>$this->x</x>\n
		<y>$this->y</y>\n
		</Point>\n";
	}
}

?>