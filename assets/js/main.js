(function ($) {
    'use strict';
    var rtsJs = {
        m: function (e) {
            rtsJs.d();
            rtsJs.methods();
        },
        d: function (e) {
            this._window = $(window),
            this._document = $(document),
            this._body = $('body'),
            this._html = $('html')
        },
        methods: function (e) {
            rtsJs.preloader();
            rtsJs.stickyHeader();
            rtsJs.backToTopInit();
            rtsJs.swiperActivation();
            rtsJs.cartNumberIncDec();
            rtsJs.stickySidebar();
            rtsJs.sideMenu();
            rtsJs.searchOption();
            rtsJs.menuCurrentLink();
        },

        preloader: function(e){
          $(window).on('load', function () {
            $("#rts__preloader").delay(0).fadeOut(1000);
          })
          $(window).on('load', function () {
            $("#weiboo-load").delay(0).fadeOut(1000);
          })
        },
        
        stickyHeader: function (e) {
          $(window).scroll(function () {
              if ($(this).scrollTop() > 150) {
                  $('.header--sticky').addClass('sticky')
              } else {
                  $('.header--sticky').removeClass('sticky')
              }
          })
        },
        backToTopInit: function () {
          $(document).ready(function(){
          "use strict";
      
          var progressPath = document.querySelector('.progress-wrap path');
          var pathLength = progressPath.getTotalLength();
          progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
          progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
          progressPath.style.strokeDashoffset = pathLength;
          progressPath.getBoundingClientRect();
          progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
          var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
          }
          updateProgress();
          $(window).scroll(updateProgress);	
          var offset = 150;
          var duration = 500;
          jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
              jQuery('.progress-wrap').addClass('active-progress');
            } else {
              jQuery('.progress-wrap').removeClass('active-progress');
            }
          });				
          jQuery('.progress-wrap').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
          })
          
          
        });
  
        },


        swiperActivation: function(){
          $(document).ready(function(){
            let defaults = {
              spaceBetween: 30,
              slidesPerView: 2
            };            
            initSwipers(defaults);
            
            function initSwipers(defaults = {}, selector = ".swiper-data") {
              let swipers = document.querySelectorAll(selector);
              swipers.forEach((swiper) => {
                
                let optionsData = swiper.dataset.swiper
                  ? JSON.parse(swiper.dataset.swiper)
                  : {};
                
                let options = {
                  ...defaults,
                  ...optionsData
                };
                           
                new Swiper(swiper, options);
              });
            }
            
          })

          $(document).ready(function () {

            var sliderThumbnail = new Swiper(".slider-thumbnail", {
              spaceBetween: 20,
              slidesPerView: 3,
              freeMode: true,
              watchSlidesVisibility: true,
              watchSlidesProgress: true,
              breakpoints: {
                991: {
                  spaceBetween: 30,
                },
                320: {
                  spaceBetween: 15,
                }
              },
            });
    
            var swiper = new Swiper(".swiper-container-h12", {
              thumbs: {
                swiper: sliderThumbnail,
              },
            });
    
          });

        },


        cartNumberIncDec: function(){
          $(document).ready(function(){
            
            $(function () {
              $(".button").on("click", function () {
                var $button = $(this);
                var $parent = $button.parents('.quantity-edit');
                var oldValue = $parent.find('.input').val();
          
                if ($button.text() == "+") {
                  var newVal = parseFloat(oldValue) + 1;
                } else {
                  if (oldValue > 1) {
                    var newVal = parseFloat(oldValue) - 1;
                  } else {
                    newVal = 1;
                  }
                }
                $parent.find('a.add-to-cart').attr('data-quantity', newVal);
                $parent.find('.input').val(newVal);
              });
            });
          });

          $(".coupon-click").on('click', function (){
            $(this).parents('.coupon-input-area-1').find(".coupon-input-area").toggleClass('show');
          });

          $('.close-c1').on('click', function () {
            $('.close-c1'),$(this).parents( '.cart-item-1' ).addClass('deactive');
          });
        
        },

        zoonImage: function(){
          $(document).ready(function(){
            function imageZoom(imgID, resultID) {
              var img, lens, result, cx, cy;
              img = document.getElementById(imgID);
              result = document.getElementById(resultID);
              /*create lens:*/
              lens = document.createElement("DIV");
              lens.setAttribute("class", "img-zoom-lens");
              /*insert lens:*/
              img.parentElement.insertBefore(lens, img);
              /*calculate the ratio between result DIV and lens:*/
              cx = result.offsetWidth / lens.offsetWidth;
              cy = result.offsetHeight / lens.offsetHeight;
              /*set background properties for the result DIV:*/
              result.style.backgroundImage = "url('" + img.src + "')";
              result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
              /*execute a function when someone moves the cursor over the image, or the lens:*/
              lens.addEventListener("mousemove", moveLens);
              img.addEventListener("mousemove", moveLens);
              /*and also for touch screens:*/
              lens.addEventListener("touchmove", moveLens);
              img.addEventListener("touchmove", moveLens);
              function moveLens(e) {
                var pos, x, y;
                /*prevent any other actions that may occur when moving over the image:*/
                e.preventDefault();
                /*get the cursor's x and y positions:*/
                pos = getCursorPos(e);
                /*calculate the position of the lens:*/
                x = pos.x - (lens.offsetWidth / 2);
                y = pos.y - (lens.offsetHeight / 2);
                /*prevent the lens from being positioned outside the image:*/
                if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
                if (x < 0) {x = 0;}
                if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
                if (y < 0) {y = 0;}
                /*set the position of the lens:*/
                lens.style.left = x + "px";
                lens.style.top = y + "px";
                /*display what the lens "sees":*/
                result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
              }
              function getCursorPos(e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                /*get the x and y positions of the image:*/
                a = img.getBoundingClientRect();
                /*calculate the cursor's x and y coordinates, relative to the image:*/
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                /*consider any page scrolling:*/
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return {x : x, y : y};
              }
            }
  
            imageZoom("myimage", "myresult");


          });
        },

                 

      

        stickySidebar: function () {
          if (typeof $.fn.theiaStickySidebar !== "undefined") {
            $(".rts-sticky-column-item").theiaStickySidebar({
              additionalMarginTop: 130,
            });
          }
        },

        sideMenu:function(){
          $(document).on('click', '.menu-btn', function () {
            $("#side-bar").addClass("show");
            $("#anywhere-home").addClass("bgshow");
          });
          $(document).on('click', '.close-icon-menu', function () {
            $("#side-bar").removeClass("show");
            $("#anywhere-home").removeClass("bgshow");
          });
          $(document).on('click', '#anywhere-home', function () {
            $("#side-bar").removeClass("show");
            $("#anywhere-home").removeClass("bgshow");
          });
          $(document).on('click', '.onepage .mainmenu li a', function () {
            $("#side-bar").removeClass("show");
            $("#anywhere-home").removeClass("bgshow");
          });
          $('#mobile-menu-active').metisMenu();
          $('#category-active-four').metisMenu();
          $('#category-active-menu').metisMenu();
          $('.category-active-menu-sidebar').metisMenu();
        },

        searchOption: function () {
        $(document).on('click', '#search', function () {
          $(".search-input-area").addClass("show");
          $("#anywhere-home").addClass("bgshow");
        });
        $(document).on('click', '#close', function () {
          $(".search-input-area").removeClass("show");
          $("#anywhere-home").removeClass("bgshow");
        });
        $(document).on('click', '#anywhere-home', function () {
          $(".search-input-area").removeClass("show");
          $("#anywhere-home").removeClass("bgshow");
        });
        },

        
      


       

        
    }

    rtsJs.m();
  })(jQuery, window) 



  function zoom(e) {
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = offsetX / zoomer.offsetWidth * 100
    y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }









