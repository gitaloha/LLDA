<?php
class ArrayMaxMin 
{
	private $max;
	private $min;
	private $array;
	
	private function GetMaxMin()
	{
		if(empty($this->array))
		{
			return;
		}

		$this->max = current($this->array);
		$this->min = $this->max;
		
		foreach ($this->array as $itemVale)
		{
			if($this->max < $itemVale)
			{
				$this->max = $itemVale;
			}
			if($this->min > $itemVale)
			{
				$this->min = $itemVale;
			}
		}
	}
	
	public function __construct($array)
	{
		$this->array = $array;
	}
	
	public function GetMax()
	{
		if(!isset($this->max))
		{
			$this->GetMaxMin();
		}
		return $this->max;
	}
	
	public function GetMin()
	{
		if(!isset($this->min))
		{
			$this->GetMaxMin();
		}
		return $this->min;
	}
}

?>