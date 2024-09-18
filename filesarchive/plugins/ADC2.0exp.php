<?php
/*
__PocketMine Plugin__
name=AdvancedDiscordChat
description=Intergration to make messages from discord visible in game
version=2.0-Exp
author=GameHerobrine
class=ADC
apiversion=12.1
*/
/*
1.0 - First version, needs custom bot
2.0 - Does not require custom bot, experemental
*/
class ADC implements Plugin{
	private $api, $cfg, $channelID, $bot, $server, $timestamp = "", $first = true;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
		$this->server = ServerAPI::request();
	}
	
	private function setupConfig(){
		$create = true;
		new Config($this->api->plugin->configPath($this)."ADC.yml", CONFIG_YAML, array());
		$this->cfg = $this->api->plugin->readYAML($this->api->plugin->configPath($this) . "ADC.yml");
		if(isset($this->cfg["password"]) || !isset($this->cfg["TOKEN"])){
			console(isset($this->cfg["password"]));
			console("[INFO] ADC: Old config or no config Detected...");
			$this->cfg["TOKEN"] = "";
			$this->cfg["CHANNELID"] = "";
			$this->api->plugin->writeYAML($this->api->plugin->configPath($this)."ADC.yml", $this->cfg);
		}
		$this->token = $this->cfg["TOKEN"];
		$this->channel = $this->cfg["CHANNELID"];
		unset($this->cfg);
	}
	
	public function init(){
		$this->setupConfig();
		$this->api->addHandler(ADCConstants::CURL_GET_EVENT, array($this, "eventHandler"));
		$this->bot = new DiscordBot();
		$this->bot->init($this->channel, $this->token, $this->server);
		$this->startGettingMsgs();
	}
	public function startGettingMsgs(){
		$this->bot->asyncGetMsg();
		$this->server->schedule(26, array($this, "startGettingMsgs")); //25 - timeouts sometimes, you can try using lower/higher values
	}
	public function eventHandler($data, $event)
	{
		switch($event){
			case ADCConstants::CURL_GET_EVENT:
				$jsoned = substr($data["response"],1,-1);
				$current = explode(", {", $jsoned)[0]; //makes elements after 0 broken!
				$messageObj = json_decode($current, true);
				//var_dump($messageObj);
				if(!isset($messageObj["author"]["bot"]) && $this->timestamp != $messageObj["timestamp"]){
					$this->timestamp = $messageObj["timestamp"];
					if(!$this->first){
						$this->api->chat->send(false, $messageObj["author"]["username"]." : ". $messageObj["content"]);
					}else{
						$this->first = false;
					}
				}
				unset($messageObj);
				unset($current);
				unset($jsoned);
				
		}
	}

	public function __destruct(){}
}

class ADCConstants{
	const CURL_GET_EVENT = "async.curl.get";
}

class DiscordBot{
	public static $ENTRYPOINT = "";
	public $channelID, $token, $server;
	public function init($channel, $token, $server){
		$this->channelID = $channel;
		$this->server = $server;
		$this->token = $token;
		$this->generateEntrypoint();
		console(DiscordBot::$ENTRYPOINT);
	}
	public function generateEntrypoint(){
		DiscordBot::$ENTRYPOINT = "https://discord.com/api/channels/".$this->channelID."/messages";
	}
	
	public function asyncGetMsg(){
		$this->server->asyncOperation(ASYNC_CURL_GET, [
				"url" => DiscordBot::$ENTRYPOINT,
				"headers" => array("Authorization" => "Bot ".$this->token)
			], null);
	}
	
}
