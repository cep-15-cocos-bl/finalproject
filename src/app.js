var world;

var scene01 = cc.Scene.extend({

    platforms: [],
    btnLayer: null,
    player: null,
    graveyard: [],

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

        this.createPlatform(
            11, Infinity, Infinity, 180, 565, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            12, Infinity, Infinity, 220, 565, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            13, Infinity, Infinity, 260, 565, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            14, Infinity, Infinity, 300, 565, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            15, Infinity, Infinity, 340, 565, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            16, Infinity, Infinity, 380, 565, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            17, Infinity, Infinity, 120, 75, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            18, Infinity, Infinity, 120, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            19, Infinity, Infinity, 160, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            20, Infinity, Infinity, 200, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            21, Infinity, Infinity, 240, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            22, Infinity, Infinity, 280, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            23, Infinity, Infinity, 320, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            24, Infinity, Infinity, 360, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            25, Infinity, Infinity, 400, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            26, Infinity, Infinity, 440, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            27, Infinity, Infinity, 480, 295, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            28, Infinity, Infinity, 480, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            29, Infinity, Infinity, 440, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            30, Infinity, Infinity, 400, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            31, Infinity, Infinity, 360, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            32, Infinity, Infinity, 320, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            33, Infinity, Infinity, 280, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            34, Infinity, Infinity, 240, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            35, Infinity, Infinity, 200, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            36, Infinity, Infinity, 160, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

        this.createPlatform(
            37, Infinity, Infinity, 120, 305, ["box", 40, 10], 0, 0, "crumbling"
        );

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
            47, Infinity, Infinity, 320, 245, ["box", 240, 10], 0, 0, "ground"
        );

        this.createPlatform(
            48, Infinity, Infinity, 125, 55, ["box", 150, 10], 0, 0, "ground"
        );

        this.createPlatform(
            49, Infinity, Infinity, 520, 205, ["box", 160, 10], 0, 0, "ground"
        );

        this.createPlatform(
            50, Infinity, Infinity, 380, 475, ["box", 160, 10], 0, 0, "ground"
        );

        this.createPlatform(
            31, Infinity, Infinity, 380, 365, ["box", 160, 10], 0, 0, "ground"
        );        

        this.btnLayer = new buttonLayer();
        this.addChild(this.btnLayer);

        this.player = new PlayerClass(this, world, 40, 540, 10, 20, false, null);

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

        this.platforms["plat" + id] = platShape;
    },

    beginCollision: function(arbiter, space) {
        if(arbiter.a.collision_type == "ground" && arbiter.b.collision_type == "ground") {
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

    },

    update: function(dt) {
        world.step(dt);
    }

});