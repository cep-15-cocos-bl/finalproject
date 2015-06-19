var startBackground = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.start_png);
    }
});