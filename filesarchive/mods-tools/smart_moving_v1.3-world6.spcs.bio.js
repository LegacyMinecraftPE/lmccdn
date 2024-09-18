//  ____
// |    \
// |    |
// |____/
// |
// |

//  _____
// |
// |_____
// |
// |_____

//  _____
// |     \
// |     |
// |_____/
// |   \
// |    \
// |     \

// |  /
// | /
// |/
// | \
// |  \
// |   \

var Xdiff=0;
var Ydiff=0;
var Zdiff=0;
var Tick=0;
var Mode=0;
var GMode=0;
var px,py,pz,pe,yaw,pitch,sin,cos,tan,pcos;
var GUI = null;
var GUI2 = null;
var coordView = false;
var sn,we;
var xText,yText,zText,fText,xSText,zSText,ySText; var rText,sText,gText;
var Xpos=0;
var Ypos=0;
var Zpos=0;
var oru=0;
var time=0;
var a=1;
var time2=0;
var health=0;
var save=0;
var save2=0;
var save3=0;
var save4=0;
var running=0;
var cooltime=0;
var heath=0;
var difficulty=0;
var cool=0;
var ParticleEffectId;
var ParticleEffectDamage;
var bottomBlocky;
var speed=1;
var MS=0;
var MStime=0;
var grap=0;
var w1 = null;
var w2 = null;
var w3 = null;
var w4 = null;
var w5 = null;
var w6 = null;
var w7 = null;
var w8 = null;
var w9 = null;
var jump=0;
var grap = 0;
var btnWindow = null;
var openWindow = null;
var mainWindow = null;
var addWindow = null;
var addWindow2 = null;
var addWindow3 = null;
var addWindow4 = null;
var save_speed = "1";
var swim=0;
var sneak = 0;
var button8;
var sdcard=android.os.Environment.getExternalStorageDirectory();
var File=java.io.File;
var directory=new File(sdcard.getAbsolutePath()+"/games/com.mojang");
var minecraftpe = new java.io.File(directory + "/minecraftpe/");
var FileReader=java.io.FileReader;
var options=new java.io.File(minecraftpe, "options.txt");
var br=new java.io.BufferedReader(new FileReader(options));

function dip2px(ctx, dips) {
return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}
function newLevel() {
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({run : function() {
try {
w1 = new android.widget.PopupWindow();
w2 = new android.widget.PopupWindow();
w4 = new android.widget.PopupWindow();
w8 = new android.widget.PopupWindow();
var l1 = new android.widget.RelativeLayout(ctx);
var l2 = new android.widget.RelativeLayout(ctx);
var l4 = new android.widget.RelativeLayout(ctx);
var l8 = new android.widget.RelativeLayout(ctx);
var button1 = new android.widget.Button(ctx);
var button2 = new android.widget.Button(ctx);
var button4 = new android.widget.Button(ctx);
button8 = new android.widget.Button(ctx);
button1.setText("r");
button1.setOnTouchListener ( new android.view.View.OnTouchListener( 
{ 
onTouch: function( view, event ) 
{ 
if( event.getAction() == android.view.MotionEvent.ACTION_DOWN )
{
Mode=1;
button1.setText("R");
}
else if( event.getAction() == android.view.MotionEvent.ACTION_UP )
{
Mode=0;
button1.setText("r");
}
return false;
} 
}));
l1.addView(button1);

button2.setText("G");
button2.setOnClickListener(new android.view.View.OnClickListener({onClick:function(viewarg) {
if(w2 != null){
   w2.dismiss();
			w2 = null;
}
grap=1;
if( difficulty ==2){
player=getPlayerEnt();
Player.setHealth(Entity.getHealth(getPlayerEnt())-1);
}
}
}));
l2.addView(button2);

button4.setText("M");
button4.setOnClickListener(new android.view.View.OnClickListener({onClick:function(viewarg) {
menu();
}
}));
l4.addView(button4);

button8.setText("D");
button8.setOnClickListener(new android.view.View.OnClickListener({onClick:function(viewarg) {

if(sneak==0){
button8.setText("S");
Entity.setSneaking(Player.getEntity(),true);
sneak=1;
}

else if(sneak==1){
button8.setText("U");
Entity.setSneaking(Player.getEntity(),false);
rideAnimal(Player.getEntity(),Player.getEntity() );
sneak=2;
}

else if(sneak==2){
button8.setText("D");
rideAnimal(Player.getEntity(),0);
sneak=0;
}
}
}));
l8.addView(button8);

w1.setContentView(l1);
w1.setWidth(dip2px(ctx,48));
w1.setHeight(dip2px(ctx,48));
w2.setContentView(l2);
w2.setWidth(dip2px(ctx,48));
w2.setHeight(dip2px(ctx,48));
w4.setContentView(l4);
w4.setWidth(dip2px(ctx,48));
w4.setHeight(dip2px(ctx,48));
w8.setContentView(l8);
w8.setWidth(dip2px(ctx,48));
w8.setHeight(dip2px(ctx,48));
w1.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w4.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w8.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,0,0);
w2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,dip2px(ctx, 48),0);
w4.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP,0,0);
w8.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,0,dip2px(ctx, 48));
}
catch(err) {
print("오류");
}
}
}));
}
function Gon(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();//마인크래프트 메인
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
w2 = new android.widget.PopupWindow();
var l2 = new android.widget.RelativeLayout(ctx);//맵 입장시 버튼 레이아웃 설정
var button2 = new android.widget.Button(ctx);
button2.setText("G");
button2.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(viewarg) {
if(w2 != null){
   w2.dismiss();
			w2 = null;
}
grap=1;
if( difficulty ==2){
player=getPlayerEnt();
Player.setHealth(Entity.getHealth(getPlayerEnt())-1);
}
}}));
l2.addView(button2);

