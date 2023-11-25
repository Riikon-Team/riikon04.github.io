const CAPTION = [
    "Lũ chuyên ăn cứt đá bô",
    "while (life) {eat(); play(); poop(); study(); sleep(); coding();}",
    "Chap lurk, Chap lurk...",
    "Tới giờ làm Sensei rồi, các học sinh yêu quý - Moggu",
    "Tại sao tao phải cứu mày, trong khi cái việc cho mày chết, sẽ làm cho cho game này hoàng thành - Regiko",
    "Đéo phải wibu, đéo có tư cách nói chiện với bọn tao",
    "T1 vô địch!!! T1 vô địch!!! T1 vô địch!!!",
    "Đít cọt, đít cọt, đít cọt, nghe hong,  đít cọt ó nghe hong...",
    "Tao đi học ngày chủ nhật",
    "Những sự thật là lùng mà bạn chắc đã biết: Thằng nào cầm Skye, auto binded đồng đội",
    "Allahu Akbar...maslahkum allahu akbaaaar...",
    "Anbatokum aaaaaaaaaaaaaa",
    "Nó gọi là choẳng mấy khi...",
    "A hopeless romantic all my life, surrounded by couples all the time",
    "Lovely rori-rori kami, kourin (Zukyuun!)"
]

document.INTERVAL = {}

const bgMusic = new Audio("https://cdn.glitch.global/dc6948cb-dff5-4efc-86db-fe258b6f1750/Herta%20Space%20Station%20OST%20Extended%20%20Honkai%20Star%20Rail.mp3")
bgMusic.volume=0.5
const bgVideo = document.querySelector("#bg-video")

document.FLAG = {
    'focus':false
}

const animated=["animate__bounceInDown", "animate__backInDown", "animate__backInLeft", "animate__backInUp","animate__backInUp" ,"animate__lightSpeedInLeft","animate__rotateInUpRight","animate__rollIn","animate__zoomIn","animate__zoomInDown"]

$(document).ready(async()=>{
    setTimeout(()=>{
        runCaption()
    },500)
    initEventImg1()
    location.hash = ""
    window.scrollTo(0,0)

    const data = await fetch("./src/asset/json/data.json")
    .then(res => res.json()).then(data => data)
    .catch(err =>{
        alert("Lỗi lon gì rồi! Báo ad dùm tao!")
    })

    const data2 = await fetch("./src/asset/json/data2.json")
    .then(res => res.json()).then(data => data)
    .catch(err =>{
        alert("Lỗi lon gì rồi! Báo ad dùm tao!")
    })

    initSence3(data)
    
    initSence5(data2)

    for (let i=0;i<$(".circle-avatar").length;i++) {
        $(".circle-avatar").addClass("wow");
        $(".circle-avatar").eq(i).addClass(animated[Math.floor(Math.random()*animated.length)]);
    }

    document.onclick = ()=>{
        if (!document.FLAG.focus) {
            document.FLAG.focus=true
            bgVideo.play()
            bgMusic.play()
        }
    }




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

function initEventImg1() {
    
    $("#sence2 .boxPic img").each((i,e)=>{
        $(e).on("click", function (){
            $("#view>div>img").attr("src",$(e).attr("src"))
            $("#view").addClass("true");
        })
    })

    $("#view").on("click",()=>{
        $("#view").removeClass("true");
    })
}

function runCaption() {
    let time = 0
    let title = ""
    const caption = CAPTION[Math.floor(Math.random() * CAPTION.length)]
    const captionSliced = chunkString(caption,parseInt(caption.length / 20))
    document.INTERVAL.caption  = setInterval(()=>{
        if (captionSliced.length!=0) {
            title = title + captionSliced[0]
            captionSliced.shift()
            $("#sence1 .caption").text(title + "_")
            return 
        }
        time+=80
        if (time >= 5000) {
            if (title=="") {
                clearInterval(document.INTERVAL.caption)
                runCaption()
            }
            title = title.substring(0,title.length - 2 <0?0:title.length - 5)
            $("#sence1 .caption").text(title + "_")
        }
        if (time % 320 == 0) {
            $("#sence1 .caption").text(title + " ")
            return
        }

        if (time % 160 == 0) {
            $("#sence1 .caption").text(title + "_")
        }
        
    },80)
}

function chunkString(str, chunkSize) {
    const result = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      result.push(str.slice(i, i + chunkSize));
    }
    return result;
}

function initSence3(data) {
    let text = ""
    data.forEach((e, i) => {
        text+=`<div class="circle-avatar show-more" title="${e.name}">
                    <img src="./src/asset/img/user/${e.avatar}" alt="${e.discord}">
                </div>`
    });
    text+=`<div class="circle-avatar" title="Và các thành viên khác">
            <img src="./src/asset/img/user/discord_avt_1.png" alt="">
        </div>`
    $("#sence3 .boxAvt").html(text)

    $(".circle-avatar.show-more").each(function (index, element) {
        $(element).on("click",function(){
            sence3ShowMore(data,index)
        })      
    });

    $("#pop-info>span").on("click", function () {
        $("#pop-info").removeClass("show")
    })

}

function sence3ShowMore(data,i) {
    $("#pop-info").addClass("show")
    $("#pop-info .avt img").attr("src",`./src/asset/img/user/${data[i].avatar}`)
    $("#pop-info .info .name").text(data[i].name)
    $("#pop-info .info .discord").text("@"+ data[i].discord)
    $("#pop-info .info .bio").text(data[i].bio)
    $("#pop-info .info .join span").text(new Date(data[i].join * 1000).toLocaleDateString("vi-VN"))
    let k = ""
    data[i].social.forEach((e,j)=>{
        k+=`
        <a href="${e.link}" target="_blank" rel="noopener noreferrer">
        <div class="item">
            <div class="logo">
                <img src="./src/asset/img/logo/${e.name}.png" alt="" srcset="">
            </div>
            <div class="name">${e.uname}</div>
        </div>
        </a>
        `
    })
    $("#pop-info .info .social-box").html(k)
    
}

function initSence5(data2) {
    let t = ""
    data2.forEach((e,i)=>{
        t+=`<div class="item">
        <div class="avt">
            <img src="${e.avt}" alt="" srcset="">
        </div>
        <div class="info">
            <p class="title">
                <a href="${e.link}" target="_blank" rel="noopener noreferrer">
                ${e.title}
                </a>
            </p>
            <p class="author" style="font-style: italic;">
            ${e.author}
            </p>
            <p class="decsription">
            ${e.des}
            </p>
        </div>
    </div>`
    })
    $("#sence5 .project-box").html(t)
}

window.onscroll = ()=>{
    if ($("#sence1").height() < window.scrollY) {
        $("#sence1 #bg-video").hide()
    }else{
        $("#sence1 #bg-video").show()
    }
}