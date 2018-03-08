/**
 * 游戏主逻辑
*/

(function(){
    //设置舞台
    //Laya.Config.isAntialias=true;//抗锯齿
    Laya.init(375,667,Laya.WebGL);
    Laya.stage.bgColor = "#1b2436";
    
    //屏幕缩放模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //游戏信息
    var gameW,gameH,size,posx,posy,ball,ballColor,speed;
    var game = {
        init : function(){
            gameW = Laya.stage.width;
            gameH = Laya.stage.height;
            
            this.createBall();
            this.update();
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
                var rgb = color.split(',');
                var r = parseInt(rgb[0].split('(')[1]),
                    g = parseInt(rgb[1]),
                    b = parseInt(rgb[2].split(')')[0]);
            
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                return hex;
            }
            ballColor = colorRGB2Hex(ballColor());
            return ballColor;
        },
        createBall : function(posx,posy,size,color){
            var qua = Math.floor(Math.random()*3 +1);
            size = Math.floor(Math.random()*10 +1) * 4;
            //随机大小

            switch(qua){
                case 1:
                    posx = Math.floor(Math.random() * gameW);
                    posy = -(size*2);
                    posx2 = Math.floor(Math.random() * gameW);
                    posy2 = gameH + size*3;
                    break;
                case 2:
                    posx = gameW + size*2;
                    posy = Math.floor(Math.random() * gameH);
                    posx2 = -(size*2);
                    posy2 = Math.floor(Math.random() * gameH);
                    break;
                case 3:
                    posx = Math.floor(Math.random() * gameW);
                    posy = gameH + size*2;
                    posx2 = Math.floor(Math.random() * gameW);
                    posy2 = -(size*3);
                    break;
                case 4:
                    posx = -(size*3);
                    posy = Math.floor(Math.random() * gameH);
                    posx2 = gameW + size*3;
                    posy2 = Math.floor(Math.random() * gameH);
                    break;
            }
            var info = {
                size:size,
                qua:qua,
                color:game.getColor(),
                pos:{
                    x:posx,
                    y:posy,
                    x2:posx2,
                    y2:posy2
                }
            }
            console.table(info);

            ball = new Laya.Sprite();

            ball.graphics.drawCircle(info.pos.x,info.pos.y,info.size,info.color);
            Laya.stage.addChild(ball);
            
            speed = Math.floor(Math.random()*4+2) * 1000;

            if(qua ==2 || qua == 3){
                Laya.Tween.from(ball,{y:info.pos.y2,x:info.pos.x2},speed,null,null,10);
            }else{
                Laya.Tween.to(ball,{y:info.pos.y2,x:info.pos.x2},speed,null,Laya.Handler.create(this,game.remove),10);
            }

            
        },
        update : function(){
            
            //Laya.timer.frameLoop(60,this,this.createBall());
            
        },
        remove:function(){
            //alert("over")
        },
        addBall : function(){
            //createBall()

        }
    }
    game.init();

    Laya.timer.frameLoop(50,this,game.createBall);
    //console.log(game.getColor());
    
     //Laya.timer.frameLoop(100,this,runBall)
    //function runBall(){
        //pos += 5;
        //console.log("circle.x");
        //circle.pivot(pos,pos); 
    //}

})();