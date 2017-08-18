$(document).ready(function() {
  // Add meta view port
  $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

  // Dropdown menus
  $(window).resize(function(){
    if ($(window).width() <= 768) {
      $('.header-item.tabs').addClass('collapse');
    } else {
      $('.header-item.tabs').removeClass('collapse');
    }
  });

  html_responsive = ' \
    <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"> \
      <span class="navbar-toggler-icon"></span> \
    </button> \
  '
  $(html_responsive).prependTo('#header');

  $(".header-item").wrapAll( "<div class='navbar-collapse mr-auto collapse' id='navbarResponsive' aria-expanded='false'>");
});
