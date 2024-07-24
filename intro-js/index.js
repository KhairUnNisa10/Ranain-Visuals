(function ($) {
  $(function () {
    var $scrollSection = $("#scroll");
    var agTimeline = $(".js-timeline");
    var agTimelineLine = $(".timeline_line");
    var agTimelineLineProgress = $(".timeline_line_progress");
    var agTimelineItem = $(".timeline_item");
    var agTimelinePoint = $(".js-timeline-card_point-box");

    // IntersectionObserver setup
    var observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $(entry.target).addClass("js-ag-active");
          } else {
            $(entry.target).removeClass("js-ag-active");
          }
        });

        // Update the progress line
        var activeItems = agTimelineItem.filter(".js-ag-active");
        if (activeItems.length > 0) {
          var firstActiveItem = activeItems.first();
          var lastActiveItem = activeItems.last();
          var progressStart =
            firstActiveItem.find(agTimelinePoint).offset().top -
            agTimeline.offset().top;
          var progressEnd =
            lastActiveItem.find(agTimelinePoint).offset().top -
            agTimeline.offset().top;
          agTimelineLineProgress.css({
            top: progressStart + "px",
            height: progressEnd - progressStart + "px",
          });
        }
      },
      {
        root: null, // This makes the root the viewport
        threshold: 0.1, // Adjust this value to determine when the items are considered in view
      }
    );

    // Observe each timeline item
    agTimelineItem.each(function () {
      observer.observe(this);
    });

    // Initial position of the timeline line
    agTimelineLine.css({
      top:
        agTimelineItem.first().find(agTimelinePoint).offset().top -
        agTimelineItem.first().offset().top,
      bottom:
        agTimeline.offset().top +
        agTimeline.outerHeight() -
        agTimelineItem.last().find(agTimelinePoint).offset().top,
    });
  });
})(jQuery);
