
function lazyloadImg(){

   const options = {
      // родитель целевого элемента - область просмотра
      root: null,
      // без отступов
      rootMargin: '0px 0px 0px 0px',
      // процент пересечения - половина изображения
      threshold: 0
   }

   // создаем наблюдатель
   const observer = new IntersectionObserver((entries, observer) => {
      // для каждой записи-целевого элемента
      entries.forEach(entry => {
         // если элемент является наблюдаемым
         if (entry.isIntersecting) {
            const lazyImg = entry.target

            let dataSrc = lazyImg.getAttribute(['data-src'])
            if(lazyImg.tagName == "IMG"){
               lazyImg.setAttribute('src', dataSrc)
            }else{
               lazyImg.style.backgroundImage = 'url("'+ dataSrc +'")'
            }

            lazyImg.style.opacity = 1

            // прекращаем наблюдение
            observer.unobserve(lazyImg)
         }
      })
   }, options)

   const arr = document.querySelectorAll('.lazyImg[data-src]') // будет работать с данными элементами
   arr.forEach(i => {
      observer.observe(i)
   })

}
lazyloadImg();



// параллакс элементов при движении мыши
// $("body").mousemove(function(e) {
//    var win_w = $(window).width();
//    if(win_w > 992 && $("img").is(".decoreImg")){
//       // parallaxIt(e, "._anim_1", 20); // перечисляем элементы для анимирования
//       // parallaxIt(e, "._anim_2", -40);
//       parallaxIt(e, "._anim_3", -15);
//    }
// });
//
// function parallaxIt(e, target, movement) {
//    var $this = $("body");
//    var relX = e.pageX - $this.offset().left;
//    var relY = e.pageY - $this.offset().top;
//
//    TweenMax.to(target, 1, {
//       x: (relX - $this.width() / 2) / $this.width() * movement,
//       y: (relY - $this.height() / 2) / $this.height() * movement
//    });
// }



$(function(){
   if(document.querySelectorAll('._anim_1, ._anim_2, ._anim_3').length > 0) {
      //параллакс элементов при скролле
      const element_1 = document.querySelectorAll('._anim_1');
      const element_2 = document.querySelectorAll('._anim_2');
      const element_3 = document.querySelectorAll('._anim_3');
      const startPosition = {x: 0, y: 0};

      element_1.forEach(element => {
         TweenMax.set(element, startPosition);
      });
      element_2.forEach(element => {
         TweenMax.set(element, startPosition);
      });
      element_3.forEach(element => {
         TweenMax.set(element, startPosition);
      });


      window.addEventListener('scroll', () => {
         const scrollPosition = window.scrollY;
         const tweenPosition_1 = {
            x: 0,
            y: scrollPosition * 0.05
         };
         const tweenPosition_2 = {
            x: 0,
            y: scrollPosition * -0.05
         };
         const tweenPosition_3 = {
            x: 0,
            y: scrollPosition * -0.02
         };

         element_1.forEach(element => {
            TweenMax.to(element, 1, tweenPosition_1);
         });

         element_2.forEach(element => {
            TweenMax.to(element, 1, tweenPosition_2);
         });

         element_3.forEach(element => {
            TweenMax.to(element, 1, tweenPosition_3);
         });
      });
   }//if
})




if($("div").is(".recipesSlider")){

   //===================

   var recipesSlider = new Swiper('.recipesSlider', {
      slidesPerView: 3,
      spaceBetween: 50,
      loop: false,
      speed: 1000,
      // lazy: true,
      watchOverflow: true, //если всего дна страница то навигации задается класс через который можно ее скрыть
      watchSlidesVisibility: true, //добавляет swiper-slide-visible класс ко всем активным-видимым элементам
      navigation: {
         nextEl: '.recipesSlider .button-next',
         prevEl: '.recipesSlider .button-prev',
      },
      // virtual: true,
      // autoplay: {
      //    delay: 2500,
      //    disableOnInteraction: false, //после свайпа событие atoplay не прервется
      // },
      // lazy: {
      //    loadPrevNext: true, //подгружает и смежные картинки с активным слайдом
      //    loadOnTransitionStart: true,
      //    elementClass: 'swiper-load-image',
      //    // loadPrevNextAmount: 2, //сколько помимо активного слайда подгрузить изображений справа и слева
      // },
      breakpoints: {
         // when window width is <= 320px
         0: {
            slidesPerView: 1,
            spaceBetween: 30
         },
         481: {
            slidesPerView: 2,
            spaceBetween: 20
         },
         651: {
            slidesPerView: 2,
            spaceBetween: 30
         },
         // when window width is <= 480px
         769: {
            slidesPerView: 3,
            spaceBetween: 30
         },
         993: {
            slidesPerView: 3,
            spaceBetween: 50
         }
         // when window width is <= 640px
      }
   });

   recipesSlider.on('lazyImageReady', function(slideEl, imageEl) {
      // Добавьте ваш код здесь
      console.log(slideEl)
      console.log(imageEl)
   });

}





// открываем бургер
function openBurger() {
   // var el = $(ths);
   // если элемента нет, тогда создаем его
   if(!$("span").is(".burgerBg")){
      $('.wrapper').prepend("<span class='burgerBg' onclick='closeBurger()'></span>").delay(100).queue(function () {
         $(".burgerBg").addClass('_active');
         // el.dequeue();
      });
   }else{
      $(".burgerBg").addClass('_active');
   }

   $('body').addClass('_noScrollBurger');
   $('.burgerMenu').addClass('_addTransition');
   $('.burgerMenu').addClass('_show');
}

