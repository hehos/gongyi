/**
 * Created by hui on 2015/9/28.
 */
    window.Slider = function(domId) {
        this.domId = domId;
    }

    Slider.prototype.run = function() {
        var other = this;

        var sWidth = $("#" + other.domId).width(); //获取焦点图的宽度（显示面积）
        var len = $("#" + other.domId + " .slider-item").length; //获取焦点图个数
        var index = 0;
        var picTimer;

        console.log(sWidth);
        $("#" + other.domId + " .slider-item").width(sWidth);
        //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
        var btn = "<div class='point-ctrs'>";
        for(var i=0; i < len; i++) {
            btn += "<i></i>";
        }
        btn += '</div><span class="prev-btn"><i class="icon-angle-left"></i></span><span class="next-btn"><i class="icon-angle-right"></i></span></div>';
        $("#" + other.domId).append(btn);

        //为小按钮添加鼠标滑入事件，以显示相应的内容
        $("#" + other.domId + " .point-ctrs i").mouseover(function() {
            index = $("#" + other.domId + " .point-ctrs i").index(this);
            //$("#" + other.domId + " .point-ctrs i").removeClass("on");
            //$(this).addClass("on");
            showPics(index);
        }).eq(0).trigger("mouseover");

        //上一页、下一页按钮透明度处理
        $("#" + other.domId + " .preNext").css("opacity",0.2).hover(function() {
            $(this).stop(true,false).animate({"opacity":"0.5"},300);
        },function() {
            $(this).stop(true,false).animate({"opacity":"0.2"},300);
        });

        //上一页按钮
        $("#" + other.domId + " .prev-btn").click(function() {
            index -= 1;
            if(index == -1) {index = len - 1;}
            showPics(index);
        });

        //下一页按钮
        $("#" + other.domId + " .next-btn").click(function() {
            index += 1;
            if(index == len) {index = 0;}
            showPics(index);
        });

        //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围 .slider-main元素的宽度
        $("#" + other.domId + "  .slider-items").css("width",sWidth * (len));

        //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
        $("#" + other.domId).hover(function() {
            clearInterval(picTimer);
        },function() {
            picTimer = setInterval(function() {
                showPics(index);
                index++;
                if(index == len) {index = 0;}
            },4000); //此4000代表自动播放的间隔，单位：毫秒
        }).trigger("mouseleave");

        //显示图片函数，根据接收的index值显示相应的内容
        function showPics(index) { //普通切换
            var nowLeft = -index*sWidth; //根据index值计算 .slider-items元素的left值
            $("#" + other.domId + "  .slider-items").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整 .slider-items元素滚动到计算出的position
            //$("#" + other.domId + " .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
            $("#" + other.domId + " .point-ctrs i").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
        }
    }
