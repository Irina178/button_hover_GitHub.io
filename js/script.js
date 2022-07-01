'use strict'
// код который помогает определить на каком устройстве открыта страница
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);

   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   ios: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.ios() ||
         isMobile.Opera() ||
         isMobile.Windows())
   }
};
//Проверка если открыто на устройству мобильном то жобавится класс на боди '_touch
//если открыто на пк то _pc

if (isMobile.any()) {
   document.body.classList.add('_touch');
   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length>0){
      for (let index = 0; index < menuArrows.length; index++){
         const menuArrow  = menuArrows[index];
         menuArrow.addEventListener('click', function(e) {
            menuArrow.parentElement.classList.toggle('_active')
         }
            
          )
      }
   }
} else {
   document.body.classList.add('_pc');
}

// ПЛАВНАЯ ПРОКРУТКА К НУЖНОМУ РАЗДЕЛУ
// В ИНДЕКСЕ К ССЫЛКАМ ДОБАВЛЯЕМ АТРИБУТ data-goto=".page__section-1 "
const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
// проверка есть ли такие классы

if( menuLinks.length>0){
   menuLinks.forEach(menuLink=>{
      menuLink.addEventListener('click', onMenuLinkClick);

   });
   function onMenuLinkClick(e){
      const menuLink = e.target;
      if(menuLink.dataset.goto &&document.querySelector(menuLink.dataset.goto )){
const gotoBlock = document.querySelector(menuLink.dataset.goto);
const gotoBlockValue  = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

window.scrollTo({
   top: gotoBlockValue,
   behavior: "smooth"
});
e.preventDefault();
      }
   }
}