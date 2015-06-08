var buttonLayer = cc.Layer.extend({
    btnLeft: null,
    btnRight: null,
    ctor: function() {
        this._super();

        var winsize = cc.director.getWinSize();
        btnLeft = new leftButton();
        btnRight = new rightButton();

        btnLeft.setPosition(30, 30);
        btnRight.setPosition(90, 30);

        this.addChild(btnLeft);
        this.addChild(btnRight);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var location = target.convertToNodeSpace(touch.getLocation());
                var targetSize = target.getContentSize();
                var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
                console.log("ayy");
                if (cc.rectContainsPoint(targetRectangle, location)) {
                    target.buttonPressed();
                }
            }
        });

        cc.eventManager.addListener(listener, this);
    }
})

var leftButton = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.leftbutton_png);
    },

    buttonPressed: function() {
        console.log("left button pressed");
    }
});

var rightButton = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.rightbutton_png);
    },

    buttonPressed: function() {
        console.log("right button pressed");
    }
});