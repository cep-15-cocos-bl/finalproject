var world;

var scene01 = cc.Scene.extend({

    platforms: [],
    btnLayer: null,
    player: null,
    graveyard: [],
    crumblingPlatforms: [],

    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        world = new cp.Space();
        world.gravity = cp.v(0, 100);
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
            this.crumblingPlatforms.push(this.platforms[i + 11]);
        }

        this.platforms[17] = new CrumblingPlatformClass(this, world, 120, 90);
        this.crumblingPlatforms.push(this.platforms[17]);

        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < 10; j++) {
                this.platforms[i * 10 + j + 18] = new CrumblingPlatformClass(this, world, j * 40 + 120, i * 10 + 295);
                this.crumblingPlatforms.push(this.platforms[i * 10 + j + 18]);
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
            31, Infinity, Infinity, 380, 365, ["box", 160, 10], 0, 0, "ground"
        );        

        this.btnLayer = new buttonLayer();
        this.addChild(this.btnLayer);

        this.player = new PlayerClass(this, world, 40, 540, 10, 20, false, res.player_png);

        world.env = this;
        world.setDefaultCollisionHandler(
            this.beginCollision,
            this.preCollision,
            this.postCollision,
            null
        );

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

    beginCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == arbiter.b.collision_type) {
            return false;
        } else if(arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "spike" || 
            arbiter.b.collision_type == "ground" && arbiter.a.collision_type == "spike") {
            return false;
        } else if(arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "crumbling" || 
            arbiter.b.collision_type == "ground" && arbiter.a.collision_type == "crumbling") {
            return false;
        }

        return true;
    },

    preCollision: function(arbiter, space) {
        return true;
    },

    postCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == "crumbling" && arbiter.b.collision_type == "player") {
            this.crumblingPlatforms[arbiter.a.crumblingId].decaying = true;
        } else if(arbiter.b.collision_type == "crumbling" && arbiter.a.collision_type == "player") {
            this.crumblingPlatforms[arbiter.b.crumblingId].decaying = true;
        }
    },

    update: function(dt) {
        world.step(dt);

        for(var i = 0; i < this.crumblingPlatforms.length; i++) {
            if(this.crumblingPlatforms[i].decaying) {
                this.crumblingPlatforms[i].advanceDecay(dt);
            }
        }
    }

});
