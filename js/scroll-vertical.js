/**
 * Created by hui on 2015/9/27.
 */

(function(jq,window) {
    var freeDesign = {
        init:function() {
            scrollTopFn();
        }
    };

    function scrollTopFn(num,selc) {
        var SD = 30,          // 默认的滚动速度
            defaultRow = 8,  // 默认的显示函数
            myScroll,
            scrolltable = document.getElementById('scrolltable'),
            scrolltable1 = document.getElementById('scrolltable1'),
            scrolltable2 = document.getElementById('scrolltable2');

        // 让表格的thead和tbody水平自动对齐。
        var ths = $("#scrolltable1 thead th");
        var firstTds = $("#scrolltable1 tbody tr").first().find("td");
        for(var i = 0; i < ths.length; i++) {
            var wt = $(ths[i]).width();
            $(ths[i]).width(wt);
            $(firstTds[i]).width(wt);
        }

        $("#scrolltableHead").append($("#scrolltable thead"));
        $("#scrolltable1 thead").empty();

        // 设置默认高度及样式
        var defaultH = $("#scrolltable1 tbody tr").first().height() * defaultRow;
        $(scrolltable).css({
            "position": "relative",
            "height": defaultH,
            "overflow": "hidden"
        });

        //debugger;
        var h1 = $(scrolltable1).height();
        var h2 = $(scrolltable).height();
        if($(scrolltable1).height() > $(scrolltable).height()) {

            scrolltable2.innerHTML=scrolltable1.innerHTML;

            function Marquee2(){
                if(scrolltable2.offsetTop <= scrolltable.scrollTop)
                    scrolltable.scrollTop = 0;
                else {
                    scrolltable.scrollTop++;
                }
            }
            myScroll = window.setInterval(Marquee2,SD);
            scrolltable.onmouseover = function() {
                clearInterval(myScroll);
            };
            scrolltable.onmouseout = function() {
                myScroll = setInterval(Marquee2,SD);
            };
        } else {
            $(scrolltable).height($(scrolltable1).height());
        }
    }
    window.freeDesign = freeDesign;
})(jQuery,window);

freeDesign.init();