
/* 关闭顶部推荐 */
(function () {
    let closeTop = document.querySelector(".close-top");
    let promotionTop = document.querySelector(".promotion-top");
    closeTop.addEventListener("click", function () {
        promotionTop.remove();
    });

    /* 左侧导航 */
    let directoryListItem = document.querySelectorAll('.directory-list_item');
    let directoryItem = document.querySelectorAll('.directory-item');
    let directoryListItem1 = document.querySelector('.directory-list-item');
    let directoryList = document.querySelector('.directory-list');
    for (let i = 0; i < directoryListItem.length; i++) {
        directoryListItem[i].addEventListener('mouseenter', (event) => {
            directoryListItem1.style.display = 'block'
            for (let j = 0; j < directoryListItem.length; j++) {
                directoryItem[j].style.display = 'none';
            }
            directoryItem[i].style.display = 'block';
        });
        directoryList.addEventListener('mouseleave', (event) => {
            directoryListItem1.style.display = 'none';
            for (let j = 0; j < directoryListItem.length; j++) {
                directoryItem[j].style.display = 'none'
            }
        });
    }
})();
/* 显示隐藏地区 */
function overShow() {
    document.querySelector(".city_list").style.display = "block";
};
function outHide() {
    document.querySelector(".city_list").style.display = "none";
}
function jsonp({ url, jsonp, data }) {
    return new Promise((resolve, reject) => {
        // 创建一个全局函数来接收回调数据
        let callbackName = `jQuery_${Date.now()}`;
        window[callbackName] = function (result) {
            delete window[callbackName];  // 删除这个临时函数
            document.body.removeChild(script);  // 删除这个临时script标签
            resolve(result);
        };
        // 将数据参数转换为url参数字符串
        let queryStr = url.indexOf('?') === -1 ? '?' : '&';
        for (let key in data) {
            queryStr += `${key}=${data[key]}&`
        }
        // 创建一个script标签，然后通过该标签的src属性去请求服务端，服务端接收请求后返回一段调用全局函数的js代码
        let script = document.createElement('script');
        script.src = `${url}${queryStr}${jsonp}=${callbackName}`;
        document.body.appendChild(script);
    });
}
document.querySelector('.search-box').addEventListener('input', function (e) {
    jsonp({
        url: "https://www.baidu.com/sugrec",
        jsonp: "cb",
        data: { prod: "pc", wd: e.target.value }
    }).then(response => {
        const suggestions = response.g || [];
        const suggestionList = document.querySelector('.search-list');
        let html = '';
        for (let i = 0; i < suggestions.length; i++) {
            html += `<li>${suggestions[i].q}</li>`;
        }
        suggestionList.innerHTML = html;
    });
});
/* 请求json数据 */
(function () {
    let xhr = new XMLHttpRequest;
    xhr.open("get", "./js/data.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.response)
            //console.log(data);
        };
    };
    xhr.send();
    function render(data) {
        let contentList = document.querySelector(".content-list");
        let swiper1 = data[0].swiper1;
        let str = "";
        swiper1.forEach(item => {
            let { id, title } = item;
            str += `
            <div class="item">
                <a href="" data-id="${id}">${title}</a>
            </div>
            `;
        });
        contentList.innerHTML = str;
        /* 我的京东数据 */
        let Fore1 = document.querySelector(".fore1");
        let swiper2 = data[0].swiper2;
        let str1 = "";
        swiper2.forEach(item => {
            let { id, title } = item;
            str1 += `
            <div class="item1">
                <a href="" data-id="${id}">${title}</a>
            </div>
            `;
        })
        Fore1.innerHTML = str1;
        let Fore2 = document.querySelector(".fore2");
        let swiper3 = data[0].swiper3;
        let str2 = "";
        swiper3.forEach(item => {
            let { id, title } = item;
            str2 += `
            <div class="item1">
                <a href="" data-id="${id}">${title}</a>
            </div>
            `;
        })
        Fore2.innerHTML = str2;

        let Fore3 = document.querySelector(".fore3");
        let swiper4 = data[0].swiper4;
        let str3 = "";
        swiper4.forEach(item => {
            let { id, title } = item;
            str3 += `
            <div class="item1">
                <a href="" data-id="${id}">${title}</a>
            </div>
            `;
        });
        Fore3.innerHTML = str3;
        /* search-title */
        let searchTitle = document.querySelector('.search-title');
        let searchText = data[0].searchText;
        let set = "";
        searchText.forEach(item => {
            let { id, title } = item;
            set += `
                <a href="" data-id="${id}">${title}</a>
            `;
        });
        searchTitle.innerHTML = set;

        let serviceList = document.querySelector('.service-list');
        let serviceConter = data[1].service;
        let serviceTit = ``;
        serviceConter.forEach(item => {
            let { id, pic, pic1, title } = item;
            serviceTit += `
            <li class="service-list_item" data-id="${id}">
                <a href="">
                    <i class="img-conter">
                        <img src="" data-src="${pic}" alt="" class="li-img">
                        <img src="" data-src="${pic1}" alt="" class="li-img_hover">
                    </i>
                    <span>${title}</span>
                </a>
            </li>
            `
        });
        serviceList.innerHTML = serviceTit;

        /* 轮播图渲染 */
        let swiperWrapper = document.querySelector('.rotationWrapper .swiper .swiper-wrapper');
        let rotation = data[1].rotation;
        let rot = "";
        rotation.forEach(item => {
            let { id, pic } = item;
            rot += `
            <div class="swiper-slide">
                <a href="" data-id="${id}">
                    <img src="" data-src="${pic}" alt="">
                </a>
            </div>
            `;
        });
        swiperWrapper.innerHTML = rot;
        var mySwiperOne = new Swiper('.mySwiperOne', {
            effect: "fade",
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,//自动播放
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        /* 纵向轮播图 */
        let swiperWrapper1 = document.querySelector('.decommendWrapper .swiper-container .swiper-wrapper');
        let rotation1 = data[1].rotation1;
        let rot1 = "";
        rotation1.forEach(item => {
            let { id, pic, pic1, pic2 } = item;
            rot1 += `
        <div class="swiper-slide">
            <div class="recommend_item" data-id="${id}">
                <a href="">
                    <img src="" data-src="${pic}" alt="">
                </a>
                <a href="">
                    <img src="" data-src="${pic1}" alt="">
                </a>
                <a href="">
                    <img src="" data-src="${pic2}" alt="">
                 </a>
            </div>
        </div>
        `
        });
        swiperWrapper1.innerHTML = rot1;


        let seckillList = document.querySelector('.seckill-list .mySwiperThree .swiper-wrapper');
        let seckill = data[1].seckill;
        let sec = ``;
        seckill.forEach(item => {
            let { id, pic, pic1, pic2, pic3, title, title1, title2, title3, mon, mon1, mon2, mon3 } = item;
            sec += `
            <div class="swiper-slide" data-index="${id}">
                <div class="seckill-list_item">
                    <a href="">
                        <div class="item-img">
                            <img src="" data-src="${pic}" alt="">
                        </div>
                        <h6>${title}</h6>
                        <div class="seckill-item__price">
                            <i>¥</i>
                            <span>${mon}</span>
                        </div>
                    </a>
                </div>
                <div class="seckill-list_item">
                    <a href="">
                        <div class="item-img">
                            <img src="" data-src="${pic1}" alt="">
                        </div>
                        <h6>${title1}</h6>
                        <div class="seckill-item__price">
                            <i>¥</i>
                            <span>${mon1}</span>
                        </div>
                    </a>
                </div>
                <div class="seckill-list_item">
                    <a href="">
                        <div class="item-img">
                            <img src="" data-src="${pic2}" alt="">
                        </div>
                        <h6>${title2}</h6>
                        <div class="seckill-item__price">
                            <i>¥</i>
                            <span>${mon2}</span>
                        </div>
                    </a>
                </div>
                <div class="seckill-list_item">
                    <a href="">
                        <div class="item-img">
                            <img src="" data-src="${pic3}" alt="">
                        </div>
                        <h6>${title3}</h6>
                        <div class="seckill-item__price">
                            <i>¥</i>
                            <span>${mon3}</span>
                        </div>
                    </a>
                </div>
            </div>
            `;
        });
        seckillList.innerHTML = sec;

        let promotionConter = document.querySelector('.promotion-conter');
        let promotion = data[2].promotion;
        let pro = ``;
        promotion.forEach(item => {
            let { id, pic, pic1, pic2, title, title1 } = item;
            pro += `
            <a href="" data-index="${id}">
                <img src="" data-src="${pic}" alt="">
                <div class="promotion-img">
                    <img src="" data-src="${pic1}" alt="">
                </div>
                <div class="promotion-desc">
                    <img src="" data-src="${pic2}" alt="">
                    <span>${title}</span>
                </div>
                <span class="promotion-text">${title1}</span>
            </a>
            `;
        });
        promotionConter.innerHTML = pro
    };
    render(data)
})();
(function () {
    let linkLogon3 = document.querySelector('.link-logon3');
    let myJdList = document.querySelector('.my-jd-list');
    linkLogon3.addEventListener('mouseenter', () => {
        myJdList.style.display = "block";
    });
    linkLogon3.addEventListener('mouseleave', () => {
        myJdList.style.display = "none";
    });
})();
var mySwiperOne = new Swiper('.mySwiperTwo', {
    effect: "fade",
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,//自动播放
    autoplay: {
        delay: 8000,//1秒切换一次
    },
});
var mySwiperThree = new Swiper('.mySwiperThree', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

/* 图片懒加载 */
function throttle(fn, delay = 200) {
    let timer = null;
    return function () {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    };
}
// 懒加载-回调函数
function lazyLoad() {
    const imgs = document.querySelectorAll('img[data-src]');
    if (!imgs.length) return;
    imgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        console.log(rect);
        if (rect.top < window.innerHeight) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src'); // 我们是通过img[data-src]查找所有img标签的，渲染后就删除data-src可减少forEach循环的计算成本
        }
    })
}
// 全局监听scroll滚动事件
window.addEventListener('scroll', throttle(() => {
    lazyLoad();
}, 100));
// 初始化的时候执行一下加载图片的函数
lazyLoad();

