var emoreID = 191;
//var rubyoreID = 192;
//var petrolID = 193;
var dioreID = 56;
var emoreDAMAGE = 0;
var rubyoreDAMAGE = 0;
var dioreDAMAGE = 0;
var petrolDAMAGE = 0;
var dungeonDAMAGE = 0;
var caveID = 0;
var surcaveID = 0;
var dungeonID = 0;
var lavaID = 11;
var caveDAMAGE = 0;
var surcaveDAMAGE = 0;
var cavechest = 54;
var dungeonchest = 54;
var blocks = 10;

var dungeonwall = 4;
var dungeonflr = 48;
var dungeondmg = 0;

var spawneractive = 0;
var time_timers = [];
var time_nextId = 0;
var countdown = -1;


var deltaX = Math.sin(Math.random() * 256)*blocks;
var deltaZ = Math.cos(Math.random() * 256)*blocks;
ModPE.setItem(426, "emerald", 0, "Emerald");


Block.defineBlock(23,"Mob Spawner", "mob_spawner", 0, true, 0);

Block.defineBlock(191, "Emerald Ore", ["emerald_ore",0], 1, false, 0);

//Block.defineBlock(192,"Ruby Ore",["quartz_ore",0],1,false,0);
//Block.defineBlock(193,"Petroleum",["wool",15],1,false,4);


Block.setDestroyTime(191,2.5);
Block.setDestroyTime(192,2.5);
Block.setDestroyTime(23,0.5);


function setTimeout(func, ticks) { 
var id = time_nextId++; 
time_timers.push([id, ticks, func, -1]); 	
return id; 
}


function setInterval(func, ticks) {
var id = time_nextId++; 	
time_timers.push([id, ticks, func, ticks]); 	
return id; 
} 

function clearTimeout(id) {
for (var i = time_timers.length - 1; 
i >= 0; --i) { 		
var t = time_timers[i]; 		
if (t[0] == id) { 			
time_timers.splice(i, 1); 			
break; 		
} 	
} 
} 

function clearInterval(id) { 	
clearTimeout(id); 
} 

function time_runTimers() { 	
for (var i = time_timers.length - 1; 
i >= 0; --i) { 		
var t = time_timers[i]; 		
t[1]--; 		
if (t[1] == 0) { 			
t[2](); 			
if (t[3] == -1) { 				
time_timers.splice(i, 1); 			
} else { 				
t[1] = t[3]; 			
} 		
} 	
} 
}


