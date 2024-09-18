<?php

/*
__PocketMine Plugin__
name=Advanced_Gamemode
description=Advanced anti grifing plugin
version=1.3
author=Ilia_plav
class=Advanced_Gamemode
apiversion=10,11,12
*/

/*
Descrption:
This is anti grifing plugin.It is very need in servers,where are a lot of grifers
With this plugin you can prohibit players with the admin or VIP give other creative
With this plugin, they can give creative or survival of only yourself
You can use this plugin with GroupManager,Permission Plus or other permission plugin
Good luck
================
Commands :
/creative - turn on creative mode
/survival - turn on survival mode
/adventure - turn on adventure mode
/view - turn on view mode
*/

/*
Change logs

1.0
Can change only YOUR gamemode to creative or survival

1.1
Added command /adventure

1.2
Added command /view

1.3
Fixed bugs

*/

class Advanced_Gamemode implements Plugin{
   private $api;

   public function __construct(ServerAPI $api, $server = false){
     $this->api = $api;
   }

   public function init(){
     $this->api->console->register("creative","turn on creative", array($this, "icreative"));
	 $this->api->console->register("survival","turn on survival", array($this, "isurvival"));
	 $this->api->console->register("adventure","turn on adventure", array($this, "iadventure"));
	 $this->api->console->register("view","turn on view", array($this, "iview"));
   }

   public function isurvival($cmd, $args, $issuer){
   if($issuer === 'console'){
       $output .= "Run this command in game";
       return $output;
      }
     $username = $issuer->username;
	 $this->api->console->run("gamemode 0 $username");
   }
   
   public function icreative($cmd, $args, $issuer){
   if($issuer === 'console'){
       $output .= "Run this command in game";
       return $output;
      }
     $username = $issuer->username;
	 $this->api->console->run("gamemode 1 $username");
   }
   
   public function iadventure($cmd, $args, $issuer){
   if($issuer === 'console'){
       $output .= "Run this command in game";
       return $output;
      }
     $username = $issuer->username;
	 $this->api->console->run("gamemode 3 $username");
   }

      public function iview($cmd, $args, $issuer){
	  if($issuer === 'console'){
       $output .= "Run this command in game";
       return $output;
      }
     $username = $issuer->username;
	 $this->api->console->run("gamemode 4 $username");
   }
   
   public function __destruct(){
   }
}
?>