w2.setContentView(l2);
w2.setWidth(dip2px(ctx, 48));
w2.setHeight(dip2px(ctx, 48));
w2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,dip2px(ctx, 48), 0);
}catch(error){
print("Failed to show button.");
}
} }));
}

function Jon(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();//마인크래프트 메인
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
w9 = new android.widget.PopupWindow();
var l9 = new android.widget.RelativeLayout(ctx);//맵 입장시 버튼 레이아웃 설정
var button9 = new android.widget.Button(ctx);
button9.setText("J");
button9.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(viewarg) {

player=getPlayerEnt();
Entity.setSneaking(Player.getEntity(),false);
sneak=0;

if(getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())!=0){
player=getPlayerEnt();
setVelY(player,0.7);
}
}}));

l9.addView(button9);

w9.setContentView(l9);
w9.setWidth(dip2px(ctx, 48));
w9.setHeight(dip2px(ctx, 48));
w9.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w9.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,0,dip2px(ctx, 96));
}catch(error){
print("Failed to show button.");
}
} }));
}


function Grap(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({run : function() {
try {
w3 = new android.widget.PopupWindow();
w5 = new android.widget.PopupWindow();
w6 = new android.widget.PopupWindow();
var l3 = new android.widget.RelativeLayout(ctx);
var l5 = new android.widget.RelativeLayout(ctx);
var l6 = new android.widget.RelativeLayout(ctx);
var button3 = new android.widget.Button(ctx);
var button5 = new android.widget.Button(ctx);
var button6 = new android.widget.Button(ctx);
button3.setText("□");
button3.setOnTouchListener ( new android.view.View.OnTouchListener( 
{ 
onTouch: function( view, event ) 
{ 
if( event.getAction() == android.view.MotionEvent.ACTION_DOWN )
{
button3.setText("■");
GMode=1;
}
else if( event.getAction() == android.view.MotionEvent.ACTION_UP &&GMode==1)
{
button3.setText("□");
GMode=0;
}
return false;
} 
}));
l3.addView(button3);
button5.setText("△");
button5.setOnTouchListener ( new android.view.View.OnTouchListener( 
{ 
onTouch: function( view, event ) 
{ 
if( event.getAction() == android.view.MotionEvent.ACTION_DOWN )
{
button5.setText("▲");
GMode=2;
}
else if( event.getAction() == android.view.MotionEvent.ACTION_UP &&GMode==2)
{
button5.setText("△");
GMode=0;
}
return false;
} 
}));
l6.addView(button6);
button6.setText("X");
button6.setOnClickListener(new android.view.View.OnClickListener({onClick:function(viewarg) {
grap=2;
}
}));
l5.addView(button5);
w3.setContentView(l3);
w3.setWidth(dip2px(ctx,48));
w3.setHeight(dip2px(ctx,48));
w5.setContentView(l5);
w5.setWidth(dip2px(ctx,48));
w5.setHeight(dip2px(ctx,48));
w6.setContentView(l6);
w6.setWidth(dip2px(ctx,48));
w6.setHeight(dip2px(ctx,48));
w3.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w5.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w6.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,dip2px(ctx, 50),0);
w5.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,dip2px(ctx, 50),dip2px(ctx, 100));
w6.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM,dip2px(ctx, 50),dip2px(ctx, 48));
}
catch(err) {
print("오류");
}
}
}));
}
function Swim(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();//마인크래프트 메인
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
w7 = new android.widget.PopupWindow();
var l7 = new android.widget.RelativeLayout(ctx);
var button7 = new android.widget.Button(ctx);
button7.setText("s");
button7.setOnTouchListener ( new android.view.View.OnTouchListener( 
{ 
onTouch: function( view, event ) 
{ 
if( event.getAction() == android.view.MotionEvent.ACTION_DOWN )
{
yaw = getYaw(Player.getEntity());
  pitch=Math.floor(getPitch());
  sin=-Math.sin(yaw/180*Math.PI);
  cos=Math.cos(yaw/180*Math.PI);
  tan=-Math.sin(pitch/180*Math.PI);
  pcos=Math.cos(pitch/180*Math.PI);
player=getPlayerEnt();
setVelX(player,sin*0.45);
setVelZ(player,cos*0.45);
ParticleEffect(getPlayerX(),getPlayerY()-1,getPlayerZ());
time2=0;
time=0;
Xdiff=0;
Zdiff=0;
Mode=0;
button7.setText("S");
}
else if( event.getAction() == android.view.MotionEvent.ACTION_UP )
{
button7.setText("s");
}
return false;
} 
}));
l7.addView(button7);

w7.setContentView(l7);
w7.setWidth(dip2px(ctx, 48));
w7.setHeight(dip2px(ctx, 48));
w7.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w7.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0,0);
}catch(error){
print("Failed to show button.");
}
} }));
}
function Ron(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();//마인크래프트 메인
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
w1 = new android.widget.PopupWindow();
var l1 = new android.widget.RelativeLayout(ctx);
var button1 = new android.widget.Button(ctx);
button1.setText("r");
button1.setOnTouchListener ( new android.view.View.OnTouchListener( 
{ 
onTouch: function( view, event ) 
{ 
if( event.getAction() == android.view.MotionEvent.ACTION_DOWN )
{
Mode=1;
button1.setText("R");
}
else if( event.getAction() == android.view.MotionEvent.ACTION_UP )
{
Mode=0;
button1.setText("r");
}
return false;
} 
}));
l1.addView(button1);

w1.setContentView(l1);
w1.setWidth(dip2px(ctx, 48));
w1.setHeight(dip2px(ctx, 48));
w1.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
w1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0,0);
}catch(error){
print("Failed to show button.");
}
} }));
}
function modTick()
{
player=getPlayerEnt();
heath=Entity.getHealth(getPlayerEnt());
bottomBlocky= bottomBlockP(Player.getX(),Player.getZ());

px = Player.getX();
	py = Player.getY();
	pz = Player.getZ();
		
	if(coordView)
	{
	yaw = getYaw(Player.getEntity());
  pitch=Math.floor(getPitch());
  sin=-Math.sin(yaw/180*Math.PI);
  cos=Math.cos(yaw/180*Math.PI);
  tan=-Math.sin(pitch/180*Math.PI);
  pcos=Math.cos(pitch/180*Math.PI);
	sn=Math.round(-1*Math.sin(yaw*Math.PI/180));
	we=Math.round(Math.cos(yaw*Math.PI/180));

if(sn == -1) f = "0 (SOUTH)";
	else if(sn == 1) f = "2 (NORTH)";
	else if(we == -1) f = "3 (WEST)";
	else if(we == 1) f = "1 (EAST)";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		xText.setText("x: "+px.toFixed(5)+" ("+parseInt(px)+")");
		yText.setText("y: "+(py-1.62).toFixed(5)+" (foot pos. "+py.toFixed(5)+" eye pos)");
		zText.setText("z: "+pz.toFixed(5)+" ("+parseInt(pz)+")");
		fText.setText("f: "+f);
 xSText.setText("X speed"+Math.abs(getPlayerX()-Xpos));
 ySText.setText("Y speed"+Math.abs(getPlayerY()-Ypos));
 zSText.setText("Z speed"+Math.abs(getPlayerZ()-Zpos));
		}}));
	}
