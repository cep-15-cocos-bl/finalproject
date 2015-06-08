var world;

var scene01 = cc.Scene.extend({

    platforms: [],

    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();

        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);

        this.createPlatform(
            0, Infinity, Infinity, 75, 580, ["box", 150, 40], 0, 0
        );

        this.createPlatform(
            1, Infinity, Infinity, 5, 280, ["box", 10, 560], 0, 0
        );

        this.createPlatform(
            2, Infinity, Infinity, 130, 470, ["box", 240, 80], 0, 0
        );

        this.createPlatform(
            3, Infinity, Infinity, 30, 240, ["box", 40, 380], 0, 0
        );

        this.createPlatform(
            4, Infinity, Infinity, 75, 115, ["box", 50, 20], 0, 0
        );

        this.createPlatform(
            5, Infinity, Infinity, 105, 25, ["box", 190, 50], 0, 0
        );

        this.createPlatform(
            6, Infinity, Infinity, 320, 125, ["box", 240, 250], 0, 0
        );

        this.createPlatform(
            7, Infinity, Infinity, 520, 100, ["box", 160, 200], 0, 0
        );

        this.createPlatform(
            8, Infinity, Infinity, 700, 250, ["box", 200, 500], 0, 0
        );

        this.createPlatform(
            9, Infinity, Infinity, 650, 580, ["box", 300, 40], 0, 0
        );

        this.createPlatform(
            10, Infinity, Infinity, 325, 595, ["box", 350, 10], 0, 0
        );


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
    }

});