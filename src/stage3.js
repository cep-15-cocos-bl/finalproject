var moving = false;
var crumblingPlatforms = [];
var prevplayerx = 0;
var curplayerx = 0;
var dir = 2;
var move = 0;
var flipped = false;
var grav = -200;
var moved = false;
var trinkets = [];

var stage3 = cc.Scene.extend({

    platforms: [],
    graveyard: [],

    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();
                var background = new Backgroundlayer3();
        this.addChild(background);
        background.setPosition(400 ,winSize.height/2);
        world = new cp.Space();
        world.gravity = cp.v(0, -200);
        this.createPlatform(
            0, Infinity, Infinity, 50, 500, ["box", 100, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 500, 500, ["box", 600, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 750, 400, ["box", 100, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 300, 400, ["box", 600, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 690, 300, ["box", 220, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 240, 300, ["box", 480, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 750, 200, ["box", 100, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 300, 200, ["box", 600, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 50, 100, ["box", 100, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 500, 100, ["box", 600, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 400, 10, ["box", 800, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 590, 450, ["box", 20, 80], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 590, 350, ["box", 20, 80], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 590, 250, ["box", 20, 80], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 90, 150, ["box", 20, 80], 0, 0
        );

        this.btnLayer = new buttonLayer();
        this.addChild(this.btnLayer);
        player = new PlayerClass(this, world, 40, 580, 10, 20, false, res.player_png);
        trinkets[0] = new TrinketClass(this, world, 35, 130, 0);
        curplayerx = player.pbody.p.x;
        prevplayerx = player.pbody.p.x;
        world.env = this;
        world.setDefaultCollisionHandler(
            collisionHandler.beginCollision,
            collisionHandler.preCollision,
            collisionHandler.postCollision,
            collisionHandler.endCollision
        );
        var listener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  
  onTouchBegan: function (touch, event) { 
    //console.log("pressed");
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                curplayerx = player.shape.image.x;
            if(70<touch.getLocationX() && touch.getLocationX()<110 && 10<touch.getLocationY() && touch.getLocationY()<50 && moving == false){
                //console.log("moving");
            player.moveright(60, flipped);
            moving = true;
            dir = 2; //RIGHT
            move = 100;
        }
        else if(10<touch.getLocationX() && touch.getLocationX()<50 && 10<touch.getLocationY() && touch.getLocationY()<50 && moving == false){
            //console.log("moving left");
            player.moveleft(-60, flipped);
            moving = true;
            dir = 1; //LEFT
            move = -100;
        }
            a = 0;
                            if(touch.getLocationX()>300){
            //console.log("flipping");
            if(flipped == true){
                flipped = false;
            }
            else{
            flipped = true;
            dir = dir+2;
        }
        console.log(dir);
            player.flip(dir);
            a = 60;
            grav = grav*-1;
            world.gravity = cp.v(0, grav);  
            if(flipped == true){
            dir = dir-2;
        }
        canflip = false;
    }
                    return true;
                console.log("Start");
                moving = false;
            
        },
        //Trigger when moving touch  
        //Process the touch end event
        onTouchEnded: function (touch, event) { 
            playerx = player.shape.image.x;
        if(moving == true){      
        player.stop(move);
        a = 60;
        moving = false;
    }   

           
        }
})

        cc.eventManager.addListener(listener, this);
        this.scheduleUpdate();
    },

    createPlatform: function(id, mass, moment, x, y, shapeArray, friction, elasticity) {
        var platBody = new cp.Body(mass, moment);
        platBody.setPos(cp.v(x, y))

        var platShape;

        if(shapeArray[0] == "box") {
            platShape = new cp.BoxShape(platBody, shapeArray[1], shapeArray[2]);
        } else if(shapeArray[0] == "circle") {
            platShape = new cp.CircleShape(platBody, shapeArray[1], cp.vzero);
        } else if(shapeArray[0] == "segment") {
            platShape = new cp.SegmentShape(platBody, shapeArray[1], shapeArray[2], shapeArray[3]);
        } else if(shapeArray[0] == "poly") {
            platShape = new cp.PolyShape(platBody, shapeArray[1], shapeArray[2]);
        }

        platShape = world.addShape(platShape);
        platShape.setFriction(friction);
        platShape.setElasticity(elasticity);
        platShape.setCollisionType("ground");
        platShape.name = "platform" + id;

        this.platforms["plat" + id] = platShape;
    },

    update: function(dt) {
        world.step(dt);
        curplayerx = player.pbody.p.x;
        if(curplayerx<0){
            player.pbody.p.x = 800;
        }
        else if(curplayerx>800){
            player.pbody.p.x = 0;
        }
        if(trinketnum == 1){
            cc.director.runScene(new EndScene());
        }
        var bigger = Math.max(curplayerx, prevplayerx);
        var smaller = Math.min(curplayerx, prevplayerx);
        if(bigger - smaller <0.5){
            //console.log("not moving")
            moving = false;
        }
        for(var i = 0; i < this.graveyard.length; i++) {

            //console.log(this.graveyard[i].collision_type);

            if(this.graveyard[i].collision_type == "trinket") {
                trinkets[this.graveyard[i].id].die();
                trinketnum =trinketnum+1;
                ("trinket collected");
            } else if(this.graveyard[i].collision_type == "player") {
                this.statLayer.useLife();
                /*if(--this.statLayer.lives > 0) {
                    for(var i = 0; i < crumblingPlatforms.length ;i++) {
                        crumblingPlatforms[i].reset();
                    }
                } else {
                    player.die();
                }*/
            }

            this.graveyard.splice(i, 1);
        }
        player.shape.image.x = player.pbody.p.x;
    player.shape.image.y = player.pbody.p.y;
        prevplayerx = curplayerx;
    },
});


var Backgroundlayer3  = cc.Sprite.extend({
  ctor:function() {
    this._super();
    this.initWithFile(res.background3_png);
  }
})