if(difficulty !=0&&heath<8){
Mode=0;
grap=0;
}
if(sneak!=0){
Mode=0;
}
if(sneak==1&&w9==null)
{
Jon();
}
if(sneak!=1&&w9!= null )
{
Joff();
}
if(grap == 1&&w3==null)
{
Grap();
}
if(grap == 0&&w3!=null)
{
Goff();
}
if(w2 == null&&grap==2){
Gon();
grap=0;
GMode=0;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run:
function() {
if(w3 != null){
			w3.dismiss();
			w3 = null;
		}
if(w6 != null){
			w6.dismiss();
			w6 = null;
		}
if(w5 != null){
			w5.dismiss();
			w5 = null;
		}
}}));
		}
if(Mode == 1)
{
if(Tick == 1)
{
Xpos = Player.getX();
Zpos = Player.getZ();
Ypos = Player.getY();
Tick++;
}
if(Tick == 3)
{
Tick = 1;
Xdiff = Player.getX() - Xpos;
Zdiff = Player.getZ() - Zpos;
Ydiff = Player.getX() - Ypos;
Entity.setVelX(Player.getEntity(),Xdiff*speed);
Entity.setVelZ(Player.getEntity(),Zdiff*speed);
ParticleEffect( getPlayerX(),getPlayerY()-2,getPlayerZ());
}
if(Tick!=1)
{
Tick++;
}
}
else
if(Mode == 0)
{
if(Tick == 1)
{
Xpos = Player.getX();
Zpos = Player.getZ();
Ypos = Player.getY();
Tick++;
}
if(Tick == 3)
{
Tick = 1;
Xdiff = Player.getX() - Xpos;
Ydiff = Player.getX() - Ypos;
Zdiff = Player.getZ() - Zpos;
}
if(Tick!=1)
{
Tick++;
}
}
else
if(grap==1&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())!=0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ())==0){
GMode=0;
}
if(getTile(getPlayerX(),getPlayerY()+1,getPlayerZ())==101&&getTile(getPlayerX(),getPlayerY(),getPlayerZ())==0&&grap==1)
{
player=getPlayerEnt();
setVelY(player,0.2);
}
else
if(getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==101&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ())==101&&grap==1&&GMode==2)
{
player=getPlayerEnt();
setVelY(player,0.4);
GMode=0;
}
else if(getTile(getPlayerX()+1,getPlayerY(),getPlayerZ())==44&&getTile(getPlayerX()+1,getPlayerY()-1,getPlayerZ())==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
player=getPlayerEnt();
setVelY(player,0.4);
}
else if(getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())==44&&getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
player=getPlayerEnt();
setVelY(player,0.4);
}
else
if(getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)==44&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1 &&GMode==2 )
{
player=getPlayerEnt();
setVelY(player,0.4);
}
else
if(getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)==44&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
player=getPlayerEnt();
setVelY(player,0.4);
}
else if(getTile(getPlayerX()+1,getPlayerY()+1,getPlayerZ())==0&&getTile(getPlayerX()+1,getPlayerY()-1,getPlayerZ())!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
setVelY(player,0.017);
}
else if(getTile(getPlayerX()-1,getPlayerY()+1,getPlayerZ())==0&&getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
setVelY(player,0.017);
}
else
if(getTile(getPlayerX(),getPlayerY()+1,getPlayerZ()+1)==0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
setVelY(player,0.017);
}
else
if(getTile(getPlayerX(),getPlayerY()+1,getPlayerZ()-1)==0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==2)
{
setVelY(player,0.017);
}
if(getTile(px+1,py,pz)==0&&getTile(px+1,py-1,pz)!=0&&getTile(px,py-2,pz)==0&&grap==1&&GMode==2)
{
setVelY(player,0.4);
}
if(getTile(px-1,py,pz)==0&&getTile(px-1,py-1,pz)!=0&&getTile(px,py-2,pz)==0&&grap==1&&GMode==2)
{
setVelY(player,0.4);
}
if(getTile(px,py,pz+1)==0&&getTile(px,py-1,pz+1)!=0&&getTile(px,py-2,pz)==0&&grap==1&&GMode==2)
{
setVelY(player,0.4);
}
if(getTile(px,py,pz-1)==0&&getTile(px,py-1,pz-1)!=0&&getTile(px,py-2,pz)==0&&grap==1&&GMode==2)
{
setVelY(player,0.4);
}
else if(getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())==44&&getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else
if(getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)==44&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else
if(getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)==44&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)==44&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else if(getTile(getPlayerX()+1,getPlayerY()+1,getPlayerZ())==0&&getTile(getPlayerX()+1,getPlayerY()-1,getPlayerZ())!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else if(getTile(getPlayerX()-1,getPlayerY()+1,getPlayerZ())==0&&getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else
if(getTile(getPlayerX(),getPlayerY()+1,getPlayerZ()+1)==0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else
if(getTile(getPlayerX(),getPlayerY()+1,getPlayerZ()-1)==0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)!=0&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==0&&grap==1&&GMode==1)
{
player=getPlayerEnt();
setVelY(player,0);
}
else
if(getTile(getPlayerX()+1,getPlayerY()-1,getPlayerZ())==0&&getTile(getPlayerX()-1,getPlayerY()-1,getPlayerZ())==0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()-1)==0&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ()+1)==0){
MS=2;
}
if(getTile(getPlayerX(),getPlayerY()-1,getPlayerZ())==9&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())==9)
{
if(w7 == null){
			Swim();
}
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
if(w1 != null){
			w1.dismiss();
			w1 = null;
		}
}}));
}
if(getTile(getPlayerX(),getPlayerY()+1,getPlayerZ())!=9&&getTile(getPlayerX(),getPlayerY()+2,getPlayerZ())!=9&&getTile(getPlayerX(),getPlayerY(),getPlayerZ())!=9&&getTile(getPlayerX(),getPlayerY()-1,getPlayerZ())!=9&&getTile(getPlayerX(),getPlayerY()-2,getPlayerZ())!=9&&getTile(getPlayerX(),getPlayerY()-3,getPlayerZ())!=9)
{
if(w1 == null){
			Ron();
}
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
if(w7 != null){
			w7.dismiss();
			w7 = null;
		}
}}));
}
else
if(a==0){
clientMessage("Mode"+Mode+"walk"+time+"energy"+time2+"spead"+Math.abs(getPlayerY()-Ypos));
}
if( Math.abs(getPlayerY()-Ypos)>5&&Math.abs(getPlayerY()-Ypos)<10&&Math.abs(getPlayerY()-bottomBlocky)<5)
{
ParticleEffect(getPlayerX(),bottomBlocky-1,getPlayerZ());
}
else
if( Math.abs(getPlayerY()-Ypos)>1&&Math.abs(getPlayerY()-bottomBlocky)<5)
{
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ());
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ()-1);
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ()+1);
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ());
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ()-1);
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ()+1);
ParticleEffect(getPlayerX(),bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX()+1,bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX()-1,bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX(),bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()+1,bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()-1,bottomBlocky-1,getPlayerZ()-2);
}
else if( Math.abs(getPlayerY()-Ypos)>1.9&&Math.abs(getPlayerY()-bottomBlocky)<5)
{
ParticleEffect(getPlayerX()+3,bottomBlocky-1,getPlayerZ());
ParticleEffect(getPlayerX()+3,bottomBlocky-1,getPlayerZ()-1);
ParticleEffect(getPlayerX()+3,bottomBlocky-1,getPlayerZ()+1);
ParticleEffect(getPlayerX()-3,bottomBlocky-1,getPlayerZ());
ParticleEffect(getPlayerX()-3,bottomBlocky-1,getPlayerZ()-1);
ParticleEffect(getPlayerX()-3,bottomBlocky-1,getPlayerZ()+1);
ParticleEffect(getPlayerX(),bottomBlocky-1,getPlayerZ()+3);
ParticleEffect(getPlayerX()+1,bottomBlocky-1,getPlayerZ()+3);
ParticleEffect(getPlayerX()-1,bottomBlocky-1,getPlayerZ()+3);
ParticleEffect(getPlayerX(),bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()+1,bottomBlocky-1,getPlayerZ()-3);
ParticleEffect(getPlayerX()-1,bottomBlocky-1,getPlayerZ()-3);
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX()-1,bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()+1,bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX()+1,bottomBlocky-1,getPlayerZ()-2);
ParticleEffect(getPlayerX()-1,bottomBlocky-1,getPlayerZ()+2);
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ()-1);
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ()+1);
ParticleEffect(getPlayerX()+2,bottomBlocky-1,getPlayerZ()-1);
ParticleEffect(getPlayerX()-2,bottomBlocky-1,getPlayerZ()+1);
}
else
if(MStime>0){
MStime--;
}
else
if(MS==1&&MStime==0){
MS=2;
MStime=4;
Entity.setRenderType(Player.getEntity(),11);
}
else
if(MS==2&&MStime==0){
MS=0;
MStime=4;
Entity.setRenderType(Player.getEntity(),3);
}
}
function bottomBlockP( x , z )
{
for( var i = getPlayerY() ; i > 0; i-- )
{
if( getTile( x , i , z ) != 0 )
{
return i + 1;
}
}
}
function ParticleEffect( x , y , z )
{
ParticleEffectId=getTile( x , y , z );
ParticleEffectDamage=Level.getData( x , y , z );
Level.destroyBlock( x ,y , z ,false);
setTile( x , y , z , ParticleEffectId , ParticleEffectDamage );
}