function newLevel(){


countdown = 20;


for(var i = 0; i < 1000; i++){

		 var emoreX = Math.floor((Math.random() * 256) + 1);
			var emoreY = Math.floor((Math.random() * 45) + 1);
			var emoreZ = Math.floor((Math.random() * 256) + 1);
			Level.setTile(emoreX,emoreY,emoreZ,emoreID,emoreDAMAGE);
Level.setTile(emoreX+=1,emoreY,emoreZ,emoreID,emoreDAMAGE);
Level.setTile(emoreX,emoreY+=1,emoreZ,emoreID,emoreDAMAGE);
Level.setTile(emoreX-=1,emoreY,emoreZ,emoreID,emoreDAMAGE);
Level.setTile(emoreX,emoreY,emoreZ+=1,emoreID,emoreDAMAGE);
Level.setTile(emoreX,emoreY-=1,emoreZ,emoreID,emoreDAMAGE);
Level.setTile(emoreX+=1,emoreY,emoreZ,emoreID,emoreDAMAGE);
Level.setTile(emoreX,emoreY+=1,emoreZ,emoreID,emoreDAMAGE);

			}

for(var i = 0; i < 1000; i++){

		 var dioreX = Math.floor((Math.random() * 256) + 1);
			var dioreY = Math.floor((Math.random() * 40) + 1);
			var dioreZ = Math.floor((Math.random() * 256) + 1);
			Level.setTile(dioreX,dioreY,dioreZ,dioreID,dioreDAMAGE);
Level.setTile(dioreX+=1,dioreY,dioreZ,dioreID,dioreDAMAGE);
Level.setTile(dioreX,dioreY+=1,dioreZ,dioreID,dioreDAMAGE);
Level.setTile(dioreX-=1,dioreY,dioreZ,dioreID,dioreDAMAGE);
Level.setTile(dioreX,dioreY,dioreZ+=1,dioreID,dioreDAMAGE);
Level.setTile(dioreX,dioreY-=1,dioreZ,dioreID,dioreDAMAGE);
Level.setTile(dioreX+=1,dioreY,dioreZ,dioreID,dioreDAMAGE);
Level.setTile(dioreX,dioreY+=1,dioreZ,dioreID,dioreDAMAGE);

			}

for(var i = 0; i < 150; i++){
		 var surcaveX = Math.floor((Math.random() * 256) + 1);
			var surcaveY = Math.floor((Math.random() * 78) + 1);
			var surcaveZ = Math.floor((Math.random() * 256) + 1);

if(Level.getTile(Math.floor((Math.random() * 256) +1), Math.floor((Math.random() * 120) +1), Math.floor((Math.random() * 256) +1))!=10){
			 Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ-=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ-=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

/*if(getTile(surcaveX,surcaveY-=1, surcaveZ) != 0){

Level.setTile(surcaveX,surcaveY,surcaveZ,lavaID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,lavaID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,lavaID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,lavaID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,lavaID,surcaveDAMAGE);

}*/

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ-1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY+1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY-100,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

Level.setTile(surcaveX,surcaveY-100,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX-=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY,surcaveZ+=1,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY-=1,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX+=1,surcaveY,surcaveZ,surcaveID,surcaveDAMAGE);
Level.setTile(surcaveX,surcaveY+=1,surcaveZ,surcaveID,surcaveDAMAGE);

}

			}


for(var i = 0; i < 200; i++){

		 var dungeonX = Math.floor((Math.random() * 256) + 1);
			var dungeonY = Math.floor((Math.random() * 40) + 1);
			var dungeonZ = Math.floor((Math.random() * 256) + 1);



Level.setTile(dungeonX+=1, dungeonY+=4, dungeonZ, dungeonwall, dungeondmg);


Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY-=4, dungeonZ-=1, dungeonwall, dungeondmg);

Level.setTile(dungeonX, dungeonY+3, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, dungeonwall, dungeondmg);

Level.setTile(dungeonX, dungeonY+2, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, dungeonwall, dungeondmg);

Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX-=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ-=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX+=1, dungeonY+1, dungeonZ, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);
Level.setTile(dungeonX, dungeonY+1, dungeonZ+=1, dungeonwall, dungeondmg);


Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, dungeonchest, 2);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY, dungeonZ-=1, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY, dungeonZ-=1, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 23, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, dungeonchest, 5);
Level.setTile(dungeonX, dungeonY, dungeonZ-=1, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX+=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY, dungeonZ-=1, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX-=1, dungeonY, dungeonZ, dungeonflr, dungeondmg);
Level.setTile(dungeonX, dungeonY+3, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+2, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY+1, dungeonZ, 0, 0);
Level.setTile(dungeonX, dungeonY, dungeonZ, dungeonflr, dungeondmg);

var asd = Math.floor((Math.random() * 4) + 1);

if(asd == 1){

Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 5, 265, 0, 7);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 9, 264, 90, 4);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 1, 305, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 2, 297, 5, 3);

}

if(asd == 2){

Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 5, 303, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 9, 264, 90, 7);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 1, 325, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 2, 292, 5, 1);

}

if(asd == 3){

Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 5, 265, 0, 7);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 9, 266, 0, 11);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 1, 303, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 2, 458, 5, 3);

}

if(asd == 4){

Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 5, 267, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 9, 303, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 1, 302, 0, 1);
Level.setChestSlot(dungeonX, dungeonY+1, dungeonZ+2, 2, 358, 5, 8);

}

var asg = Math.floor((Math.random() * 4) + 1);

