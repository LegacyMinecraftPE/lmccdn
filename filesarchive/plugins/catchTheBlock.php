<?php

/*
__PocketMine Plugin__
name=CatchTheBlock
description=A fun minigame
version=2.1
author=SuperChipsLP
class=ctb
apiversion=10
*/

class ctb implements Plugin{

	private $api;
	
	private $x;
	private $y;
	private $z;
	
	private $started = false;
	
	private $minute = 30;
	private $tos = 10;
	
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
	
	$this->api->addHandler("player.block.break", array($this, "eventHandler"), 100);
	$this->api->addHandler("entity.health.change", array($this, "eventHandler"), 100);
	$this->api->addHandler("player.spawn", array($this, "eventHandler"), 100);
	$this->api->console->register("startctb", "Starts CTB", array($this, "startHandler"));
	
	$this->config = new Config($this->api->plugin->configPath($this)."config.yml", CONFIG_YAML, array(
	"auto-stop" => false,
	"auto-restart" => false,
	"auto-start" => false,
	"Timer" => 30,
	"timeout" => 10
	));
	
	$this->config->save();
	
	$this->minute = $this->config->get('Timer');
	$this->tos = $this->config->get('timeout');
	
	if($this->config->get('auto-start') == true){
	
	$time = $this->config->get('Timer');
	$this->minute = $time+1;
	$this->api->schedule(1200, array($this, "minuteSchedule"), array(), false);
	
	console("[CTB] The game will be started in 1 minute!");
	
	} else {
	
	console("[CTB] Start the game with /startctb");
	
	}
	
	}
	
	public function eventHandler($data, $event)
	{
		switch($event)
		{
	case 'entity.health.change':
	
	if($this->started == true)
	{
	return false;
	}
	
	break;
	case 'player.block.break':
	
	$x1 = $data["target"]->x;
	$y1 = $data["target"]->y;
	$z1 = $data["target"]->z;
	
	if($this->started == true){
	
	if($x1 == $this->x and $y1 == $this->y and $z1 == $this->z) {
	
	$this->api->chat->broadcast("[CTB] A player has won the Gold Block!");
	$this->api->chat->broadcast("[CTB] Thanks for playing!");
	$this->started = false;
	
	}
	
	}
	
	break;
	case 'player.spawn':
	
	if($this->started == true) {
	$data->sendChat("[CTB] A game is running!");
	$data->sendChat("[CTB] You have to find the GOLD BLOCK");
	$data->sendChat("[CTB] and break it.");
	
	}
	
	break;
	}
	}
	
	public function minuteSchedule(){
	
	$this->minute--;
	
	if($this->minute == $this->config->get('Timer')){
	
	$this->startGame();
	
	}
	
	if($this->minute == 0){

	$level = $this->api->level->getDefault();
	$this->api->chat->broadcast("[CTB] The game has endet!");
	$this->started = false;
	$block = BlockAPI::get(0,0);
	$level->setBlock(new Vector3($this->x, $this->y, $this->z, $level), $block);
	
	if($this->config->get('auto-stop') == true){
	
	$this->api->schedule(20, array($this, "timeoutAllPlayers"), array(), true);
	$this->api->chat->broadcast("The server will shut down in ".$this->config->get('timeout')." seconds!");
	
	}
	
	if($this->config->get('auto-restart') == true){
	
	$this->api->chat->broadcast("[CTB] The game will be restarted...");
	$this->minute = $this->config->get('Timer');
	$this->minute++;
	$this->api->console->run("startctb");
	
	console("Restarted CTB!");
	
	}
	
	}
	
	}
	
	public function timeoutAllPlayers(){
	
	$this->tos--;
	if($this->tos == 0){
	
	$this->api->console->run("stop");
	
	}
	
	}
	
	public function startHandler($cmd, $args, $issuer, $alias){
	
	if($cmd = "startctb")
	{
	
	if($this->started == false) {
	
	$this->startGame();
	
	} else {
	
	$output = "[CTB] The game has already started...";
	return $output;
	
	}
	
	}
	
	}
	
	public function startGame(){
	
	if($this->started == false) {
	
	$this->started = true;
	$this->api->schedule(1200, array($this, "minuteSchedule"), array(), false);
	
	$this->x = rand(10, 220);
	$this->y = rand(50, 120);
	$this->z = rand(10, 110);
	
	$block = BlockAPI::get(41,0);
	
	$level = $this->api->level->getDefault();
	
	$level->setBlock(new Vector3($this->x, $this->y, $this->z, $level), $block);
	
	$this->api->chat->broadcast("[CTB] The game has been started!");
	$this->api->chat->broadcast("[CTB] Find the GOLD BLOCK as fast as you can ");
	$this->api->chat->broadcast("[CTB] and break it!");
	
	} 
	
	}
	
	public function __destruct(){
	
	}
	
	}