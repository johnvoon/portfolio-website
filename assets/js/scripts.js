(function($) {
  "use strict";

  var $window = $(window);
  var $inputTextArea = $("input, textarea");
  var $navLinks = $('a[href^="#"]');
  var $htmlBody = $("html, body");
  var $logo = $("#navigation__logo");
  var $heroImage = $("#hero__image");
  var $navigation = $("#navigation");
  var $navigationMobile = $("#navigation-mobile");

  $navLinks.click(function(event) {
    event.preventDefault();

    $htmlBody.animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top
      },
      700
    );
  });

  $inputTextArea.blur(function() {
    $(this).toggleClass("has-value", $(this).val().length > 0);
  });

  $window.scroll(function() {
    $heroImage.css("opacity", 1 - $window.scrollTop() / $window.height());
    $navigationMobile.toggleClass(
      "showing",
      $window.scrollTop() > $window.height()
    );
    $navigation.toggleClass(
      "navigation-background",
      $window.scrollTop() > $window.height()
    );
    $navigation.toggleClass(
      "inverted",
      $window.scrollTop() > $window.height() / 4
    );
  });
})(jQuery);
