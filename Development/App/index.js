$(document).ready(function () {
  // Cursor animation
  if ($("#app_cursor").length > 0) {
    const $cursor = $('<div class="custom-neon-cursor"></div>');
    $("body").append($cursor);

    const $appArea = $("#app_cursor");
    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      $cursor.css({
        left: cursorX + "px",
        top: cursorY + "px",
      });
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    $appArea.on("mouseenter", function () {
      $cursor.css("opacity", "1");
      $appArea.addClass("hovering");
    });

    $appArea.on("mouseleave", function () {
      $cursor.css("opacity", "0");
      $appArea.removeClass("hovering");
    });

    $appArea.on("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  }

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

  // Scroll to top
  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const pageHeight = $(document).height();
    const windowHeight = $(window).height();

    if (scrollTop > windowHeight * 1.5) {
      $("#scrollTop").css("display", "flex");
    }

    if (scrollTop <= 10) {
      $("#scrollTop").fadeOut();
    }
  });

  $("#scrollTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  // Type Animation (only if #myElement exists and TypeIt is available)
  if ($("#myElement").length > 0 && typeof TypeIt !== "undefined") {
    new TypeIt("#myElement", {
      strings:
        "We empower mobile operators and enterprises with the tools to deliver messages securely, detect fraud, and optimize traffic to drive maximum revenue.",
      speed: 50,
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
