$(function () {
  var $window = $(window);
  var $body = $('body');

  window.dataLayer = window.dataLayer || [];

  // layout pc dibuat dari lebar 1290 (container 1250), di bawah itu sampai 768 di-zoom biar proporsional
  function fitLayout() {
    var width = window.innerWidth;
    var zoom = (width >= 768 && width < 1290) ? width / 1290 : 1;

    document.documentElement.style.zoom = zoom === 1 ? '' : zoom;
  }

  fitLayout();
  $window.on('resize', fitLayout);

  // menu sp
  var $menu = $('.js-sp-menu');

  function openMenu() {
    $menu.addClass('is-open').attr('aria-hidden', 'false');
    $body.addClass('is-menu-open');
  }

  function closeMenu() {
    $menu.removeClass('is-open').attr('aria-hidden', 'true');
    $body.removeClass('is-menu-open');
  }

  $('.js-menu-open').on('click', openMenu);
  $('.js-menu-close').on('click', closeMenu);
  $menu.find('a').on('click', closeMenu);

  $window.on('resize', function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  // anchor link
  $('.js-anchor').on('click', function (e) {
    var $target = $($(this).attr('href'));

    if (!$target.length) {
      return;
    }
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $target.offset().top
    }, 600);
  });

  // tab
  $('.js-tab').each(function () {
    var $buttons = $(this).find('.js-tab-btn');
    var $panels = $(this).find('.js-tab-panel');

    $buttons.on('click', function () {
      $buttons.removeClass('is-active').attr('aria-selected', 'false');
      $(this).addClass('is-active').attr('aria-selected', 'true');
      $panels.removeClass('is-active');
      $('#' + $(this).attr('aria-controls')).addClass('is-active');
    });
  });

  // slider project
  $('.js-projects-slider').slick({
    prevArrow: $('.js-projects-prev'),
    nextArrow: $('.js-projects-next'),
    dots: true,
    appendDots: $('.js-projects-dots'),
    speed: 500
  });

  // tracking klik anchor (GTM custom event: anchor_click)
  $('[data-track="anchor_click"]').on('click', function () {
    window.dataLayer.push({
      event: 'anchor_click',
      link_id: $(this).attr('id'),
      link_text: $(this).data('track-label'),
      link_url: $(this).attr('href')
    });
  });
});
