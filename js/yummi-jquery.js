$(document).ready(function() {

// Загрузчик
  $('.preloader').delay(100).fadeOut(300);

// =============================

// Анимация
  $(window).scroll( function () {

    // Классы
    var priceBlock = $('.price-box');
    // Неизменны
    var $winTop = $(this).scrollTop();
    var $winHeight = $(this).height();
    var $winBottom = ($winTop + $winHeight);

    // Подстановки классов
      var $priceBlock = priceBlock.offset().top;
      var $pospriceBlock = ($priceBlock - $winHeight / 1.2);
      if ($winTop > $pospriceBlock) {
        priceBlock.addClass('animated');
      };
    });

// =============================
});