function leaveGame(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
if(w1 != null){
w1.dismiss();
w1 = null;
}
if(w2 != null){
w2.dismiss();
w2 = null;
}
if(w3 != null){
			w3.dismiss();
			w3 = null;
		}
if(w4 != null){
			w4.dismiss();
			w4 = null;
		}
if(w5 != null){
			w5.dismiss();
			w5 = null;
		}
if(w6 != null){
			w6.dismiss();
			w6 = null;
		}
if(w7 != null){
			w7.dismiss();
			w7 = null;
		}
if(w8 != null){
			w8.dismiss();
			w8 = null;
		}
if(w9 != null){
			w9.dismiss();
			w9 = null;
		}
if(btnWindow != null){
			btnWindow.dismiss();
			btnWindow = null;
		}
if(openWindow != null){
			openWindow.dismiss();
			openWindow = null;
		}
		if(mainWindow != null){
			mainWindow.dismiss();
			mainWindow = null;
		}
if(addWindow != null){
			addWindow.dismiss();
			addWindow = null;
		}
if(GUI2 != null){
GUI2.dismiss();
		coordView = false;
}
if(btnWindow != null){
			btnWindow.dismiss();
			btnWindow = null;
		}
	}}));
if(Mode==1){
Mode=0;
}
}

function menu(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	try{
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		var T_title = new android.widget.TextView(ctx);
 T_title.setGravity(android.view.Gravity.CENTER);
		T_title.setText("SMARTMOVING");
		T_title.setTextSize(24);
		layout.addView(T_title);

var T_t = new android.widget.TextView(ctx);
 T_t.setGravity(android.view.Gravity.CENTER);
		T_t.setText("UserName:"+UserName());
		T_t.setTextSize(8);
		layout.addView(T_t);
		
		var E_speed = new android.widget.EditText(ctx);
  E_speed.setHint("RUN SPEED");
		E_speed.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layout.addView(E_speed);

		var B_set = new android.widget.Button(ctx);
		B_set.setText("Set");
		B_set.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				speed=E_speed.getText();
    clientMessage("RunningSpeed ×"+speed);
			}
		});
		layout.addView(B_set);

