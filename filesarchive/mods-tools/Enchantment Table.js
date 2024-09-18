Block.defineBlock(102,"Enchanting Table",[["enchanting_table_side",0],["enchanting_table_top",0],["enchanting_table_bottom",0]],true,5,0);
Block.setDestroyTime(102,4);
Block.setShape(102,0,0,0,1,0.75,1);
ModPE.setItem(103,"emerald",0,"Emerald");
ModPE.addCraftRecipe(103, 1, 0, [264, 0, 266, 0,265, 0, 4, 0, 5, 0]); 
ModPE.setItemCategory(103,4,0);


var wood = 0
var stone = 0
var iron = 0
var gold = 0
var diamond = 0
var attack = 0
var count = 0
var xplode = 0

function newLevel()
{
clientMessage(ChatColor.GREEN + "Enchantment Table: " + ChatColor.GRAY + "by aid")
}

function useItem(x,y,z,itemId,blockId,side)
{
if(itemId == 267 &&  blockId == 102)
{
iron = 1
clientMessage("Iron sword is enchanted")
}
if(itemId == 276 &&  blockId == 102)
{
diamond = 1
clientMessage("Diamomd sword is enchanted")

}
if(itemId == 268 &&  blockId == 102)
{
wood = 1
clientMessage("Wooden sword is enchanted")

}
if(itemId == 283 &&  blockId == 102)
{
gold = 1
clientMessage("Golden sword is enchanted")

}
if(itemId == 272 &&  blockId == 102)
{
stone = 1
attack = 1
clientMessage("Stone sword is enchanted")

}

if(itemId == 103)
{
setTile(x,y+1,z,102)
clientMessage("An enchanted table has been made")
addItemInventory(103,-1)
}
if(itemId == 280 && blockId == 103)
{
wood = 0
stone = 0
iron = 0
gold = 0
diamond = 0
attack = 0
count = 0
xplode = 0
clientMessage("Enchanted Items has been returned to normal")
}
}
function attackHook(attacker,victim)
{

var ourItem = getCarriedItem();
  if(wood == 1 && ourItem==268)
    {
        preventDefault();
       Entity.setFireTicks(victim,2.55);
         
    }
    
    
 var ourItem = getCarriedItem();
  if(stone == 1 && ourItem==272 && attack == 1)
    {
        preventDefault();
        rideAnimal(attacker,victim);
        attack = 2  
         
    }
      
 var ourItem = getCarriedItem();
  if(iron == 1 && ourItem==267)
    {
        preventDefault();
        setVelY(victim,1.55);
         
    }
    
   var ourItem = getCarriedItem();
  if(gold == 1 && ourItem==283)
   {
        preventDefault();
   if(getYaw() < 0)
	{
		var temp = getYaw()+90;
		for(i=0; temp<0; i++)
		{
			temp += 360;
		}
		x = Math.cos(temp*(Math.PI/180));
		z = Math.sin(temp*(Math.PI/180));
		setVelX(victim, x*10);
		setVelY(victim, 1.55);
		setVelZ(victim, z*10);
	}
	else if(getYaw() > 0 && getYaw() < 360)
	{
		var temp = getYaw()+90;
		x = Math.cos(temp*(Math.PI/180));
		z = Math.sin(temp*(Math.PI/180));
		setVelX(victim, x*10);
		setVelY(victim, 1.55);
		setVelZ(victim, z*10);
	}
	else if(getYaw() >= 360)
	{
		var temp = getYaw()+90;
		for(i=0; temp>=360; i++)
		{
			temp -= 360;
		}
		x = Math.cos(temp*(Math.PI/180));
		z = Math.sin(temp*(Math.PI/180));
		setVelX(victim, x*10);
		setVelY(victim, 1.55);
		setVelZ(victim, z*10);
	}
         
 }
    
  var ourItem = getCarriedItem();
  if(diamond == 1 && ourItem==276)
    {
        Entity.setHealth(victim,8)
        Entity.setFireTicks(victim,5)
        xplode = 1
    }
    
}
function deathHook(attacker,victim)
{
ex = Entity.getX(victim)
ey = Entity.getY(victim)
ez = Entity.getZ(victim)


if(xplode == 1)
{
explode(ex,ey,ez,2,2)
xplode = 0
}
}

function modTick()
{
if(attack == 2)
{
count++;
}
if(count == 100)
{
count = 0
attack = 1
clientMessage("stone sword is ready ")
}
}
