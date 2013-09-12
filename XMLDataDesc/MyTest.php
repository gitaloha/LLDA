<?php
require 'AutoLoader.php';

function TestCoordSingleLine()
{
	$coodLines = new CoordLines('the single line',CoordType::line,"the data for single line","this is a test");
	$coodLines->SetXInterVal(10);
	$coodLines->SetYInterVal(10);
	$coodLines->setXMin(0);
	$coodLines->SetYMin(0);
	$coodLines->SetXMax(100);
	$coodLines->SetYMax(100);
	$coodLines->SetXUnit(0);
	$coodLines->SetYUnit(0);
	
	$coordLine = new CoordLine('line');
	for($i = 0; $i<10; ++$i)
	{
		$coordLine->AddPoint(new LinePoint(rand(1,100), rand(1,100)));
	}
	$coodLines->AddLine($coordLine);
	
	$lldaData = new LLDAData($coodLines);
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda = new LLDAXMLReturn();
	$llda->SetLLDAException($lldaError);
	$llda->AddLLDAData($lldaData);
	
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

function TestCoordMultiLines()
{
	$coodLines = new CoordLines('the multi lines',CoordType::line,"the data for multi lines","this is a test");
	$coodLines->SetXInterVal(10);
	$coodLines->SetYInterVal(10);
	$coodLines->setXMin(0);
	$coodLines->SetYMin(0);
	$coodLines->SetXMax(100);
	$coodLines->SetYMax(100);
	$coodLines->SetXUnit(0);
	$coodLines->SetYUnit(0);
	
	$llda = new LLDAXMLReturn();
	
	for($lineCount = 0; $lineCount < 3; ++$lineCount)
	{
		$coordLine = new CoordLine('line'.$lineCount);
		for($i = 0; $i<10; ++$i)
		{
			$coordLine->AddPoint(new LinePoint(rand(1,100), rand(1,100)));
		}
		$coodLines->AddLine($coordLine);
	}
	$lldaData = new LLDAData($coodLines);
	$llda->AddLLDAData($lldaData);
	
	
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda->SetLLDAException($lldaError);
	
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

function TestSingleBar()
{
	$coodLines = new CoordLines('the single bar',CoordType::bar,"the data for single bar","this is a test");
	$coodLines->SetXInterVal(10);
	$coodLines->SetYInterVal(10);
	$coodLines->setXMin(0);
	$coodLines->SetYMin(0);
	$coodLines->SetXMax(100);
	$coodLines->SetYMax(100);
	$coodLines->SetXUnit(0);
	$coodLines->SetYUnit(0);
	
	for($lineCount = 1;$lineCount < 6; ++$lineCount)
	{
		$coordLine = new CoordLine('bar'.$lineCount);
		$coordLine->AddPoint(new LinePoint(rand(1,100), rand(1,100)));
		$coodLines->AddLine($coordLine);
	}
	
	$lldaData = new LLDAData($coodLines);
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda = new LLDAXMLReturn();
	$llda->SetLLDAException($lldaError);
	$llda->AddLLDAData($lldaData);
	
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

function TestSingleBars()
{
	$coodLines = new CoordLines('the single bars',CoordType::line,"the data for single bars","this is a test");
	$coodLines->SetXInterVal(10);
	$coodLines->SetYInterVal(10);
	$coodLines->setXMin(0);
	$coodLines->SetYMin(0);
	$coodLines->SetXMax(100);
	$coodLines->SetYMax(100);
	$coodLines->SetXUnit(0);
	$coodLines->SetYUnit(0);
	

	$coordLine = new CoordLine('bar');
	for($i = 0; $i<10; ++$i)
	{
		$coordLine->AddPoint(new LinePoint(rand(1,100), rand(1,100)));
	}
	$coodLines->AddLine($coordLine);
	
	$lldaData = new LLDAData($coodLines);
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda = new LLDAXMLReturn();
	$llda->SetLLDAException($lldaError);
	$llda->AddLLDAData($lldaData);
	
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

function TestMultiBars()
{
	$coodLines = new CoordLines('the Multi Bars',CoordType::bar,"the data for MultiBar","this is a test");
	$coodLines->SetXInterVal(10);
	$coodLines->SetYInterVal(10);
	$coodLines->setXMin(0);
	$coodLines->SetYMin(0);
	$coodLines->SetXMax(100);
	$coodLines->SetYMax(100);
	$coodLines->SetXUnit(0);
	$coodLines->SetYUnit(0);
	
	for($m = 0; $m < 5; ++$m)
	{
		$coordLine = new CoordLine('bar'.$m);
		for($i = 0; $i<10; ++$i)
		{
			$coordLine->AddPoint(new LinePoint(rand(1,100), rand(1,100)));
		}
		$coodLines->AddLine($coordLine);
	}
	
	$lldaData = new LLDAData($coodLines);
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda = new LLDAXMLReturn();
	$llda->SetLLDAException($lldaError);
	$llda->AddLLDAData($lldaData);
	
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

function TestCoordPies()
{
	$coordPies = new CoordPies("my Multi Pies",CoordType::pie,"This is for Multi pies test","this is a test");
	
	for($pieCount = 0; $pieCount < 3; ++ $pieCount)
	{
		$coordPie = new CoordPie("myFrist".$pieCount);
		for($i = 0;$i < 10; $i++)
		{
			$coordPie->AddSector(new PieSector($i, rand(1,100)));
		}
		
		$coordPies->AddPie($coordPie);
	}
	
	$lldaData = new LLDAData($coordPies);
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda = new LLDAXMLReturn();
	$llda->SetLLDAException($lldaError);
	$llda->AddLLDAData($lldaData);
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

function TestCoordPie()
{
	$coordPies = new CoordPies("my Multi Pies",CoordType::pie,"This is for Multi pies test","this is a test");
	

	$coordPie = new CoordPie("myFristPie");
	for($i = 0;$i < 10; $i++)
	{
		$coordPie->AddSector(new PieSector($i, rand(1,100)));
	}
	
	$coordPies->AddPie($coordPie);
	
	$lldaData = new LLDAData($coordPies);
	$lldaError = new LLDAException(ErrorCode::sucessCode);
	$llda = new LLDAXMLReturn();
	$llda->SetLLDAException($lldaError);
	$llda->AddLLDAData($lldaData);
	header('Content-Type: text/xml');
	die($llda->ToXML());
}

$cmd = $_GET['cmd'];
switch ($cmd)
{
	case 1:
		call_user_func('TestCoordSingleLine');
		break;
	case 2:
		call_user_func('TestCoordMultiLines');
		break;
	case 3:
		call_user_func('TestSingleBar');
		break;
	case 4:
		call_user_func('TestSingleBars');
		break;
	case 5:
		call_user_func('TestMultiBars');
		break;
	case 6:
		call_user_func('TestCoordPie');
		break;
	case 7:
		call_user_func('TestCoordPies');
		break;
}

?>