function closeBurger(){
   $("body").removeClass('_noScrollBurger');
   $(".burgerBg").removeClass('_active');
   $(".burgerMenu").removeClass('_show');
   $('._burgerClick').removeClass('_open')
}


$('._burgerClick').on('click', function(){
   let el = $('._burgerClick')
   if(!el.hasClass('_open')){
      el.addClass('_open')
      openBurger()
   }else{
      el.removeClass('_open')
      closeBurger()
   }
})

$('._closeBurger').on('click', function(){
   // $('._burgerClick').removeClass('_open')
   closeBurger()
})


// копировать в буфер
function copyPromocode(){
   var copyText = document.getElementById("promocode");
   copyText.select();
   document.execCommand("copy");
}





//механизм предупреждения о cookies
let cookieName = "showBannerCookies";
let createCookie = function (name, value, days) {
   var expires;
   if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
   } else {
      expires = "";
   }
   document.cookie = name + "=" + value + expires + "; path=/";
};
function getCookie(c_name) {
   // debugger;
   if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
         c_start = c_start + c_name.length + 1;
         c_end = document.cookie.indexOf(";", c_start);
         if (c_end == -1) {
            c_end = document.cookie.length;
         }
         return unescape(document.cookie.substring(c_start, c_end));
      }
   }
   return "";
}

let cookie = getCookie(cookieName);
if(cookie == 1){
   var banner = document.getElementById("cookieBanner");
   banner.style.display = 'none';
}
document.getElementById("acceptCookies").addEventListener('click', function(){
   createCookie(cookieName, 1, 30);
   document.getElementById("cookieBanner").style.display = 'none';
})


// вспомогательная функция для очистки cookies
function CookiesDelete() {
   var cookies = document.cookie.split(";");
   for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   }
}

// CookiesDelete();



function lazyAnimaton() {

   const options = {
      // родитель целевого элемента - область просмотра
      root: null,
      // без отступов
      rootMargin: '0px 0px 0px 0px',
      // процент пересечения - половина изображения
      threshold: 0
   }

   // создаем наблюдатель
   const observer = new IntersectionObserver((entries, observer) => {
      // для каждой записи-целевого элемента
      entries.forEach(entry => {
         const lazyElem = entry.target
         // если элемент является наблюдаемым

         console.log()
         if (entry.isIntersecting) {

            let delay = lazyElem.getAttribute(['data-delay'])
            delay = Number((delay == null) ? delay = 200 : delay)
            // console.log(delay)

            setTimeout(function(){
               lazyElem.classList.add('_animGo')
            },delay)
            // прекращаем наблюдение
            observer.unobserve(lazyElem)
         }
         //если элемент находиться за пределами viewport и имеет класс _notDelay
         if(!entry.isIntersecting && entry.target.classList.contains('_notDelay')){
            lazyElem.setAttribute(['data-delay'], 200)
         }
      })
   }, options)

   const arr = document.querySelectorAll('._lazyAnimation') // будет работать с данными элементами
   arr.forEach(i => {
      observer.observe(i)
   })
}

if($("*").is("._lazyAnimation")) {
   lazyAnimaton()
}



// скролл якорей
$("a[href^='/#']").on("click",function() {
   var href = $(this).attr("href");
   href = href.replace('/',''); //убираем /
   $("html, body").animate({ scrollTop: $(href).offset().top - 50}, 800);

   if($("body").is("._noScrollBurger")) {
      $("body").removeClass("_noScrollBurger");
      $(".burgerBg").removeClass("_active");
      $(".burgerMenu").removeClass("_show");
   }
   // return false;
});





// ГА метки
function gtagSend(gtagClick, gtagCat, gtagEvent){
   if(gtagClick && gtagCat && gtagEvent) {
      console.log(gtagClick)
      console.log(gtagCat)
      console.log(gtagEvent)
      gtag('event', gtagEvent, {'event_category' : gtagCat, 'event_label': gtagClick});
   }
}

$(document).on('click','[data-ga-click]', function(e) {
   let el = $(this);
   //только которые имеют ga-event="click"
   if(el.data('ga-event') == 'click'){
      if (!el.hasClass('_close')) {
         let gtagClick = el.attr('data-ga-click');
         let gtagCat = el.attr('data-ga-cat');
         let gtagEvent = el.attr('data-ga-event');
         gtagSend(gtagClick, gtagCat, gtagEvent)
      }
   }
});


// метки ГА при скролле
function gaScrollObserver() {
   const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: .5
   }
   const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
         const observerEl = entry.target
         if (entry.isIntersecting) {
            let gaClick = observerEl.dataset.gaClick
            let gaCat = observerEl.dataset.gaCat
            let gaEvent = observerEl.dataset.gaEvent
            gtagSend(gaClick, gaCat, gaEvent)
            observer.unobserve(observerEl)
         }
      })
   }, options)

   const arr = document.querySelectorAll('[data-ga-cat="scroll"]'); // будет работать с данными элементами
   arr.forEach(i => {
      observer.observe(i)
   })
}

if (document.querySelector('[data-ga-cat="scroll"]')) {
   gaScrollObserver()
}
