<?php
class SearchDAResponse 
{
	public static function  IncrementLinesRespone($coordName,$interfaceType,$linePoints)
	{
		$line = new CoordLine(NULL);
		$line ->AddPoints($linePoints);
		
		$lines = new CoordLines($coordName,CoordType::line,
				SearchCoordNames::GetCoordSubName($interfaceType),
				SearchCoordNames::GetCoordDesc($interfaceType));
		$lines->AddLine($line);
		$lines->SetXUnit('day');
		$maxmin = new ArrayMaxMin($linePoints);
		$lines->SetYMin($maxmin->GetMin());
		$lines->SetYMax($maxmin->GetMax());
		$lines->SetXMin($beginDate);
		$lines->SetXMax($endDate);
		
		$llda = new LLDAData($lines);
		$lldaError = new LLDAException(ErrorCode::sucessCode);
		$lldaReturn = new LLDAXMLReturn();
		$lldaReturn->SetLLDAException($lldaError);
		$lldaReturn->AddLLDAData($llda);
		
		header('Content-Type: text/xml');
		die($llda->ToXML());
	}
}

?>