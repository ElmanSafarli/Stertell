$(document).ready(function () {
  // Preloader
  $("html").addClass("preloader-active");

  $(window).on("load", function () {
    setTimeout(function () {
      $("#preloader").fadeOut(500, function () {
        $("html").removeClass("preloader-active");
      });
    }, 1000);
  });

  $(document).on("pjax:start", function () {
    if ($("#preloader").length > 0) {
      $("#preloader").fadeIn(400);
      $("html").addClass("preloader-active");
    }
  });

  $(document).on("pjax:end", function () {
    if ($("#preloader").length > 0) {
      setTimeout(function () {
        $("#preloader").fadeOut(500, function () {
          $("html").removeClass("preloader-active");
        });
      }, 1000);
    }
  });

  // Type Animation (only if #myElement exists and TypeIt is available)
  if ($("#myElement").length > 0 && typeof TypeIt !== "undefined") {
    new TypeIt("#myElement", {
      strings:
        "We empower mobile operators and enterprises with the tools to deliver messages securely, detect fraud, and optimize traffic to drive maximum revenue.",
      speed: 100,
    }).go();
  }

  // Mobile sidebar close on overlay click
  if ($(".overlay").length > 0 && $("#menu-toggle").length > 0) {
    $(".overlay").on("click", function () {
      $("#menu-toggle").prop("checked", false);
    });
  }

  // Solution Panel logic
  if ($(".sptm_bottom").length > 0 && $(".solution_panel").length > 0) {
    $(".sptm_bottom").hide();
    $(".solution_panel:first .sptm_bottom")
      .addClass("activeSolutionPanel")
      .show();

    $(".solution_panel").on("click", function () {
      $(".sptm_bottom").removeClass("activeSolutionPanel").slideUp(300);
      $(this)
        .find(".sptm_bottom")
        .addClass("activeSolutionPanel")
        .slideDown(300);
    });
  }

  // FaQs logic
  if ($(".faq").length > 0) {
    $(".faq").first().addClass("activeFaq").find(".faq_answer").slideDown();

    $(".faq").click(function () {
      const isOpen = $(this).hasClass("activeFaq");

      $(".faq").removeClass("activeFaq").find(".faq_answer").slideUp();

      if (!isOpen) {
        $(this).addClass("activeFaq").find(".faq_answer").slideDown();
      }
    });
  }

  // Contact Form Label Animation
  const $inputs = $(".user_input input, .user_textarea textarea");

  if ($inputs.length > 0) {
    $inputs.each(function () {
      if ($(this).val().trim() !== "") {
        $(this).addClass("filled");
      }
    });

    $inputs.on("focus", function () {
      $(this).addClass("filled");
    });

    $inputs.on("blur", function () {
      if ($(this).val().trim() === "") {
        $(this).removeClass("filled");
      }
    });
  }

  // Country Selector
  if ($("#country_selector").length > 0 && $.fn.countrySelect) {
    $("#country_selector").countrySelect();
  }
});
