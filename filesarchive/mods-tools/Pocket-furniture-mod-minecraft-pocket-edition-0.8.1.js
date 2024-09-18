/*
If anyone share u need to put froum link
TBPM Script (C) GNC copyright
TBPM********************Script
Aircraft 
Copyright (C) <2014>  <TBPM>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
*/



ModPE.setItem(403,"diamond_horse_armor",0,"Chair");
ModPE.setItem(404,"iron_horse_armor",0,"Table");
ModPE.setItem(503,"gold_horse_armor",0,"TV");
ModPE.setItem(504,"map",0,"Stone Path");

/*Thx pc item mod
TBPM all beta no sell or post
Pocket-Furniture V1.0.1 Mod Script BY TBPM
Name
*/
var id=260;
var tableon=0;
var t=0;
var a=1;
var s=0;
var tv=0;
var TV=0;
/*
Data-File:
201:cupboard
503:TV
204:Stone Path
403:chair 
404:Table 
*/


var initialized = false;

function selectLevelHook() { 
 if (!initialized) { 
 Block.defineBlock(201,"Cupboard", 
			[["enchanting_table_bottom", 0], ["enchanting_table_top", 0],
			["enchanting_table_side", 0], ["enchanting_table_side", 0],
			["enchanting_table_side", 0], ["enchanting_table_side", 0]]);
		Block.setShape(201, 0, 0, 0, 1, 4/4, 1);
Block.defineBlock(202,"TV", 
			[["jukebox_side", 0], ["jukebox_top", 0]]);
		Block.setShape(202, 0, 0, 0, 1, 4/4, 1);
initialized = true;
Block.defineBlock(204,"Stone Path", 
			[["redstone_dust_cross_overlay", 0]]);
		 Block.setShape(204, 0, 0, 0, 1, 0.001, 1);
  Block.setRenderLayer(204, 1);
 }
}

//jukebox_side
//jukebox_top
//redstone_dust_line
//planks_oak





function useItem(x,y,z,itemId,blockId)
{
 if(itemId==404)//t==1
  {
setTile(x,y+2,z,171);//up
setTile(x,y+1,z,85);//down
    }

 if(itemId==403)
  {
setTile(x,y+1,z,53);
    }
if(itemId==503)
  {
setTile(x,y+1,z,202);
TV=1;
    }
if(itemId==504)
  {
setTile(x,y+1,z,204);
    }
if(blockId==53)
{
yz=Level.spawnMob(x+0.5,y+0.6,z+0.5,80)
Entity.setRenderType(yz,0)
rideAnimal(getPlayerEnt(),yz)
}
   }
     
function procCmd(command)
{
var cmd = command.split(" ");
if(cmd[0] == "give")
{
addItemInventory(201,5);
addItemInventory(204,5);
addItemInventory(503,5);
addItemInventory(403,5);
addItemInventory(404,5);
clientMessage(ChatColor.GOLD + "Added all items!");
}
}
/*
Data-File:
201:cupboard%
503:TV%
204:Stone Path%
403:chair 
404:Table 
*/

/*Video Thx Matthew to help us REC
#######Matthew################
Port by TBPM PC by Mr.CashFish&&Jammy
*/




/*GUI Part <Coppyright (C) 2014 TBPM Background Music System ported to TV>*/

function leaveGame()
{if(mp!=null)
mp.reset();zs=dq=0;lj=new Array();}
function newLevel()
{print("TV Music");var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();ctx.runOnUiThread(new java.lang.Runnable({run:function(){try{var sv=new android.widget.ScrollView(ctx);var layout=new android.widget.LinearLayout(ctx);layout.setOrientation(1);for(var js=0;ModPE.readData("beijingyinyue"+js)!=""&&ModPE.readData("beijingyinyue"+js)!=null;js++)
{lj[js]=ModPE.readData("beijingyinyue"+js);zs++;}
var t=new android.widget.TextView(ctx);t.setText("Now you have"+zs+"amount of music，it will save by auto next time no need to fill in again");var e1=new android.widget.EditText(ctx);e1.setHint("Please fill in path，like:/sdcard/1.mp3");var b1=new android.widget.Button(ctx);b1.setText("Add");b1.setOnClickListener(new android.view.View.OnClickListener({onClick:function(v){if(e1.getText().toString()!="")
{try
{mp.setDataSource(e1.getText().toString());mp.prepare();lj[zs]=e1.getText().toString();ModPE.saveData("beijingyinyue"+zs,lj[zs]);e1.setText("");zs++;t.setText("Now you have"+zs+"amount of TV music，it will save by auto next time no need to fill in again");}catch(e)
{print("Err:"+e);}
finally{mp.reset();}}
else print("You haven't fill in path！");}}));var b2=new android.widget.Button(ctx);b2.setText("Reset");b2.setOnClickListener(new android.view.View.OnClickListener({onClick:function(v){for(var js=0;ModPE.readData("beijingyinyue"+js)!=""&&ModPE.readData("beijingyinyue"+js)!=null;js++)
{ModPE.removeData("beijingyinyue"+js);}
lj=new Array();dq=zs=0;t.setText("Now you have"+zs+"amount of music，it will save by auto next time no need to fill in again");}}));var svp=new android.view.ViewGroup.LayoutParams(-2,-2);layout.addView(t,svp);layout.addView(e1,svp);layout.addView(b1,svp);layout.addView(b2,svp);sv.addView(layout);var dialog=new android.app.AlertDialog.Builder(ctx).setView(sv).setTitle("TV Music").setNegativeButton("Play",new android.content.DialogInterface.OnClickListener()
{onClick:function(dialog,which)
{if(zs>0)
{mp.setDataSource(lj[dq]);mp.prepare();mp.start();var temp=dq+1;print("TV :Start playing"+temp+"song,Path:"+lj[dq]);mp.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener()
{onCompletion:function(mper)
{print("Background music system:All song played");if(dq<zs-1)
dq++;else
dq=0;mp.reset();mp.setDataSource(lj[dq]);mp.prepare();mp.start();print("TV :start playing"+(dq+1)+"song,path"+lj[dq]);}});}
else{print("You haven't add any song！");print("If u want to add more song exit and add");}}}).setPositiveButton("Cancel",null).create();dialog.setCanceledOnTouchOutside(false);dialog.show();}catch(err){print("Err code: "+err);}}}));}
var mp=new android.media.MediaPlayer();var zs=0;var lj=new Array();var dq=0;