$(function(){
//	菜单
	$("#nav-wrap .nav-a").click(function(){
		$("#nav-wrap .nav-a").removeClass("active");
		$(this).addClass("active");
	});
//		

//	子菜单显示 
	$("#nav-wrap .nav-li").hover(function(){
		$(this).children(".nav-a").css("color","#000000");
		$(this).children(".nav-child-wrap").fadeIn(800);
//		设置子菜单透明背景高度
			$.each($("#nav-wrap .ul-bg"),function() {
				$(this).height($(this).siblings(".nav-child").outerHeight());
			});
	},function(){
		$(this).children(".nav-a").css("color","#505050");
		$(this).children(".nav-child-wrap").hide(100);
	});
	
//图片统一高度：
		var images_height = "514px";
		var images_url = [
			'images/banner1.jpg',
			'images/banner2.jpg',
			'images/banner3.jpg'
		];
		var images_count = images_url.length;
		//图片列表节点
		for(var j=0;j<images_count+1;j++){
			$('.banner ul').append('<li></li>')
		}
		//轮播圆点按钮节点
		for(var j=0;j<images_count;j++){
			if(j==0){
				$('.banner ol').append('<li class="current"></li>')
			}else{
				$('.banner ol').append('<li></li>')
			}
		}

		//载入图片
		$('.banner ul li').css('background-image','url('+images_url[0]+')');
		$.each(images_url,function(key,value){
			$('.banner ul li').eq(key).css('background-image','url('+value+')');
		});

		$('.banner').css('height',images_height);

		$('.banner ul').css('width',(images_count+1)*100+'%');

		$('.banner ol').css('width',images_count*20+'px');
		$('.banner ol').css('margin-left',-images_count*20*0.5-10+'px');

		var num = 0;
		var window_width = $(window).width();
		$(window).resize(function(){
			window_width = $(window).width();
			$('.banner ul li').css({width:window_width});
			clearInterval(timer);
			nextPlay();
			timer = setInterval(nextPlay,2000);
		});
		$('.banner ul li').width(window_width);
		//轮播圆点
		$('.banner ol li').mouseover(function(){
			$(this).addClass('current').siblings().removeClass('current');
			
			var i = $(this).index();
			$('.banner ul').stop().animate({left:-i*window_width},500);
			num = i;
		});
		//自动播放
		var timer = null;
		function prevPlay(){
			num--;
			if(num<0){
				$('.banner ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},500);
				num=images_count-1;
			}else{
				$('.banner ul').stop().animate({left:-num*window_width},500);
			}
			if(num==images_count-1){
				$('.banner ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
			}else{
				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

			}
		}
		function nextPlay(){
			num++;
			if(num>images_count){
				$('.banner ul').css({left:0}).stop().animate({left:-window_width},500);
				num=1;
			}else{
				
				$('.banner ul').stop().animate({left:-num*window_width},500);
			}
			if(num==images_count){
				$('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
			}else{
				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

			}
		}
		timer = setInterval(nextPlay,2000);
		//鼠标经过banner，停止定时器,离开则继续播放
		$('.banner').mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(nextPlay,2000);
		});

	
	var ulbo = $("#ulbo")
	var Li = ulbo.find("li");
	Li.hover(function(){
		$(this).find(".opaci").css("display","block");
		$(this).find("p").css("display","block");
	},function(){
		$(this).find(".opaci").css("display","none");
		$(this).find("p").css("display","none");
	});

//	 点击左右轮播	
	function DY_scroll(wraper,prev,next,img,speed,or)
     {
      var wraper = $(wraper);
      var prev = $(prev);
      var next = $(next);
      var img = $(img).find('ul');
      var w = img.find('li').outerWidth(true);
      var s = speed;
      next.click(function()
           {
            img.animate({'margin-left':-w},function()
                      {
                       img.find('li').eq(0).appendTo(img);
                       img.css({'margin-left':0});
                       });
            });
      prev.click(function()
           {
            img.find('li:last').prependTo(img);
            img.css({'margin-left':-w});
            img.animate({'margin-left':0});
            });
      if (or == true)
      {
       ad = setInterval(function() { next.click();},s*1000);
       wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { next.click();},s*1000);});

      }
     }
     DY_scroll('.img-scroll','.prev','.next','.img-list',3,true);
	
//	点击显示大图
	$("#product-details .pro-img-scroll a").on("click mouseover",function(){
		var imgSrc = $(this).find("img").attr("src");
		$(this).parents(".pro-scroll-wrap").siblings(".pro-img-big").attr("src",imgSrc);
	});
	
//	 点击上下轮播	
	function TB_scroll(wraper,top,bottom,img,speed,or)
     {
      var wraper = $(wraper);
      var top = $(top);
      var bottom = $(bottom);
      var img = $(img).find('ul');
      var w = img.find('li').outerHeight(true);
      var s = speed;
      bottom.click(function()
           {
            img.animate({'margin-top':-w},function()
                      {
                       img.find('li').eq(0).appendTo(img);
                       img.css({'margin-top':0});
                       });
            });
      top.click(function()
           {
            img.find('li:last').prependTo(img);
            img.css({'margin-top':-w});
            img.animate({'margin-top':0});
            });
      if (or == true)
      {
       ad = setInterval(function() { bottom.click();},s*1000);
       wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { bottom.click();},s*1000);});

      }
     }
     TB_scroll('.pro-scroll-wrap','.img-top','.img-bottom','.pro-scroll',3,true);

});
