/* recommended */
/* calendar-range.directive.js */

/**
 * @desc using 3rd party jquery plugin and initializing them
 * @example <div custom-jquery></div>
 */
angular
        .module(cartAppObj.id).directive('customJquery', customJquery);

function customJquery() {
    return {
        // custom scrollbar
        link: function () {
            //$("html").niceScroll({styler: "fb", cursorcolor: "#E12D2D", cursorwidth: '10', cursorborderradius: '10px', background: '#424f63', spacebarenabled: false, cursorborder: '0', zindex: '1000'});

            //$(".left-side").niceScroll({styler: "fb", cursorcolor: "#27cce4", cursorwidth: '10', cursorborderradius: '10px', background: '#424f63', spacebarenabled: false, cursorborder: '0'});

            //$(".card_scroll").niceScroll({styler:"fb",background:"#fff", cursorwidth: '10', cursorborderradius: '5px', cursorcolor: '#424f63', spacebarenabled:false, cursorborder: '0'});
            $(".status-content").niceScroll({styler: "fb", background: "#fff", cursorwidth: '10', cursorborderradius: '5px', cursorcolor: '#424f63', spacebarenabled: false, cursorborder: '0'});
            $(".panel").niceScroll({styler: "fb", background: "#fff", cursorwidth: '10', cursorborderradius: '5px', cursorcolor: '#424f63', spacebarenabled: false, cursorborder: '0'});
            if ($('.cart-container').hasClass('left-side-collapsed')) {
                $(".left-side").getNiceScroll().hide();
            }

            $("#navigation").getNiceScroll();
            if ($('body').hasClass('left-side-collapsed')) {
                $(".left-side").getNiceScroll().hide();
                $(".left-side").getNiceScroll().show();
            }

            /*Soft Scroll
            $(document).ready(
                    function () {
                        $("html").niceScroll();
                        $(".status-content-height").niceScroll({styler: "fb", cursorcolor: "#27cce4", cursorwidth: '10', cursorborderradius: '10px', background: '#424f63', spacebarenabled: false, cursorborder: '0'});

                    }
            );
            */

            // Toggle Left Menu
            $('.menu-list > a').click(function () {

                var parent = $(this).parent();
                var sub = parent.find('> ul');

                if (!$('body').hasClass('left-side-collapsed')) {
                    if (sub.is(':visible')) {
                        sub.slideUp(200, function () {
                            parent.removeClass('nav-active');
                            $('.main-content').css({height: ''});
                            mainContentHeightAdjust();
                        });
                    } else {
                        visibleSubMenuClose();
                        parent.addClass('nav-active');
                        sub.slideDown(200, function () {
                            mainContentHeightAdjust();
                        });
                    }
                }
                return false;
            });
            $('.sub-2 > a').click(function () {

                var parent = $(this).parent();
                var sub = parent.find('> ul');
                if (!$('body').hasClass('left-side-collapsed')) {
                    if (sub.is(':visible')) {
                        sub.slideUp(200, function () {
                            mainContentHeightAdjust();
                        });
                    } else {

                        sub.slideDown(200, function () {
                            mainContentHeightAdjust();
                        });
                    }
                }
                return false;

            });
            $(".sub-menu-2").hide();
            $('.sub-3').click(function (e) {
                $(".sub-menu-2", this).toggle(200, function () {
                    mainContentHeightAdjust();
                });
                e.stopPropagation();
            });
            $('.sub-menu-2 li').click(function (e) {
                e.stopPropagation();
            });

            function visibleSubMenuClose() {
                $('.menu-list').each(function () {
                    var t = $(this);
                    if (t.hasClass('nav-active')) {
                        t.find('> ul').slideUp(200, function () {
                            t.removeClass('nav-active');
                        });
                    }
                });
            }

            function mainContentHeightAdjust() {
                // Adjust main content height
                var docHeight = $(document).height();
                if (docHeight > $('.main-content').height())
                    $('.main-content').height(docHeight);
            }

            //  class add mouse hover
            $('.custom-nav > li').hover(function () {
                $(this).addClass('nav-hover');
            }, function () {
                $(this).removeClass('nav-hover');
            });


            $(window).resize(function () {

                if ($('body').css('position') == 'relative') {

                    $('body').removeClass('left-side-collapsed');

                } else {

                    $('body').css({left: '', marginRight: ''});
                }
            });



            $("document").on('click', function (ev) {
                ev.stopImmediatePropagation();
                $(".dropdown-toggle").dropdown("open");
            });

        }
    }
}
;
