var PlayerClass  = cc.Sprite.extend({
	pName:"Player",
  world:null,
  pbody:null,
  shape:null,
  playerSprite:null,
  walkLAction:null,
  walkRAction:null,
  UwalkLAction:null,
  UwalkRAction:null,
  WLspriteSheet:null,
  WRspriteSheet:null,
  UWLspriteSheet:null,
  UWRspriteSheet:null,
  ctor:function(game,gWorld,posX,posY,width,height,isDynamic,spriteImage) {
   // this._super();

  cc.spriteFrameCache.addSpriteFrames(res.walkL_plist);
  this.WLspriteSheet = new cc.SpriteBatchNode(res.a_png);
  cc.spriteFrameCache.addSpriteFrames(res.walkR_plist);
  this.WRspriteSheet = new cc.SpriteBatchNode(res.walkR_png);
  cc.spriteFrameCache.addSpriteFrames(res.UwalkL_plist);
  this.UWLspriteSheet = new cc.SpriteBatchNode(res.UwalkL_png);
  cc.spriteFrameCache.addSpriteFrames(res.UwalkR_plist);
  this.UWRspriteSheet = new cc.SpriteBatchNode(res.UwalkR_png);
  this.addChild(this.WLspriteSheet);
  this.addChild(this.WRspriteSheet);
  this.addChild(this.UWLspriteSheet);
  this.addChild(this.UWRspriteSheet);
//2.create spriteframe array
var walkLFrames = [];
var walkRFrames = [];
var UwalkLFrames = [];
var UwalkRFrames = [];
for (var i = 1; i < 3; i++) {
    var str = "a" + i + ".png";
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    walkLFrames.push(frame);
}
for (var i = 1; i < 3; i++) {
    var str = "walkR" + i + ".png";
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    walkRFrames.push(frame);
}
for (var i = 1; i < 3; i++) {
    var str = "UwalkL" + i + ".png";
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    UwalkLFrames.push(frame);
}
for (var i = 1; i < 3; i++) {
    var str = "UwalkR" + i + ".png";
    var frame = cc.spriteFrameCache.getSpriteFrame(str);
    UwalkRFrames.push(frame);
}
//3.create a animation with the spriteframe array along with a period time
var WLanimation = new cc.Animation(walkLFrames, 0.3);
var WRanimation = new cc.Animation(walkRFrames, 0.3);
var UWLanimation = new cc.Animation(UwalkLFrames, 0.3);
var UWRanimation = new cc.Animation(UwalkRFrames, 0.3);
this.WLwalkAction = new cc.RepeatForever(new cc.Animate(WLanimation));
this.WRwalkAction = new cc.RepeatForever(new cc.Animate(WRanimation));
this.UWLwalkAction = new cc.RepeatForever(new cc.Animate(UWLanimation));
this.UWRwalkAction = new cc.RepeatForever(new cc.Animate(UWRanimation));
playerSprite = new cc.Sprite.create(spriteImage);
    game.addChild(playerSprite,0);
    playerSprite.setPosition(posX,posY);
    var spriteImage = res.player_png;
    world = gWorld;
    this.fixBody(game,gWorld,posX,posY,width,height,isDynamic,spriteImage);
    return this;
},
 fixBody: function(game,gWorld,posX,posY,width,height,isDynamic,spriteImage){
  
     this.pbody = new cp.Body(1,Infinity);
     this.pbody.setPos(cp.v(posX,posY));
     world.addBody(this.pbody);
     this.shape = new cp.BoxShape(this.pbody, width, height);
     this.shape.setFriction(1);
     this.shape.setElasticity(0);
     this.shape.image = playerSprite;
     this.shape.setCollisionType("player");
     world.addShape(this.shape);
},

walk:function(x, y){
  playerSprite.stopAllActions();
  //prototype.velocity_func.call(pbody, 100, 10, dt); 
  var curPosX = this.pbody.getPos().x;
  var curPosY = this.pbody.getPos().y;
  if(x < this.pbody.getPos().x && y < this.pbody.getPos().y) { // left, forward
            playerSprite.runAction(this.WLwalkAction);
            console.log("left");
            this.pbody.applyImpulse(cp.v(-60, 0), cp.v(0, 0));
            world.gravity = cp.v(0, -100);
        } else if(x < this.pbody.getPos().x  && y >= this.pbody.getPos().y ) { // left, upward
            playerSprite.runAction(this.UWLwalkAction);
            console.log("Uleft");
            this.pbody.applyImpulse(cp.v(-60, 0), cp.v(0, 0));
            world.gravity = cp.v(0, 100);
        } else if(x > this.pbody.getPos().x && y < this.pbody.getPos().y ) { // right, forward
            playerSprite.runAction(this.WRwalkAction);
            console.log("right");
            this.pbody.applyImpulse(cp.v(60, 0), cp.v(0, 0));
            world.gravity = cp.v(0, -100);
        } else if(x > this.pbody.getPos().x  && y >= this.pbody.getPos().y ) { // right, upward
            playerSprite.runAction(this.UWRwalkAction);
            console.log("Uright");
            this.pbody.applyImpulse(cp.v(60, 0), cp.v(0, 0));
            world.gravity = cp.v(0, 100);
        } else {
        }
  
 },
 stop:function(mov){
  //console.log(move);
  this.pbody.applyImpulse(cp.v(move*-1, 0), cp.v(0, 0));
  playerSprite.stopAllActions();
  //console.log("Stop");
 },
 moveright:function(a, b){
  this.pbody.applyImpulse(cp.v(100, 0), cp.v(0, 0));
  if(b == false){
  playerSprite.stopAllActions();
  playerSprite.runAction(this.WRwalkAction);
}
else{
  console.log("upside down right");
  this.stopAllActions();
  playerSprite.runAction(this.UWRwalkAction);
  this.pbody.applyImpulse(cp.v(0, 0), cp.v(0, 0));
  console.log(a);
}
 },
 moveleft:function(a, b){
  if(b == false){
  this.pbody.applyImpulse(cp.v(-100, 0), cp.v(0, 0));
  playerSprite.stopAllActions();
  playerSprite.runAction(this.WLwalkAction);
  console.log("walking left");
}
else{
  console.log("upside down left");
  this.stopAllActions();
  playerSprite.runAction(this.UWLwalkAction);
  this.pbody.applyImpulse(cp.v(-100, 0), cp.v(0, 0));
  console.log(a);
}
 },
 flip:function(dir){
  playerSprite.stopAllActions();
  if(dir == 1){
    playerSprite.runAction(this.WLwalkAction);
  }
  else if(dir == 2){
    playerSprite.runAction(this.WRwalkAction);
  }
  else if(dir == 4){
    playerSprite.runAction(this.UWRwalkAction);
 }
 else{
  playerSprite.runAction(this.UWLwalkAction);
 }
},
pos:function(){
  playerSprite.stopAllActions();
  playerSprite.runAction(this.UWRwalkAction);
}

})
