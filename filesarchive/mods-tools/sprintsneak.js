var img1 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/sprint&sneak/sprint.png");
var img2 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/sprint&sneak/sneak.png");
var img3 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/sprint&sneak/sprint2.png");
var img4 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/sprint&sneak/sneak2.png");
var sp = new android.graphics.drawable.BitmapDrawable(img1);
var sn = new android.graphics.drawable.BitmapDrawable(img2);
var sp2 = new android.graphics.drawable.BitmapDrawable(img3);
var sn2 = new android.graphics.drawable.BitmapDrawable(img4);
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
run=0;
crouch=0;
s=1;
Xdiff=0;
Zdiff=0;
Xpos=0;
Zpos=0;

function newLevel()
{
ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){
 
try{

GUI = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(android.widget.LinearLayout.VERTICAL);
GUI.setContentView(layout);
GUI.setWidth(65);
GUI.setHeight(65);
var btn = new android.widget.Button(ctx);
layout.addView(btn);
btn.setBackgroundDrawable(sp);
btn.setOnClickListener(new android.view.View.OnClickListener({ 
onClick: function(viewarg){ 
if(run==0&&Entity.getHealth(Player.getEntity()) > 9)
{
run=1;
btn.setBackgroundDrawable(sp2);
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
}
else if(run==1)
{
run=false;
btn.setBackgroundDrawable(sp);
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
}
}
}));
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 85, 0);
GUI2 = new android.widget.PopupWindow();
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(android.widget.LinearLayout.VERTICAL);
GUI2.setContentView(layout2);
GUI2.setWidth(65);
GUI2.setHeight(65);
var btn2 = new android.widget.Button(ctx);
layout2.addView(btn2);
btn2.setBackgroundDrawable(sn);
btn2.setOnClickListener(new android.view.View.OnClickListener({ 
onClick: function(viewarg){ 
if(crouch==0)
{
Entity.setSneaking(Player.getEntity(), true);
crouch=1;
btn2.setBackgroundDrawable(sn2);
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
}
else if(crouch==1)
{
Entity.setSneaking(Player.getEntity(), false);
crouch=0;
btn2.setBackgroundDrawable(sn);
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
}
}
}));
GUI2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 168, 0);
} catch (e){
print ("Error: "+e)
}
}}); 
}

function modTick()
{
if(run==1&&Entity.getHealth(Player.getEntity()) > 9)
{
if(s==1)
{
Xpos=getPlayerX();
Zpos=getPlayerZ();
s = s + 1;
}
else if(s==3)
{
s=1;
Xdiff=getPlayerX()-Xpos;
Zdiff=getPlayerZ()-Zpos;
setVelX(getPlayerEnt(),Xdiff);
setVelZ(getPlayerEnt(),Zdiff);
Xdiff=0;
Zdiff=0;
}
if(s!=1)
{
s = s + 1;
}
}
}

function leaveGame()
{ 
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(); 
ctx.runOnUiThread(new java.lang.Runnable({ 
run: function(){ 
if(GUI != null&&GUI2 != null){ 
GUI.dismiss();
GUI2.dismiss();
GUI = null;
GUI2 = null;
} 
}})); 
}