var B_test = new android.widget.Button(ctx);
		B_test.setText("Setting");
		B_test.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){

var addWindow = new android.widget.PopupWindow();
try{
var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		var T_title2 = new android.widget.TextView(ctx);
T_title2.setGravity(android.view.Gravity.CENTER);
		T_title2.setText("-SETTING-");
		T_title2.setTextSize(24);
		layout.addView(T_title2); 
var T_t2 = new android.widget.TextView(ctx);
 T_t2.setGravity(android.view.Gravity.CENTER);
		T_t2.setText("made by Its Team repa");
		T_t2.setTextSize(8);
		layout.addView(T_t2); 		
		 var B_chek = new android.widget.Button(ctx);
  if(coordView)
{
		B_chek .setText("Debugmod Off");
  }
  else if(!coordView)
  {
  B_chek .setText("Debugmod On");
  }
		B_chek .setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
   if(coordView)
	{
		GUI2.dismiss();
		coordView = false;
B_chek .setText("Debugmod On");
	}
	else if(!coordView)
	{
B_chek .setText("Debugmod Off");
coordView = true;
yaw = getYaw(Player.getEntity());
  pitch=Math.floor(getPitch());
  sin=-Math.sin(yaw/180*Math.PI);
  cos=Math.cos(yaw/180*Math.PI);
  tan=-Math.sin(pitch/180*Math.PI);
  pcos=Math.cos(pitch/180*Math.PI);
	sn=Math.round(-1*Math.sin(yaw*Math.PI/180));
	we=Math.round(Math.cos(yaw*Math.PI/180));

if(sn == -1) f = "0 (SOUTH)";
	else if(sn == 1) f = "2 (NORTH)";
	else if(we == -1) f = "3 (WEST)";
	else if(we == 1) f = "1 (EAST)";

		try{
		GUI2  = new android.widget.PopupWindow();
		var coordLayout = new android.widget.LinearLayout(ctx);
		xText = new android.widget.TextView(ctx);
		yText = new android.widget.TextView(ctx);
		zText = new android.widget.TextView(ctx);
		fText = new android.widget.TextView(ctx);
  xSText = new android.widget.TextView(ctx);
		ySText = new android.widget.TextView(ctx);
		zSText = new android.widget.TextView(ctx);

		coordLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
				
		coordLayout.addView(xText);
		coordLayout.addView(yText);
		coordLayout.addView(zText);
		coordLayout.addView(fText);
  coordLayout.addView(xSText);
		coordLayout.addView(ySText);
		coordLayout.addView(zSText);
		
		GUI2.setContentView(coordLayout);
		GUI2.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
		GUI2.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
		GUI2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		GUI2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 30, 100);

		
		coordView = true;
		
		}
		 catch(err){
		print("에러 발생!\n"+err);
	}
}
			}
		});
		layout.addView(B_chek);

 var B_gm = new android.widget.Button(ctx);
		B_gm.setText("Gamemode");
		B_gm.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
   addWindow2 = new android.widget.PopupWindow();
