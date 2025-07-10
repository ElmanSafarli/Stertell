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
    $("#preloader").fadeIn(400);
    $("html").addClass("preloader-active");
  });

  $(document).on("pjax:end", function () {
    setTimeout(function () {
      $("#preloader").fadeOut(500, function () {
        $("html").removeClass("preloader-active");
      });
    }, 1000);
  });

  // Solution Panel
  if ($(".sptm_bottom").length > 0) {
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
  } else {
    console.warn("Some elements are missing.");
  }

  // FaQs
  $(".faq").first().addClass("activeFaq").find(".faq_answer").slideDown();

  $(".faq").click(function () {
    const isOpen = $(this).hasClass("activeFaq");

    $(".faq").removeClass("activeFaq").find(".faq_answer").slideUp();

    if (!isOpen) {
      $(this).addClass("activeFaq").find(".faq_answer").slideDown();
    }
  });

  // Contact Form Label Animation
  const $inputs = $(".user_input input, .user_textarea textarea");

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

  $("#country_selector").countrySelect();
});
