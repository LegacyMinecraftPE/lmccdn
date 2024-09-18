<?php
/*
__PocketMine Plugin__
name=AdvancedDiscordChat
description=Intergration to make messages from discord visible in game
version=1.1
author=GameHerobrine
class=ADC
apiversion=12.1
*/

class ADC implements Plugin{
	private $api, $cfg, $password;
	const emojiRegex = "([*#0-9](?>\\xEF\\xB8\\x8F)?\\xE2\\x83\\xA3|\\xC2[\\xA9\\xAE]|\\xE2..(\\xF0\\x9F\\x8F[\\xBB-\\xBF])?(?>\\xEF\\xB8\\x8F)?|\\xE3(?>\\x80[\\xB0\\xBD]|\\x8A[\\x97\\x99])(?>\\xEF\\xB8\\x8F)?|\\xF0\\x9F(?>[\\x80-\\x86].(?>\\xEF\\xB8\\x8F)?|\\x87.\\xF0\\x9F\\x87.|..(\\xF0\\x9F\\x8F[\\xBB-\\xBF])?|(((?<zwj>\\xE2\\x80\\x8D)\\xE2\\x9D\\xA4\\xEF\\xB8\\x8F\k<zwj>\\xF0\\x9F..(\k<zwj>\\xF0\\x9F\\x91.)?|(\\xE2\\x80\\x8D\\xF0\\x9F\\x91.){2,3}))?))";
	private static $allowedPassSymbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890";
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	private function generatePassword(){
		$al = strlen(ADC::$allowedPassSymbols) - 1;
		$pass = "";
		for($i = 0; $i < 16; $i++){
			$pass = $pass . ADC::$allowedPassSymbols[rand(0, $al)];
		}
		return $pass;
		
	}
	
	private function handleMessageSend($data){
		$decData = json_decode($data['buffer'], true);
		if(isset($decData['pass']) && $decData['pass'] == $this->password){
			if(NewNCUtils::hasEmoji($decData["msg"])){
				return;
			}
			$this->api->chat->send(false, "[Discord] ".$decData['msg']);
		}
	}
	
	private function setupConfig(){
		new Config($this->api->plugin->configPath($this)."ADC.yml", CONFIG_YAML, array());
		$this->cfg = $this->api->plugin->readYAML($this->api->plugin->configPath($this) . "ADC.yml");
		if(!isset($this->cfg["password"])){
			console("[INFO] ADC: Password is not found, creating new...");
			$this->cfg["password"] = $this->generatePassword();
			$this->api->plugin->writeYAML($this->api->plugin->configPath($this)."ADC.yml", $this->cfg);
		}
		$this->password = $this->cfg["password"];
		unset($this->cfg);
	}
	
	public function init(){
		$this->api->addHandler("mcinterface.read", array($this, "eventHandler"));
		$this->setupConfig();
	}
	public function eventHandler($data, $event)
	{
		
		switch($event){
			case "mcinterface.read":
				$this->handleMessageSend($data);
		}
	
	}
	
	public function __destruct(){}
}


class NewNCUtils{

	public static function hasEmoji($s){
		return preg_match(ADC::emojiRegex, $s, $matches);
	}

}