/* 倒计时 */
window.onload = function () {
    var hour = document.querySelector('.countdown-time_hour');
    var minute = document.querySelector('.countdown-time_minute');
    var second = document.querySelector('.countdown-time_second');
    var inputTimes = +new Date('2023-06-18 21:00:00');
    conutTime();
    setInterval(conutTime, 1000);
    function conutTime() {
        var nowTimes = +new Date();
        var times = inputTimes > nowTimes ? (inputTimes - nowTimes) / 1000 : 0;
        var h = parseInt(times / 60 / 60);
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s
    }
}
/* 右侧滚动导航栏 */

// let hideTop = document.querySelector(".hide-top");
// console.log(hideTop);
// window.addEventListener("scroll", function(e) {
//     if (document.documentElement.scrollTop >= document.querySelector(".second-kill").offsetTop) {
//         document.querySelector(".hide-top").style.display = "block";
//         document.querySelector("aside").classList.add("current");
//         document.querySelector("aside .backTop").style.display = "block";
//     } else {
//         document.querySelector(".hide-top").style.display = "none";
//         document.querySelector("aside").classList.remove("current");
//         document.querySelector("aside .backTop").style.display = "none";
//     }
// });

let elevator = document.querySelector('.elevator');
let box = document.querySelector('.box');
window.addEventListener('scroll', (event) => {
    let top = document.documentElement.scrollTop;
    let boxTop = box.offsetTop;
    if (top >= boxTop) {
        elevator.classList.add('current')
    } else {
        elevator.classList.remove('current')
    }
});

/* 为你推荐 */
function tab() {
    let recommendTabItem = document.querySelectorAll('.recommend-tab-item');
    let recommendTabInner = document.querySelectorAll('.recommend-tab-inner');
    if (recommendTabInner.length > 0) {
        recommendTabInner[0].style.display = 'block';
    }
    for (let i = 0; i < recommendTabItem.length; i++) {
        let tabItem = recommendTabItem[i];
        let TabInner = recommendTabInner[i];
        tabItem.addEventListener('click', () => {
            for (let j = 0; j < recommendTabItem.length; j++) {
                recommendTabItem[j].classList.remove("tab-item_selected");
                recommendTabInner[j].style.display = 'none'
            }
            tabItem.classList.add("tab-item_selected");
            TabInner.style.display = 'block'
        });
    }
}
tab();