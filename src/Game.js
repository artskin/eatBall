/**
 * 游戏主逻辑
*/

(function(){
    //设置舞台
    //Laya.Config.isAntialias=true;//抗锯齿
    Laya.init(375,609,Laya.WebGL);
    Laya.stage.bgColor = "#1b2436";
    
    //屏幕缩放模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    

    //游戏信息
    var gameW,gameH,size,posx,posy,ball,hero,ballColor,speed,info,dragRegion;
    var game = {
        init : function(){
            gameW = Laya.stage.width;
            gameH = Laya.stage.height;
            
            this.createBall();
            this.player();
            //Laya.Handler.create(this,this.player())
        },
        player:function(){
            //玩家信息
            hero = new Laya.Sprite();
            hero.graphics.drawCircle(gameW/2,gameH/2,10,"#cc0000");
            Laya.stage.addChild(hero);
            hero.size(10,10);
            console.log(hero.x)
            //hero.mouseEnabled =true;
            hero.on(Laya.Event.MOUSE_DOWN,this,game.onStartDrag());
            
        },
        onStartDrag:function(e){
            console.log("start move");
            hero.startDrag(dragRegion,true,100);
            
        },
        getColor:function(){
            //随机颜色
            ballColor =function (){
                var r=Math.floor(Math.random()*256),
                    g=Math.floor(Math.random()*256),
                    b=Math.floor(Math.random()*256);
                //所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
                return "RGB("+r+','+g+','+b+")";
            }
            //十六进制颜色转化
            function colorRGB2Hex(color) {
                var rgb = color.split(','),
                    r = parseInt(rgb[0].split('(')[1]),
                    g = parseInt(rgb[1]),
                    b = parseInt(rgb[2].split(')')[0]);
            
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                return hex;
            }
            ballColor = colorRGB2Hex(ballColor());
            return ballColor;
        },
        createBall : function(posx,posy,size,color){
            var qua = Math.floor(Math.random()*4 +1);
            size = Math.floor(Math.random()*10 +1) * 4;

            //随机大小
            switch(qua){
                case 1:
                    posx = -(size*3);
                    posy = Math.floor(Math.random() * gameH);
                    posx2 = gameW + size * 4;
                    posy2 = Math.floor(Math.random() * gameH);
                    break;
                case 2:
                    posx = Math.floor(Math.random() * gameW);
                    posy = -(size*2);
                    posx2 = Math.floor(Math.random() * gameW);
                    posy2 = gameH + size*4;
                    break;
                case 3:
                    posx = gameW + size*2;
                    posy = Math.floor(Math.random() * gameH);
                    posx2 = -(gameW + size*4);
                    posy2 = Math.floor(Math.random() * gameH);
                    break;
                case 4:
                    posx = Math.floor(Math.random() * gameW);
                    posy = gameH + size*2;
                    posx2 = Math.floor(Math.random() * gameW);
                    posy2 = -(gameH + size*4);
                    break;
            }
            info = {
                qua:qua,
                size:size,
                color:game.getColor(),
                pos:{
                    x:posx,
                    y:posy,
                    x2:posx2,
                    y2:posy2
                }
            }
            //console.table(info);

            ball = new Laya.Sprite();

            ball.graphics.drawCircle(info.pos.x,info.pos.y,info.size,info.color);
            Laya.stage.addChild(ball);
            
            speed = Math.floor(Math.random()*4+2) * 3000;

            Laya.Tween.to(ball,{x:info.pos.x2,y:info.pos.y2},speed,null,Laya.Handler.create(this,game.removeBall),10);
             
        },
        update : function(){
            
            //Laya.timer.frameLoop(60,this,this.createBall());
            
        },
        removeBall:function(){
            //alert("over");
            
        },
        addBall : function(){
            //createBall()

        }
    }
    game.init();

    Laya.timer.frameLoop(30,this,game.createBall);

})();