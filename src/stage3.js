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
