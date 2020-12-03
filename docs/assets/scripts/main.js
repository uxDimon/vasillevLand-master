// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});




/* табы */
function slideTabs(_this){
  _this.find($('.tabs__slide')).css({
    'left': _this.find($('.tabs__tab.active')).position().left,
    'width': _this.find($('.tabs__tab.active')).width()
  })
  _this.find($('.blocks__block.active')).show();
}
/* табы end */

/* сдвиг от правой стороны хедера и серого меню */
function moveHeader (){
  if(screen.width >= 1024 && screen.width <= 1200){
    $('.header__burger').css('margin-right', Math.round($('.banner-main-woman img').width() * 0.74) - 280)
    setTimeout(function(){
      $('.header-gray').css('width', $('.header-overlay').width() - $('.header-info__phone').offset().left + 360)
    }, 401)
    return false
  }
  $('.header__burger').css('margin-right', Math.round($('.banner-main-woman img').width() * 0.74))
  setTimeout(function(){
    $('.header-gray').css('width', $('.header-overlay').width() - $('.header-info__phone').offset().left + 80)
  }, 401)
}
/* сдвиг от правой стороны хедера и серого меню end */

/* функция валидации файлового инпута */
const _maxFilesize = 20971520;
function valideteFiles (file){
  var j = 0;
  var NumberOfFiles = file.length;
  var sumFiles = 0;
  file.value = '';
  for(j; j< NumberOfFiles;j++){
    sumFiles+=file[j].size;
  }
  if (sumFiles >= _maxFilesize ){
    return true
  } else {
    return false
  }
}

/* функция валидации файлового инпута end */


/* preloader + aos + moveheader */

$(window).on('load', function () {
  moveHeader();
  setTimeout(function(){
    $('.preloader img').fadeOut();
    
    $('.banner-main-woman img').on('load', function() {
      setTimeout(function(){
        moveHeader();
      }, 1)
    });
    setTimeout(function(){
      
      $('.preloader').fadeOut();
      AOS.init({
        disable: 'mobile'
      });

    }, 1000);
  }, 1600)
});
/* preloader + aos + moveheader end */

/* ресайз табов */
function resizeTabs(){
  if(screen.width > 1023){
    $(this).find('.blocks').css('height', $(this).find('.blocks__block.active').height());
  }
}
/* ресайз табов end */


