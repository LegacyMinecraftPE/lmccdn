<?php 

/*
 __PocketMine Plugin__
name=RuinPvP
description=The WorldBest(?) PvP manager plugin!
version=1.0.2
author=Cha0sRuin
class=RuinPvP
apiversion=11
*/

class RuinPvP implements Plugin
{
	private $api, $config, $path;
	

	public function __construct(ServerAPI $api, $server = false)
	{
		$this->api = $api;
		$this->server =ServerAPI::request();
	}
		
	public function init()
	{
		$this->api->addHandler("player.death", array($this, "eventHandler"), 6);
		$this->api->addHandler("player.spawn", array($this, "eventHandler"), 6);
		$this->api->console->register("ruinpvp", "RuinPvP Command", array($this, "commandHandler"));
		$this->api->ban->cmdWhitelist("ruinpvp");
		$this->api->console->alias("rp", "ruinpvp");
		$this->path = $this->api->plugin->createConfig($this, array());
		$this->conf = $this->api->plugin->readYAML($this->path ."config.yml");
		console("[INFO] RuinPvP loaded successfully!");
	}


	
	public function eventHandler($data, $event)
	{
		switch($event)
		{
			case "player.spawn":
			$player =$this->api->player->getByEID($data->eid);
			$user =$player->iusername;
			$user2 = strtolower($user);
			$config =$this->api->plugin->readYAML($this->path ."config.yml"); 
			if(!array_key_exists($user, $config)) {
			$this->conf[$user2]["level"] =1; 
			$this->conf[$user2]["kills"] =0;
			$this->conf[$user2]["point"] =500;
			$this->write($this->conf); 
			}else{
			$lvlmes =$this->conf[$user2]["level"]; 
			$this->api->chat->sendTo(false, "[Notice] This server is using RuinPvP.\n#Version: 1.0.0\n#Credit: Cha0sRuin(alchemistdy@naver.com)\n", $user2);
			$this->api->chat->broadcast("[RuinPvP] <Lv.$lvlmes> $user joined the game."); 
			}
			
			break;
			
			case "player.death":
            $cause1 = $this->api->entity->get($data["cause"]);
			if($cause1 instanceof Entity){
			$cause = $cause1->name;
			$death = $this->api->player->get($data["player"])->username;
			$cause2 = strtolower($cause);
			$death2 = strtolower($death);
			
			$pc = 100;
			$killpo =$this->conf[$cause2]["kills"];
			
					$lp = $this->conf[$death2]["point"] - $pc;
					$wp = $this->conf[$cause2]["point"];
					$this->conf[$cause2]["kills"] = $this->conf[$cause2]["kills"] +1;
					
					
					if($killpo %10 == 0) {
					$this->conf[$cause2]["level"] = $this->conf[$cause2]["level"] +1;
					$this->conf[$cause2]["point"] = $this->conf[$cause2]["point"] +1000;
					$this->write($this->conf); 
					$wl =$this->conf[$cause2]["level"];
					$this->api->chat->sendTo(false, "[RuinPvP] Congratulation! Now your level is $wl! You get 1000 points as a prize.\n", $cause);
					$this->api->chat->broadcast("[RuinPvP] $cause is level up to $wl");
					}
					if ($lp < 0) {
					$this->api->chat->sendTo(false, "[RuinPvP] Enemy doesn't have any points.\nNow you have $wp points.\n", $cause);	
					$this->api->chat->sendTo(false, "[RuinPvP] You losed 0 points.\n", $death);						
					break;
					}
					$this->conf[$death2]["point"] = $this->conf[$death2]["point"] - $pc;
					$this->write($this->conf);
					$this->api->chat->sendTo(false, "[RuinPvP] You losed 100 points.\nNow you have $lp points.\n", $death);	
					
					$this->conf[$cause2]["point"] = $this->conf[$cause2]["point"] + $pc;
					$this->write($this->conf);
					$this->api->chat->sendTo(false, "[RuinPvP] You gained 100 points!\nNow you have $wpa points.\n", $cause);					
				}
			break;			
		}
	}
	public function commandHandler($cmd, $args, $issuer, $alias)
	{
		$output = "";
		$cmd = strtolower($cmd);
		switch ($cmd) {
			case "ruinpvp":
				$subCommand = $args[0];
				switch ($subCommand) {
					case "":
					case "help":
						$output .= "[RuinPvP]/ruinpvp help ::Command help\n";
						$output .= "[RuinPvP]/ruinpvp stat ::Display your status\n";						
						$output .= "[RuinPvP]/ruinpvp shop ::Point shop\n";
						$output .= "[RuinPvP]/ruinpvp casino ::Casino!\n";
						break;
					case "stat":
						$uuuu = strtolower($issuer->username);
						$lvl = $this->conf[$uuuu]["level"];
						$killp = $this->conf[$uuuu]["kills"];					
						$money = $this->conf[$uuuu]["point"];
						$output .= "==RuinPvP Status==\nLevel: $lvl \nKills: $killp \nPoints: $money \n";
						break;
					case "shop":
						$output .= "=RuinPvP Point Shop=\n";
						$output .= "[Wooden Sword:200p]/ruinpvp buywood\n";
						$output .= "[Golden Sword:250p]/ruinpvp buygold\n";
						$output .= "[Stone Sword:500p]/ruinpvp buystone\n";
						$output .= "[Iron Sword:700p]/ruinpvp buyiron\n";
						$output .= "[Diamond Sword:1000p]/ruinpvp buydiamond\n";
						$output .= "[Apples x10:200p]/ruinpvp buyapple\n";
						break;
					case "casino":
						$output .= "=RuinPvP Casino=\n";
						$output .= "[Lottery:100p]/ruinpvp lotto\n";
						$output .= "[Gamble:?p]/ruinpvp gamble <points>\n";
						break;						
					case "buywood":
						$uuuu = strtolower($issuer->username);
						$usernamew = $issuer->username;
						$pw = 200;
						$payerpointw = $this->conf[$uuuu]["point"];
						if ($pw > $payerpointw) {
							$output .= "[RuinPvP] You don't have enough points.";
							break;
						}						
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $pw;
						$this->write($this->conf);
						$playercause1 = $this->api->player->get($usernamew);
						$playercause1->addItem(268,0,1);
						break;
					case "buygold":
						$uuuu = strtolower($issuer->username);
						$usernameg = $issuer->username;
						$pg = 250;
						$payerpointg = $this->conf[$uuuu]["point"];
						if ($pg > $payerpointg) {
							$output .= "[RuinPvP] You don't have enough points.";
							break;
						}
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $pg;
						$this->write($this->conf);				
						$playercause2 = $this->api->player->get($usernameg);
						$playercause2->addItem(283,0,1);
						break;						
					case "buystone":
						$uuuu = strtolower($issuer->username);
						$usernames = $issuer->username;					
						$ps = 500;
						$payerpoints = $this->conf[$uuuu]["point"];						
						if ($ps > $payerpoints) {
							$output .= "[RuinPvP] You don't have enough points.";
							break;
						}						
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $ps;
						$this->write($this->conf);					
						$playercause3 = $this->api->player->get($usernames);
						$playercause3->addItem(272,0,1);
						break;
					case "buyiron":
						$uuuu = strtolower($issuer->username);
						$usernamei = $issuer->username;
						$pi = 700;
						$payerpointi = $this->conf[$uuuu]["point"];
						if ($pi > $payerpointi) {
							$output .= "[RuinPvP] You don't have enough points.";
							break;
						}						
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $pi;
						$this->write($this->conf);			
						$playercause4 = $this->api->player->get($usernamei);
						$playercause4->addItem(267,0,1);
						break;
					case "buydiamond":
						$uuuu = strtolower($issuer->username);
						$usernamed = $issuer->username;
						$pd = 1000;
						$payerpointd = $this->conf[$uuuu]["point"];
						if ($pd > $payerpointd) {
							$output .= "[RuinPvP] You don't have enough points.";
							break;
						}						
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $pd;
						$this->write($this->conf);				
						$playercause5 = $this->api->player->get($usernamed);
						$playercause5->addItem(276,0,1);
						break;
					case "buyapple":
						$uuuu = strtolower($issuer->username);
						$usernamea = $issuer->username;
						$pa = 200;
						$payerpointa = $this->conf[$uuuu]["point"];
						if ($pa > $payerpointa) {
							$output .= "[RuinPvP] You don't have enough points.";
							break;
						}						
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $pa;
						$this->write($this->conf);				
						$playercause6 = $this->api->player->get($usernamea);
						$playercause6->addItem(260,0,10);
						break;
					case "lotto":
						$uuuu = strtolower($issuer->username);
						$player = 1;
						$cpu = rand (1,5);
						$gamblecost = 100;
						$gpayerpoint = $this->conf[$uuuu]["point"];
						if ($gamblecost > $gpayerpoint) {
							$output .= "[RuinPvP] You don't have enough points.\n";
							break;
						}
						if ($player == $cpu) {
							$prize = 300;
							$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] + $prize;
							$this->write($this->conf);	
							$output .= "[RuinPvP] You won the lottery! You gained 300 points.\n";
							break;
						}
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $gamblecost;
						$this->write($this->conf);					
						$output .= "[RuinPvP] BooooM!. Try again?\n";
						break;
					case "gamble":
						$uuuu = strtolower($issuer->username);
						$ggplayer = 1;
						$ggcpu = rand (1,20);
						$ggamblecost = $args[1];
						$ggpayerpoint = $this->conf[$uuuu]["point"];
						if ($ggamblecost > $ggpayerpoint) {
							$output .= "[RuinPvP] You don't have enough points.\n";
							break;
						}
						if ($ggplayer == $ggcpu) {
							$ggprize = $ggamblecost;
							$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] + $ggprize;
							$this->write($this->conf);
							$output .= "[RuinPvP] You won the gamble! Here are your points!.\n";
							break;
						}
						$this->conf[$uuuu]["point"] = $this->conf[$uuuu]["point"] - $ggamblecost;
						$this->write($this->conf);
						$output .= "[RuinPvP] BooooM!. Try again?\n";
						break;						
					default:
						$output .= "[RuinPvP] /ruinpvp $subCommand dose not exist.\n";
						break;
				}
				break;
		}
		return $output;
	}
	
	private function write($dat){
	$this->api->plugin->readYAML($this->path."config.yml");
	$this->api->plugin->writeYAML($this->path."config.yml", $dat);
	}
	
	public function __destruct(){}
}