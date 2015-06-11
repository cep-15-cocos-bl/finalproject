var world;

var crumblingPlatforms = [];

var scene01 = cc.Scene.extend({

    platforms: [],
    btnLayer: null,
    statLayer: null,
    player: null,
    graveyard: [],

    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        world.gravityDown = true;
        world.invertGravity = function() {
            if(world.gravityDown) {
                world.gravityDown = false;
                world.gravity = cp.v(0, 100);
            } else {
                world.gravityDown = true;
                world.gravity = cp.v(0, -100);
            }
        }

        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);

        this.createPlatform(
            0, Infinity, Infinity, 75, 580, ["box", 150, 40], 0, 0, "ground"
        );

        this.createPlatform(
            1, Infinity, Infinity, 5, 280, ["box", 10, 560], 0, 0, "ground"
        );

        this.createPlatform(
            2, Infinity, Infinity, 130, 470, ["box", 240, 80], 0, 0, "ground"
        );

        this.createPlatform(
            3, Infinity, Infinity, 30, 240, ["box", 40, 380], 0, 0, "ground"
        );

        this.createPlatform(
            4, Infinity, Infinity, 75, 155, ["box", 50, 20], 0, 0, "ground"
        );

        this.createPlatform(
            5, Infinity, Infinity, 105, 25, ["box", 190, 50], 0, 0, "ground"
        );

        this.createPlatform(
            6, Infinity, Infinity, 320, 120, ["box", 240, 240], 0, 0, "ground"
        );

        this.createPlatform(
            7, Infinity, Infinity, 520, 100, ["box", 160, 200], 0, 0, "ground"
        );

        this.createPlatform(
            8, Infinity, Infinity, 700, 250, ["box", 200, 500], 0, 0, "ground"
        );

        this.createPlatform(
            9, Infinity, Infinity, 650, 580, ["box", 300, 40], 0, 0, "ground"
        );

        this.createPlatform(
            10, Infinity, Infinity, 325, 595, ["box", 350, 10], 0, 0, "ground"
        );

        for(var i = 0; i < 6; i++) {
            this.platforms[i + 11] = new CrumblingPlatformClass(this, world, i * 40 + 180, 565);
            crumblingPlatforms.push(this.platforms[i + 11]);
        }

        this.platforms[17] = new CrumblingPlatformClass(this, world, 120, 90);
        crumblingPlatforms.push(this.platforms[17]);

        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < 10; j++) {
                this.platforms[i * 10 + j + 18] = new CrumblingPlatformClass(this, world, j * 40 + 120, i * 10 + 295);
                crumblingPlatforms.push(this.platforms[i * 10 + j + 18]);
            }
        }

        this.createPlatform(
            38, Infinity, Infinity, 160, 205, ["box", 30, 30], 0, 0, "ground"
        );

        this.createPlatform(
            39, Infinity, Infinity, 380, 420, ["box", 160, 100], 0, 0, "ground"
        );

        this.createPlatform(
            40, Infinity, Infinity, 325, 585, ["box", 350, 10], 0, 0, "spike"
        );

        this.createPlatform(
            41, Infinity, Infinity, 130, 515, ["box", 240, 10], 0, 0, "spike"
        );

        this.createPlatform(
            42, Infinity, Infinity, 150, 425, ["box", 200, 10], 0, 0, "spike"
        );

        this.createPlatform(
            43, Infinity, Infinity, 75, 170, ["box", 50, 10], 0, 0, "spike"
        );

        this.createPlatform(
            44, Infinity, Infinity, 75, 140, ["box", 50, 10], 0, 0, "spike"
        );

        this.createPlatform(
            45, Infinity, Infinity, 160, 225, ["box", 30, 10], 0, 0, "spike"
        );

        this.createPlatform(
            46, Infinity, Infinity, 160, 185, ["box", 30, 10], 0, 0, "spike"
        );

        this.createPlatform(
            47, Infinity, Infinity, 320, 245, ["box", 240, 10], 0, 0, "spike"
        );

        this.createPlatform(
            48, Infinity, Infinity, 125, 55, ["box", 150, 10], 0, 0, "spike"
        );

        this.createPlatform(
            49, Infinity, Infinity, 520, 205, ["box", 160, 10], 0, 0, "spike"
        );

        this.createPlatform(
            50, Infinity, Infinity, 380, 475, ["box", 160, 10], 0, 0, "ground"
        );

        this.createPlatform(
            51, Infinity, Infinity, 380, 365, ["box", 160, 10], 0, 0, "ground"
        );

        this.createPlatform(
            52, Infinity, Infinity, 520, 225, ["box", 160, 10], 0, 0, "spike"
        );

        trinkets[0] = new TrinketClass(this, world, 335, 535, 0);
        trinkets[1] = new TrinketClass(this, world, 120, 120, 1);

        this.btnLayer = new buttonLayer();
        this.addChild(this.btnLayer);

        player = new PlayerClass(this, world, 40, 540, 10, 20, false, res.player_png);

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
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    player.walk(touch.getLocationX(), touch.getLocationY());
                }
            }
        });

        cc.eventManager.addListener(listener, this);

        console.log(player);

        this.statLayer = new StatusLayer();
        this.addChild(this.statLayer);

        //console.log(crumblingPlatforms[17]);

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
        platShape.setFriction(friction);
        platShape.setElasticity(elasticity);
        platShape.setCollisionType(type);
        platShape.name = "platform" + id;
        platShape.exists = true;

        this.platforms["plat" + id] = platShape;
    },

    update: function(dt) {
        world.step(dt);
        player.shape.image.x = player.pbody.p.x;
            player.shape.image.y = player.pbody.p.y;

        for(var i = 0; i < crumblingPlatforms.length; i++) {
            if(crumblingPlatforms[i].pshape.decaying) {
                crumblingPlatforms[i].advanceDecay(dt);
            }
        }

        for(var i = 0; i < this.graveyard.length; i++) {

            console.log(this.graveyard[i].collision_type);

            if(this.graveyard[i].collision_type == "trinket") {
                trinkets[this.graveyard[i].id].die();
            } else if(this.graveyard[i].collision_type == "player") {
                this.statLayer.useLife();
                if(--this.statLayer.lives > 0) {
                    player.die();
                    for(var i = 0; i < crumblingPlatforms.length ;i++) {
                        crumblingPlatforms[i].reset();
                    }
                } else {
                    this.statLayer.lives = 5;
                }
            }

            this.graveyard.splice(i, 1);
        }
    },

    addScore: function() {
        this.statLayer.addScore();
    }

});