try{
		layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
var T_title3 = new android.widget.TextView(ctx);
T_title3.setGravity(android.view.Gravity.CENTER);
		T_title3.setText("-GAMMODE-");
		T_title3.setTextSize(24);
		layout.addView(T_title3);
		
		var E_gm = new android.widget.EditText(ctx);
  E_gm.setHint("GAMEMODE");
		E_gm.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layout.addView(E_gm);

		var B_set3 = new android.widget.Button(ctx);
		B_set3.setText("Set");
		B_set3.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
addWindow2.dismiss();
			addWindow2= null;
				 Level.setGameMode(E_gm.getText());
			 }
		});
 layout.addView(B_set3);
 
addWindow2 = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight()/2.5, true);
		addWindow2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		addWindow2.setOutsideTouchable(false);
		addWindow2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.CENTER, 0, 180);
	}catch(err){
		print("에러 발생!\n"+err);
	 	}
			}
		});
		layout.addView(B_gm);

var B_di = new android.widget.Button(ctx);
		B_di.setText("Difficulty");
		B_di.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
   addWindow2 = new android.widget.PopupWindow();
try{
		layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
var T_title4 = new android.widget.TextView(ctx);
T_title4.setGravity(android.view.Gravity.CENTER);
		T_title4.setText("-Difficulty-");
		T_title4.setTextSize(24);
		layout.addView(T_title4);

		var B_dif = new android.widget.Button(ctx);
		B_dif.setText("Easy");
		B_dif.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
print("Difficulty Easy");
addWindow3.dismiss();
			addWindow3= null;
				 difficulty=0;
			 }
		});
 layout.addView(B_dif);

