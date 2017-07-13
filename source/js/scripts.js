/* ====================================
   Onload functions
   ==================================== */

var aeApp = aeApp || {};


  // force widow back to top
  window.onbeforeunload = function(){ window.scrollTo(0,0); }


  aeApp.scrollThings = function(){
    window.onscroll = function(e) {
      var scrollPosition = window.pageYOffset;
      var windowSize     = window.innerHeight;
      var bodyHeight     = document.body.offsetHeight + 534;
      var distanceToBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);
      var speed = (distanceToBottom / 100).toFixed(2);
      var opacity = 1 - (scrollPosition * 0.003);
      var opacityNumber = Math.max(opacity.toFixed(2), 0);
      if(speed < 1) {
        $('.section-bg').css('opacity', speed)
      } else {
        $('.section-bg').css('opacity', 1);
      }

      var newPositioin = - scrollPosition / 2;
      if (scrollPosition <= 665) {
        $('.site-intro').css({
          'opacity': opacityNumber,
          'visibility': 'visible',
          'transform': 'translateY('+ newPositioin +'px)'
        });
        $('.to-white').css({
          'opacity': opacityNumber
        })
      } else if (scrollPosition > 665) {
        $('.site-intro').css({
          'opacity': 0,
          'visibility': 'hidden'
        });
        $('.to-white').css({
          'opacity': 0
        })
      }
    }
  };

  // Define load object
  aeApp.onload = function() {
    aeApp.scrollThings();
  };

  (function($, window, document) {
    aeApp.onload();

    var primaryVideo;
    var inview;
    var portfolioVideo;
    var portfolioVideoContainer;



    var portfolioVideoControls = function(){
      portfolioVideo = document.querySelector('.portfolio-video');
      portfolioVideoContainer = document.querySelector('.portfolio-video-container');
      if (!(portfolioVideo.paused)) {
        portfolioVideo.parentNode.classList.add('play');
      }
      portfolioVideoContainer.addEventListener('click', function(){
        if (!(portfolioVideo.paused || portfolioVideo.ended)) {
            portfolioVideo.pause();
            portfolioVideo.parentNode.classList.add('paused');
        } else {
          portfolioVideo.play();
          portfolioVideo.parentNode.classList.remove('play');
          portfolioVideo.parentNode.classList.remove('paused');
          portfolioVideo.parentNode.classList.remove('ended');
        }
      });
      portfolioVideo.addEventListener('ended', function(){
        portfolioVideo.parentNode.classList.add('ended');
      });
      // inview = new Waypoint.Inview({
      //   element: portfolioVideo,
      //   exited: function () {
      //     if (!(this.element.getElementsByTagName('video').paused || this.element.getElementsByTagName('video').ended)) {
      //       portfolioVideo.pause();
      //     }
      //     portfolioVideo.parentNode.classList.add('paused');
      //   }
      // });
    }

    if (document.querySelector('.portfolio-video')) {
      portfolioVideoControls();
    }


    var source,
        video,
        nextModule,
        nextSource,
        activeModule,
        lazyLoad,
        firstLazyLoad,
        source,
        thumbnailMoudule,
        credit,
        helfCredits;

    if (document.getElementsByClassName('lazy-load')[0]) {
      lazyLoad = document.getElementsByClassName('lazy-load');
      firstLazyLoad = document.getElementsByClassName('lazy-load')[0];
      if (firstLazyLoad.getElementsByTagName('video')[0]) {
        source = firstLazyLoad.getElementsByTagName('video')[0].getAttribute('data-src');
        firstLazyLoad.getElementsByTagName('video')[0].removeAttribute("data-src");
        firstLazyLoad.getElementsByTagName('video')[0].setAttribute('src', source);
      }
      for (var i = 0; i < lazyLoad.length; i++) {
        inview = new Waypoint.Inview({
          element: lazyLoad[i],
          enter: function(direction){
            activeModule = this.element;
            inViewPort(activeModule);
            if (activeModule.nextElementSibling) {
              if (activeModule.nextElementSibling.classList.contains('lazy-load')) {
                activeModule = activeModule.nextElementSibling;
                preloadNextUp(activeModule);
              }
            }
          }
          // exited: function () {
          //   if (this.element.getElementsByTagName('video')[0]) {
          //     if (!(this.element.getElementsByTagName('video').paused || this.element.getElementsByTagName('video').ended)) {
          //       this.element.getElementsByTagName('video')[0].pause();
          //     }
          //   }
          // }
        });
      }

      inViewPort = function(activeModule){
        if (activeModule.getElementsByTagName('video')[0]) {
          lazyLoadContent('video', activeModule);
        }
        if (activeModule.getElementsByTagName('img')[0]) {
          lazyLoadContent('img', activeModule);
        }
        if(! activeModule.classList.contains('animate-in')){
          activeModule.classList.add('animate-in');
        }
      }

      var preloadNextUp = function(activeModule){
        if (activeModule.getElementsByTagName('video')[0]) {
          lazyLoadContent('video', activeModule);
        } else if (activeModule.getElementsByTagName('img')[0]) {
          lazyLoadContent('img', activeModule);
        }
      }
    }

    var lazyLoadContent = function(contentType, activeModule){
      if (activeModule.getElementsByTagName(contentType)){
        if (activeModule.getElementsByTagName(contentType)[0].getAttribute('data-src')) {
          source = activeModule.getElementsByTagName(contentType)[0].getAttribute('data-src');
          activeModule.getElementsByTagName(contentType)[0].removeAttribute('data-src');
          activeModule.getElementsByTagName(contentType)[0].setAttribute('src', source);
        }
        if (contentType === "video") {
          activeModule.getElementsByTagName(contentType)[0].play();
        }
      }
    }

    var caseStudyLinks;
    var thumbnailMoudule;
    var textBlock;

    var currentYear = new Date().getFullYear();
    $('.current-year').html(currentYear);


    var clipboard = new Clipboard('.cpy-clip');

    clipboard.on('success', function() {
      $('.cpy-clip').addClass('copied');
    });

    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload()
      }
    };

  }(window.jQuery, window, document));
