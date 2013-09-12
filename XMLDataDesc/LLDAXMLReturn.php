<?php
class LLDAXMLReturn implements ICoordinator
{
	private $data = array();
	private $error;
	private $xmlCharactor = array('<' => '&lt;','>' => '&gt;','&'=>'&amp;','\''=>'$apos;','"' => '&quot;');
	
	public function SetLLDAException($llDaException)
	{
		if($llDaException instanceof LLDAException)
		{
			$this->error = $llDaException;
			return true;
		}
		return false;
	}
	
	public function AddLLDAData($llDaData)
	{
		if($llDaData instanceof LLDAData)
		{
			array_push($this->data, $llDaData);
			return true;
		}
		return false;
	}
	
	
	public function ToXML()
	{
		$document = new DOMDocument();
		$retVal = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<LLDA>";
		if(isset($this->error))
		{
			$retVal .= $this->error->ToXML();
		}
		foreach ($this->data as $lldata)
		{
			$retVal .= $lldata->ToXML();
		}
		$retVal .= '</LLDA>';	
		$document->loadXML($retVal);
		return $document->saveXML();
		//return $retVal;
	}
}

?>