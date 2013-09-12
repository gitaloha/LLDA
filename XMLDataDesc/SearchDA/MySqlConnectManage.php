<?php

class MySqlConnectManage
{ 
	protected $mySqlConnection;
	protected $mySqlStmt;
	protected static $instance;
	
	public function closeConnect()
	{
		if(isset($this->mySqlConnection))
		{
			$this->mySqlConnection->close();
			unset($this->mySqlConnection);
		}
		
		$this->closeMySqlStmt();
	}
	
	protected function closeMySqlStmt()
	{
		if(isset($this->mySqlStmt))
		{
			$this->mySqlStmt->close();
			unset($this->mySqlStmt);
		}
	}
	
	public function openConnection($dbHost,$dbName,$dbUser,$dbPassword,$dbPort = NULL)
	{	
		if(isset(self::$instance))
		{
			return;
		}
		
        if($dbPort == NULL)
        {
            $dbPort = ini_get('mysqli.default_port');
        }
        
        $this->closeConnect();
        
        $this->mySqlConnection = new mysqli($dbHost,$dbUser,$dbPassword,$dbName,$dbPort);
		if($this->mySqlConnection -> connect_error)
		{
			throw new LLDAException(ErrorCode::dbConnectError,$this->mySqlConnection->error);
		}
		
		$this->mySqlConnection->set_charset("utf8");
	}
	
	public function __construct($dbHost,$dbName,$dbUser,$dbPassword,$dbPort = NULL)
	{
		$this->openConnection($dbHost,$dbName,$dbUser,$dbPassword,$dbPort);
		self::$instance = $this;
	}
	
	public function getMySqlStmt(&$prepareSqlString)
	{
		$this->closeMySqlStmt();
		
		if(!isset($this->mySqlConnection))
		{
			throw new LLDAException(ErrorCode::dbConnectError,$this->mySqlConnection->error);
		}
		
		$this->mySqlStmt = $this->mySqlConnection ->prepare($prepareSqlString);
		if(empty($this->mySqlStmt))
		{
			throw new LLDAException(ErrorCode::dbAccessEorror,$this->mySqlConnection->error);
		}
		
		return $this->mySqlStmt;
	}
	
	public function __destruct ()
	{
		$this->closeConnection();
	}
	
	public static function getInstance()
	{
		return self::$instance;
	}
}

?>