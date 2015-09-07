
/**
 * Created by Ghost on 2015/8/27.
 * 功能点：
 * 1、多设备首屏全屏设置
 *  -（1）动态获取用户手机屏幕高度
 *  -（2）设置特定元素的高度为手机屏幕高度-header高度
 * 2、监听特定模块是否进入可视区，直行相应动画
 */
//1、动态设置首屏高度
//var clientHeight = $(window).height();  //获取可视区高度
//var $g_slide_1 = $(".g-slide-1");       //获取首屏高度
//$g_slide_1.css({"height":clientHeight-44});
////2、首页图片动画效果，和产品沟通，暂时注掉
//$(document).ready(function () {
//    var $g_slide_items = $(".g-slide-items");
//    $g_slide_items.each(function(){
//        $(this).css({width:80+"%",marginLeft:"auto",marginRight:"auto",opacity:0.5});
//    });
//
//    $("body").on("scroll", function(event){
//        $g_slide_items.each(function(){
//
//            var fold = $(window).height() + $(window).scrollTop();
//
//            if(fold >= $(this).offset().top)
//            {
//                $(this).stop().animate({width:100+"%",opacity:1},450)
//            };
//
//            if($(this).offset().top < $(window).scrollTop()-$(this).offset().top/2)
//            {
//                //$(this).stop().animate({width:80+"%"},450);
//            }
//        });
//    });
//});
var clientHeight = $(window).height();  //获取可视区高度
var $g_slide_1 = $(".g-slide-1");       //获取首屏高度
$g_slide_1.css({"height":clientHeight-44});
//2、首页图片动画效果，和产品沟通，暂时注掉
$(document).ready(function () {
    var $g_slide_items = $(".g-slide-items");
    $g_slide_items.each(function(){
        $(this).css({width:85+"%",marginLeft:"auto",marginRight:"auto",opacity:0.5});
    });

    $(window).scroll( function(){
        var fold = $(window).height() + $(window).scrollTop();
        $g_slide_items.each(function(){
            if(fold >= $(this).offset().top){
                $(this).stop().animate({width:100+"%",opacity:1},200);
            }else{
                $(this).stop().animate({width:85+"%",opacity:0.5},200);
            };

            if($(this).offset().top < $(window).scrollTop()-$(this).offset().top/2)
            {
                //$(this).stop().animate({width:80+"%"},450);
            }
        });
    });
});

//Dialog
( function( window ) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else {
        // browser global
        window.classie = classie;
    }

})( window );

/*!
 * css-filters-polyfill.js
 *
 * Author: Christian Schepp Schaefer
 * Summary: A polyfill for CSS filter effects
 * License: MIT
 * Version: 0.22
 *
 * URL:
 * https://github.com/Schepp/
 *
 */
;

/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

    function init() {

        var overlay = document.querySelector( '.md-overlay' );

        [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

            var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
                close = modal.querySelector( '.md-close' );

            function removeModal( hasPerspective ) {
                classie.remove( modal, 'md-show' );

                if( hasPerspective ) {
                    classie.remove( document.documentElement, 'md-perspective' );
                }
            }

            function removeModalHandler() {
                removeModal( classie.has( el, 'md-setperspective' ) );
            }

            el.addEventListener( 'click', function( ev ) {
                classie.add( modal, 'md-show' );
                overlay.removeEventListener( 'click', removeModalHandler );
                overlay.addEventListener( 'click', removeModalHandler );

                if( classie.has( el, 'md-setperspective' ) ) {
                    setTimeout( function() {
                        classie.add( document.documentElement, 'md-perspective' );
                    }, 25 );
                }
            });

            close.addEventListener( 'click', function( ev ) {
                ev.stopPropagation();
                removeModalHandler();
            });

        } );

    }

    init();

})();
