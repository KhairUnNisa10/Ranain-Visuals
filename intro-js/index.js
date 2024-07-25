(function ($) {
  $(function () {
    // Cache selectors
    var $window = $(window),
      $agTimeline = $(".js-timeline"),
      $agTimelineLine = $(".timeline_line"),
      $agTimelineLineProgress = $(".timeline_line_progress"),
      $agTimelinePoint = $(".js-timeline-card_point-box"),
      $agTimelineItem = $(".timeline_item"),
      agOuterHeight = $window.outerHeight(),
      agHeight = $window.height(),
      lastScrollY = -1,
      isUpdating = false;

    // Attach event listeners
    $window.on("scroll", onScroll);
    $window.on("resize", onResize);

    function onScroll() {
      updateFrame();
    }

    function onResize() {
      agHeight = $window.height();
      updateFrame();
    }

    function updateWindow() {
      isUpdating = false;

      // Update the position of the timeline line
      $agTimelineLine.css({
        top:
          $agTimelineItem.first().find($agTimelinePoint).offset().top -
          $agTimelineItem.first().offset().top,
        bottom:
          $agTimeline.offset().top +
          $agTimeline.outerHeight() -
          $agTimelineItem.last().find($agTimelinePoint).offset().top,
      });

      if (lastScrollY !== $window.scrollTop()) {
        lastScrollY = $window.scrollTop();
        updateProgress();
      }
    }

    function updateProgress() {
      var lastItemTop = $agTimelineItem
          .last()
          .find($agTimelinePoint)
          .offset().top,
        currentScrollY = $window.scrollTop(),
        progressTop =
          $agTimelineLineProgress.offset().top +
          currentScrollY -
          currentScrollY,
        middleOfWindow = currentScrollY + agOuterHeight / 2.5;

      var progressHeight = Math.min(
        middleOfWindow - progressTop,
        lastItemTop - progressTop
      );
      $agTimelineLineProgress.css({
        height: progressHeight + "px",
      });

      // Toggle active class based on scroll position
      $agTimelineItem.each(function () {
        var itemTop = $(this).find($agTimelinePoint).offset().top;
        if (itemTop + currentScrollY - currentScrollY < middleOfWindow) {
          $(this).addClass("js-ag-active");
        } else {
          $(this).removeClass("js-ag-active");
        }
      });
    }

    function updateFrame() {
      if (!isUpdating) {
        requestAnimationFrame(updateWindow);
        isUpdating = true;
      }
    }

    // Initial update
    updateFrame();
  });
})(jQuery);
  