var B_dif2 = new android.widget.Button(ctx);
		B_dif2.setText("Nomal");
		B_dif2.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
print("Difficulty Nomal");
addWindow3.dismiss();
			addWindow3= null;
				 difficulty=1;
			 }
		});
 layout.addView(B_dif2);

var B_dif3 = new android.widget.Button(ctx);
		B_dif3.setText("Hard");
		B_dif3.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
print("Difficulty Hard");
addWindow3.dismiss();
			addWindow3= null;
			 difficulty=2;
			 }
		});
 layout.addView(B_dif3);
 
addWindow3 = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight()/2, true);
		addWindow3.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		addWindow3.setOutsideTouchable(false);
		addWindow3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.CENTER, 0, 180);
	}catch(err){
		print("에러 발생!\n"+err);
	 	}
			}
		});
		layout.addView(B_di);

var B_dotton = new android.widget.Button(ctx);
		B_dotton.setText("Button");
		B_dotton.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
   addWindow4 = new android.widget.PopupWindow();
try{
		layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
var T_title5 = new android.widget.TextView(ctx);
T_title5.setGravity(android.view.Gravity.CENTER);
		T_title5.setText("-Button-");
		T_title5.setTextSize(24);
		layout.addView(T_title5);

		var B_dotton1= new android.widget.Button(ctx);
		 B_dotton1.setText("On");
		 B_dotton1.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
leaveGame();
newLevel();
			 }
		});
 layout.addView(B_dotton1);