$(document).ready(function(){
  


  $(document).on('click', '.navbar__title', function(){
		$('html, body').animate({scrollTop: 0}, 1000);
  })

  /* табы */
  $('.tabs-wrap').each(function(){
    slideTabs($(this));
    resizeTabs();
  })


  $(document).on('click', '.tabs__tab:not(.active)', function(){
    if($(this).closest('.tabs-wrap').find('*').is(':animated')){
      return false
    } 
    var _this = $(this).closest('.tabs-wrap');
    _this.find($('.tabs__tab.active')).removeClass('active');
    $(this).addClass('active');
    _this.find($('.blocks__block.active')).removeClass('active').fadeToggle();
    setTimeout(() => {
      _this.find($(`.blocks__block[data-tabs="${$(this).attr('data-tabs')}"]`)).addClass('active').fadeToggle();
      if(screen.width > 1023){
        _this.find('.blocks').css('height', _this.find('.blocks__block.active').height());
      }
    
    }, 400)


    slideTabs(_this);
  })
  /* табы end */


  /* clinic slider */
  if($('.clinic-slider').length){
    $('.clinic-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: $('.clinic-arrows__prev'),
      nextArrow: $('.clinic-arrows__next'),
      fade: true
    })
  }
  /* clinic slider end */


  /*faq item */
  $(document).on('click', '.faq-item-wrap', function(){
    $(this).find('.faq-item').toggleClass('active');
    $(this).find('.faq-item').find('.faq-item-main').slideToggle();
  })
  /*faq item end */




  /* form file input */
  $(document).on('change', '.form-label_file input', function(){
    if(this.files.length){
      if(valideteFiles(this.files)){
        this.value = '';
        $(this).siblings('.form-file').find('.form-file__text').html(`Загружено > 20 мб`)
        $(this).siblings('.form-file').find('.form-file__text').css('color', 'red');
        $(this).siblings('.form-file-overlay').css('opacity', '1');
        return false
      }
      $(this).siblings('.form-file').find('.form-file__text').css('color', 'rgba(0, 0, 0, 0.25)');
      $(this).siblings('.form-file-overlay').css('opacity', '1');
      $(this).siblings('.form-file').find('.form-file__text').html(`Загружено ${this.files.length}`)
      $(this).siblings('.form-file__close').fadeIn('fast');
    } 
  })

  
  $(document).on('click', '.form-file__close', function(e){
    e.preventDefault();
    $(this).siblings('input')[0].value = '';
    $(this).fadeOut('fast');
    $(this).siblings('.form-file-overlay').attr('style', '');
    $(this).siblings('.form-file').find('.form-file__text').html(`До 20 мб`)
  })

  
  /* form file input end */



  /* form mask + validate */

  $(document).on('blur', '[data-type="text"]', function(){
    validateText($(this));
  })

  
  $(document).on('blur', '[data-type="tel"]', function(){
    validateTel($(this));
  })

  $(document).on('click', '[data-type="submit"]', function(e){
    e.preventDefault();
    var _form = $(this).closest('form');
    let valid = true;
    _form.find('[data-type="text"]').each(function(){
      if (!validateText($(this))){
        valid = false;
      }
    })
    _form.find('[data-type="tel"]').each(function(){
      if (!validateTel($(this))){
        valid = false;
      }
    })
    if(valid) {
      $('.success').fadeIn().css('display', 'flex');
      if(_form.hasClass('form-popup')){
        setTimeout(function(){
          _form.hide();
        }, 400)
      }
      console.log('Отправили форму');
      $(this).closest('form').find('input').val('');
      setTimeout(function(){
        $('.success').fadeOut();
      }, 2000)
    } else {
      console.log('Не отправили форму');
    }
  })

  var phoneMask = IMask(
    document.querySelector('.form [data-type="tel"]'), {
      mask: '+{7} (000) 000-00-00'
    }
  );

  var phoneMask2 = IMask(
    document.querySelector('.form-popup [data-type="tel"]'), {
      mask: '+{7} (000) 000-00-00'
    }
  );


  function validateText(input){
    if (input.attr('data-required') == 'true') {
      if (input.val() == '') {
        input.removeClass('input-valid');
        input.addClass('input-error');
        return false;
      } else {
        input.removeClass('input-error');
        input.addClass('input-valid');
        return true;
      }
    } else {
      if (input.val() != '') {
        input.removeClass('input-error');
        input.addClass('input-valid');
        return true;
      } else {
        input.removeClass('input-valid');
        input.removeClass('input-error');
        return true;
      }
    }
  }
  function validateTel(input){
    if (input.attr('data-required') == 'true') {
      if (input.val() == '') {
        input.removeClass('input-valid');
        input.addClass('input-error');
        input.siblings('.form-label__alert').html('Это обязательное поле');
        return false;
      } else {
        if (input.val().length != 18) {
          input.removeClass('input-valid');
          input.addClass('input-error');
          input.siblings('.form-label__alert').html('Телефон должен содержать 10 цифр');
          return false;
        } else {
          input.removeClass('input-error');
          input.addClass('input-valid');
          return true;
        }
      }
    } else {
      if (input.val().length == 18) {
        input.removeClass('input-error');
        input.addClass('input-valid');
        return true;
      } else {
        input.removeClass('input-valid');
        input.removeClass('input-error');
        return true;
      }
    }
  }
  
  /* form mask + validate end */



  /* hover image */

  var imagesHover = document.querySelectorAll('.result-item-imgbox');
  for (index = 0; index < imagesHover.length; index++) {
    img = imagesHover[index];
    img.addEventListener('mousemove', mousemoveImgHandler);
    img.addEventListener('mouseleave', mouseleaveImgHandler);
  }

  function mousemoveImgHandler(e){
    if (screen.width < 1024) {
      return
    }
    let x1 = (-(200 - e.offsetX) * 0.05),
        y1 = (-(200 - e.offsetY) * 0.05);
    $(this).attr('style', 'transform: translate(' + x1 + 'px, ' + y1 + 'px)');
  }

  function mouseleaveImgHandler (){
    if (screen.width < 1024) {
      return
    }
    $(this).attr('style', '');
  }

  /* hover image end */

  
  /* header position */ 

  $(window).resize(function(){
    moveHeader();
    resizeTabs();
  })

  /*setInterval(function(){
    moveHeader();
  }, 100)*/
  /* header position end */



  /* burger + menu */ 
  var flagAnimated = 0;
  $(document).on('click', '.header__burger', function(){
    if (flagAnimated == 1) {
      return false
    }
    flagAnimated = 1;
    
    $(this).toggleClass('active');
    
    if($(this).hasClass('active')){
      $('.header-overlay').toggle(0 , function(){
        $('.header-overlay').toggleClass('active');
      });
    } else {
      $('.header-overlay').toggleClass('active');
      setTimeout(function(){
        $('.header-overlay').toggle();
      }, 500);
    }
    setTimeout(function(){
      flagAnimated = 0;
    }, 500)


  })

  $(document).on('click', '.header-overlay', function(e){
    if (flagAnimated == 1) {
      return false
    }
    if (e.target !== this)
      return;
      
    flagAnimated = 1;
      
    $('.header__burger').toggleClass('active');
    $('.header-overlay').toggleClass('active');
    setTimeout(function(){
      $('.header-overlay').toggle();
      flagAnimated = 0;
    }, 500)
  })

  /* burger + menu end */ 


  /* anchors */


  
  $(document).on('click', '.header-nav__link, .navbar-row__link, .banner-main-grid__aboutDoctor', function(e){
		var speed = 1000;
		var top = $(`${$(this).attr('href')}`).offset().top - 52;
		$('html, body').animate({scrollTop: top}, speed);
		return false;
  })
  /* anchors end */


  $(window).on('scroll', function(){

    /* при скролле показываем убираем навбар */
    if ($(window).scrollTop() > 400) {
      $('.navbar').addClass('active');
    } else {
      $('.navbar').removeClass('active');
    }
    /* при скролле показываем убираем навбар end */



    
      
    /*Закрываем меню при скролле */
    
    if (flagAnimated == 1) {
      return false
    }
    flagAnimated = 1;
    $('.header__burger').removeClass('active');
    $('.header-overlay').removeClass('active');
    setTimeout(function(){
      $('.header-overlay').hide();
      flagAnimated = 0;
    }, 500)
    /*Закрываем меню при скролле */
  })

  $(document).on('click', '.form-popup__close', function(){
    $(this).closest('.form-popup').fadeOut();
  })

  $(document).on('click', '[data-popup]', function(e){
    e.preventDefault();
    if (flagAnimated == 1) {
      return false
    }
    flagAnimated = 1;
    $('.header__burger').removeClass('active');
    $('.header-overlay').removeClass('active');
    setTimeout(function(){
      $('.header-overlay').hide();
      flagAnimated = 0;
    }, 500)
    $('.form-popup').fadeIn().css('display', 'flex');
  })
});