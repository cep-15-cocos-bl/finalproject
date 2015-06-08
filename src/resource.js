var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    player_png : "res/player.png",
    ground_png : "res/ground.png",
    platform_png: "res/platform.png",
    walkL_png:"res/a.png",
    walkL_plist:"res/a.plist",
    walkR_png:"res/walkR.png",
    walkR_plist:"res/walkR.plist",
    UwalkL_png:"res/UwalkL.png",
    UwalkL_plist:"res/UwalkL.plist",
    UwalkR_png:"res/UwalkR.png",
    UwalkR_plist:"res/UwalkR.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
