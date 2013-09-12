<?php
class LLDAData 
{
	private $dataType;
	private $lldaData;
	
	public function __construct($lldaData)
	{
		if($lldaData instanceof CoordLines || $lldaData instanceof CoordPies)
		{
			$this->dataType = LLDADataType::coordinator;
		}
		
		$this->lldaData = $lldaData;
	}
	
	public function ToXML()
	{
		$retVal = "<data>\n
				<dataType>$this->dataType</dataType>\n";
		$retVal .= $this->lldaData->ToXML();
		$retVal .= '</data>';
		
		return $retVal;
	}
}

?>