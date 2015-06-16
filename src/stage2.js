var world;

var stage2 = cc.Scene.extend({

    platforms: [],

    onEnter: function() {
        this._super();
        winSize = cc.director.getWinSize();
        var background = new Backgroundlayer2();
        this.addChild(background);
        background.setPosition(400 ,winSize.height/2);
        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);

        this.createPlatform(
            0, Infinity, Infinity, 80, 0, ["box", 140, 50], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 0, 0, ["box", 20, 1200], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 230, 0, ["box", 160, 100], 0, 0
        );

        this.createPlatform(
            0, Infinity, Infinity, 335, 300, ["box", 650, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 390, 0, ["box", 160, 150], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 550, 0, ["box", 160, 200], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 710, 0, ["box", 160, 250], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 800, 0, ["box", 18, 1200], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 230, 280, ["box", 100, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 540, 280, ["box", 100, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 700, 400, ["box", 180, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 500, 405, ["box", 20, 190], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 400, 590, ["box", 780, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 600, 490, ["box", 180, 20], 0, 0
        );
        this.createPlatform(
            0, Infinity, Infinity, 50, 550, ["box", 20, 20], 0, 0
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

var Backgroundlayer2  = cc.Sprite.extend({
  ctor:function() {
    this._super();
    this.initWithFile(res.background2_png);
  }
})