if(asg == 1){

Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 11, 305, 0, 1);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 3, 331, 0, 3);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 6, 287, 0, 1);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 9, 354, 0, 1);

}

if(asg == 2){

Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 11, 389, 5, 16);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 3, 305, 0, 1);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 6, 388, 0, 2);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 9, 258, 5, 1);

}

if(asg == 3){

Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 11, 295, 0, 11);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 3, 331, 5, 4);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 6, 302, 0, 1);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 9, 274, 0, 1);

}

if(asg == 4){

Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 11, 260, 5, 11);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 3, 296, 5, 4);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 6, 302, 0, 1);
Level.setChestSlot(dungeonX+2, dungeonY+1, dungeonZ+4, 9, 259, 5, 1);

}


			}


for(var i = 0; i < 200; i++){
		 var caveX = Math.floor((Math.random() * 256) + 1);
			var caveY = Math.floor((Math.random() * 50) + 1);
			var caveZ = Math.floor((Math.random() * 256) + 1);

if(Level.getTile(Math.floor((Math.random() * 256) +1), Math.floor((Math.random() * 120) +1), Math.floor((Math.random() * 256) +1))!=10){


if(Level.getTile(Math.floor((Math.random() * 256) +1), Math.floor((Math.random() * 120) +1), Math.floor((Math.random() * 256) +1))!=10){



Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);


if(getTile(caveX,caveY-2, caveZ) != 0){

Level.setTile(caveX,caveY-2,caveZ,lavaID,caveDAMAGE);
Level.setTile(caveX+1,caveY-2,caveZ,lavaID,caveDAMAGE);
Level.setTile(caveX,caveY-2,caveZ+1,lavaID,caveDAMAGE);
Level.setTile(caveX+1,caveY-2,caveZ+1,lavaID,caveDAMAGE);

}


Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ-=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ-=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

if(getTile(caveX,caveY-2, caveZ) != 0){

Level.setTile(caveX,caveY-2,caveZ,lavaID,caveDAMAGE);
Level.setTile(caveX+1,caveY-2,caveZ,lavaID,caveDAMAGE);
Level.setTile(caveX,caveY-2,caveZ+1,lavaID,caveDAMAGE);
Level.setTile(caveX+1,caveY-2,caveZ+1,lavaID,caveDAMAGE);

Level.setTile(caveX-2, caveY-1, caveZ-3, cavechest, 10);

var sdf = Math.floor((Math.random() * 4) + 1);

if(sdf == 1){

Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 5, 264, 0, 3);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 0, 302, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 1, 307, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 9, 257, 5, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 11, 345, 5, 1);

}

if(sdf == 2){

Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 5, 293, 0, 3);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 0, 309, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 1, 307, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 9, 260, 5, 7);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 11, 15, 5, 13);

}

if(sdf == 3){

Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 5, 262, 0, 19);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 0, 261, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 1, 307, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 9, 274, 5, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 11, 347, 5, 1);

}

if(sdf == 4){

Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 5, 314, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 0, 267, 90, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 1, 309, 0, 1);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 9, 297, 5, 3);
Level.setChestSlot(caveX-2, caveY-1, caveZ-3, 11, 318, 5, 7);

}

}


Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ-1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY+1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

Level.setTile(caveX,caveY-100,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX-=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY,caveZ+=1,caveID,caveDAMAGE);
Level.setTile(caveX,caveY-=1,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX+=1,caveY,caveZ,caveID,caveDAMAGE);
Level.setTile(caveX,caveY+=1,caveZ,caveID,caveDAMAGE);

} 


}

}

}


function destroyBlock(x, y, z, side){


if(getTile(x, y, z) == 191){


Level.dropItem(x, y, z, 0, 426, 1, 0);
Level.destroyBlock(x, y, z, false);


}


}



function modTick(){

time_runTimers();

if(countdown == 20){

countdown--;

}

else if(countdown == 0){

Level.spawnEntity(dungeonX-=3, dungeonY, dungeonZ+=1, 32); 

countdown = 20;

}

}


function useItem(x, y, z, item, block, side){

if(block == 23){


countdown = 20;
countdown--;


}

}