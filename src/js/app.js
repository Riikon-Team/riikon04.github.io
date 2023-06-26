const bgMusic = new Audio("https://cdn.glitch.global/dc6948cb-dff5-4efc-86db-fe258b6f1750/Herta%20Space%20Station%20OST%20Extended%20%20Honkai%20Star%20Rail.mp3")
bgMusic.volume=0.1

const animated=["animate__bounceInDown", "animate__backInDown", "animate__backInLeft", "animate__backInUp","animate__backInUp" ,"animate__lightSpeedInLeft","animate__rotateInUpRight","animate__rollIn","animate__zoomIn","animate__zoomInDown"]

$(document).ready(async()=>{
    for (let i=0;i<$(".circle-avatar").length;i++) {
        $(".circle-avatar").addClass("wow");
        $(".circle-avatar").eq(i).addClass(animated[Math.floor(Math.random()*animated.length)]);
    }

    setTimeout(()=>{
        bgMusic.play()
    },1000)


    var wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animate__animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
    })
    wow.init();
    $(window).scroll(function () { 
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > $("#sence1").height()-10 && currentScrollPos < ($("#sence1").height() + $("#sence2").height()-20)) {
            $("header").fadeOut();
            $("#menuWheel").show();         
            $("#menuWheel").css({
                animation:"backInLeft .5s ",
                opacity:1,
            })   
            $("#menuWheel li").css({
                fontWeight:"500",
            })
            $("#menuWheel li:nth-child(1)").css({
                fontWeight:"700",
            })
            
        }else if (currentScrollPos > ($("#sence1").height() + $("#sence2").height())-20 && currentScrollPos< ($("#sence1").height() + $("#sence2").height()*2 - 20)) {
            $("#menuWheel").show();         

            $("#menuWheel li").css({
                fontWeight:"500",
            })
            $("#menuWheel li:nth-child(2)").css({
                fontWeight:"700",
            })
        }else if (currentScrollPos > ($("#sence1").height() + $("#sence2").height()*2)-20 && currentScrollPos< ($("#sence1").height() + $("#sence2").height()*3 - 20)) {
            $("#menuWheel").show();         

            $("#menuWheel li").css({
                fontWeight:"500",
            })
            $("#menuWheel li:nth-child(3)").css({
                fontWeight:"700",
            })
        } else if (currentScrollPos > ($("#sence1").height() + $("#sence2").height()*3)-20 && currentScrollPos< ($("#sence1").height() + $("#sence2").height()*4 - 20)) {
            $("#menuWheel").show();         

            $("#menuWheel li").css({
                fontWeight:"500",
            })
            $("#menuWheel li:nth-child(4)").css({
                fontWeight:"700",
            })
        } else if (currentScrollPos > ($("#sence1").height() + $("#sence2").height()*4)-20 && currentScrollPos< ($("#sence1").height() + $("#sence2").height()*5 - 20)) {
            $("#menuWheel").show();         

            $("#menuWheel li").css({
                fontWeight:"500",
            })
            $("#menuWheel li:nth-child(5)").css({
                fontWeight:"700",
            })
        } else{
            $("header").fadeIn();
            $("#menuWheel").hide();
        }
    lastScrollPos = currentScrollPos;
    });
})