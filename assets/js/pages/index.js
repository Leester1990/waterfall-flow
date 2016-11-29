$(function () {
	var flow = new Flow('.main', { //列表父级类名
        listEle : '.media-list', //列表类名
        responsive : true //为ture为自适应，为false为无自适应。默认不给
    });

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            //加载更多
            addItem(20);
        }
    });
});

function addItem(num) {
	var _html = "";
	for(var i = 0; i < num; i++) {
		_html += '<div class="media-list">'
                +'<div class="media-list-inner">'
                   +'<img src="../images/img/0'+Math.floor(Math.random()*10)+'.jpg" alt="">'
                +'</div>'
            +'</div>';
	}
	$(".main").append(_html);
	var flow = new Flow('.main', {
        listEle : '.media-list',
        responsive : true
    });
}