var B_dotton2= new android.widget.Button(ctx);
		 B_dotton2.setText("R OFF");
		 B_dotton2.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
if(w1 != null){
  w1.dismiss();
			w1 = null;
}
			 }
		});
 layout.addView(B_dotton2);

var B_dotton3= new android.widget.Button(ctx);
		 B_dotton3.setText("G OFF");
		 B_dotton3.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
if(w2 != null){
   w2.dismiss();
			w2 = null;
}
			 }
		});
 layout.addView(B_dotton3);
 
addWindow4 = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight()/2, true);
		addWindow4.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		addWindow4.setOutsideTouchable(false);
		addWindow4.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.CENTER, 0, 180);
	}catch(err){
		print("에러 발생!\n"+err);
	 	}
			}
		});
		layout.addView(B_dotton);

 var B_exit2 = new android.widget.Button(ctx);
		B_exit2.setText("Back");
		B_exit2.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				 addWindow.dismiss();
			addWindow = null; 
			}
		});
		layout.addView(B_exit2);

addWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
		addWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		addWindow.setOutsideTouchable(false);
		addWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
	}catch(err){
		print("에러 발생!\n"+err);
	}
			}
		});
  layout.addView(B_test);
 		
		var B_exit = new android.widget.Button(ctx);
		B_exit.setText("Exit");
		B_exit.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				mainWindow.dismiss();
				mainWindow = null;
			}
		});
		layout.addView(B_exit);
		
		mainWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
		mainWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		mainWindow.setOutsideTouchable(false);
		mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
	}catch(err){
		print("에러 발생!\n"+err);
	}
}
function Off(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run:
function() {
if(btnWindow != null){
			btnWindow.dismiss();
			btnWindow = null;
		}
}}));
}
function Goff(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run:
function() {
if(w3 != null){
			w3.dismiss();
			w3 = null;
		}
}}));
}
function Joff(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run:
function() {
if(w9 != null){
			w9.dismiss();
			w9 = null;
		}
}}));
}

function UserName() {
br=new java.io.BufferedReader(new FileReader(options));
var line=(br.readLine()).split(":");
return line[1];
br.close();
}

function deathHook(attacker, victim)
{
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==32)
{
clientMessage( UserName()+ " was slained up by Zombie");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==35)
{
clientMessage( UserName()+ " was slained up by Spider");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==34)
{
clientMessage( UserName()+ " was shot by skeleton");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==33)
{
clientMessage(UserName()+" was blown up by Creeper");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==36)
{
clientMessage(UserName()+" was slained up by PigZombie");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==0)
{
clientMessage(UserName()+" was Killed by Another Factor");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==80)
{
clientMessage(UserName()+" was Shot by Arrow");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==65)
{
clientMessage(UserName()+" was blown up by Primed TNT");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==66)
{
clientMessage(UserName()+" was suffocated in a wall");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==81)
{
clientMessage(UserName()+"was Killed by Thrown Snowball");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==67)
{
clientMessage(UserName()+" was Killed by Falling Gravel");
}
else
if(Entity.getEntityTypeId(victim)==0&&Entity.getEntityTypeId(attacker)==82)
{
clientMessage(UserName()+" was Killed by Thrown Egg");
}
}