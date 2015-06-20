var world;
var a = 60;
var trinketnum = 0;
var moving = false;
var crumblingPlatforms = [];
var prevplayerx = 0;
var curplayerx = 0;
var dir = 2;
var move = 0;
var flipped = true;
var grav = 200;
var moved = false;
var trinkets = [];
var stage2 = cc.Scene.extend({

    platforms: [],
    graveyard: [],

    onEnter: function() {
        this._super();
        deathCooldown = 1;
        winSize = cc.director.getWinSize();
        var background = new Backgroundlayer2();
        this.addChild(background);
        background.setPosition(400 ,winSize.height/2);
        world = new cp.Space();
        world.gravity = cp.v(0, 200);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);

        this.createPlatform(
            0, Infinity, Infinity, 80, 0, ["box", 140, 50], 0, 0, "ground"
        );
        this.createPlatform(
            1, Infinity, Infinity, 0, 0, ["box", 20, 1200], 0, 0, "ground"
        );
        this.createPlatform(
            2, Infinity, Infinity, 230, 0, ["box", 160, 100], 0, 0, "ground"
        );

        this.createPlatform(
            3, Infinity, Infinity, 335, 300, ["box", 650, 20], 0, 0, "ground"
        );
        this.createPlatform(
            4, Infinity, Infinity, 390, 0, ["box", 160, 150], 0, 0, "ground"
        );
        this.createPlatform(
            5, Infinity, Infinity, 550, 0, ["box", 160, 200], 0, 0, "ground"
        );
        this.createPlatform(
            6, Infinity, Infinity, 710, 0, ["box", 160, 250], 0, 0, "ground"
        );
        this.createPlatform(
            7, Infinity, Infinity, 800, 0, ["box", 18, 1200], 0, 0, "ground"
        );
        this.createPlatform(
            8, Infinity, Infinity, 230, 280, ["box", 100, 20], 0, 0, "ground"
        );
        this.createPlatform(
            9, Infinity, Infinity, 540, 280, ["box", 100, 20], 0, 0, "ground"
        );
        this.createPlatform(
            10, Infinity, Infinity, 700, 400, ["box", 180, 20], 0, 0, "ground"
        );
        this.createPlatform(
            11, Infinity, Infinity, 500, 405, ["box", 20, 190], 0, 0, "ground"
        );
        this.createPlatform(
            12, Infinity, Infinity, 400, 590, ["box", 780, 20], 0, 0, "ground"
        );
        this.createPlatform(
            13, Infinity, Infinity, 600, 490, ["box", 180, 20], 0, 0, "ground"
        );
        this.createPlatform(
            15, Infinity, Infinity, 200, 530, ["box", 10, 100], 0, 0, "ground"
        );
        this.createPlatform(
            16, Infinity, Infinity, 100, 360, ["box", 10, 100], 0, 0, "ground"
        );
        this.createPlatform(
            17, Infinity, Infinity, 300, 360, ["box", 10, 100], 0, 0, "ground"
        );
        this.createPlatform(
            18, Infinity, Infinity, 400, 530, ["box", 10, 100], 0, 0, "ground"
        );
        this.createPlatform(
            19, Infinity, Infinity, 540, 265, ["box", 100, 10], 0, 0, "spike"
        );
        this.createPlatform(
            20, Infinity, Infinity, 230, 265, ["box", 100, 10], 0, 0, "spike"
        );
        this.createPlatform(
            21, Infinity, Infinity, 155, 315, ["box", 100, 10], 0, 0, "spike"
        );
        this.createPlatform(
            22, Infinity, Infinity, 255, 575, ["box", 100, 10], 0, 0, "spike"
        );
        this.createPlatform(
            23, Infinity, Infinity, 785, 258, ["box", 10, 265], 0, 0, "spike"
        );
        this.createPlatform(
            24, Infinity, Infinity, 515, 395, ["box", 10, 170], 0, 0, "spike"
        );
        this.createPlatform(
            24, Infinity, Infinity, 785, 495, ["box", 10, 168], 0, 0, "spike"
        );
        this.btnLayer = new buttonLayer();
        this.addChild(this.btnLayer);
        player = new PlayerClass(this, world, 40, 100, 10, 20, false, res.player_png);
        player.pos();
        dir = 4;
        console.log(trinketnum);
        trinkets[0] = new TrinketClass(this, world, 40, 550, 0);
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

        //console.log(crumblingPlatforms[17]);
        this.statLayer = new StatusLayer();
        this.addChild(this.statLayer);

        this.scheduleUpdate();
    },

    createPlatform: function(id, mass, moment, x, y, shapeArray, friction, elasticity, type) {
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
        platShape.setFriction(0);
        platShape.setElasticity(0);
        platShape.setCollisionType(type);
        platShape.name = "platform" + id;
        platShape.exists = true;

        this.platforms["plat" + id] = platShape;
    },

    update: function(dt) {
        world.step(dt);
        deathCooldown -= dt;
        curplayerx = player.pbody.p.x;
        if(trinketnum == 1){
            cc.director.runScene(new stage3());
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
                if(deathCooldown <= 0 && this.statLayer.useLife()) {
                    deathCooldown = 1;
                    for(var i = 0; i < crumblingPlatforms.length ;i++) {
                        crumblingPlatforms[i].reset();
                    }
                    player.pbody.setPos(40, 100);                    
                }
            }

            this.graveyard.splice(i, 1);
        }
        player.shape.image.x = player.pbody.p.x;
    player.shape.image.y = player.pbody.p.y;
        prevplayerx = curplayerx;
    },

    addScore: function() {
        this.statLayer.addScore();
    }


})

var Backgroundlayer2  = cc.Sprite.extend({
  ctor:function() {
    this._super();
    this.initWithFile(res.background2_png);
  }
})
