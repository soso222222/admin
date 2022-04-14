// common script
$(document).ready(function() {
  preventDefaultAnchor();
  setToggleUI();
  setHeader();
  setCurrent();
  setTabview();
  setDatepiker();
});


// 상단 튐 방지
function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

//header
function setHeader() {
  // $('#header > ul.mode')
  // $('#header > ul.user')
  $('#header ul.mode > li > a').on('click', function(e) {
    var index = $('#header ul.mode > li').index($(this).parent());
    var modeName = (index === 1) ? 'dark' : 'light';
    $('#header ul.mode > li').removeClass('on');
    $('#header ul.mode > li:eq(' + index + ')').addClass('on');
    // $('html').removeClass();
    // $('html').addClass(modeName);
  });
  $('#header ul.user > li.right-menu > a').on('click', function(e) {
    $(this).siblings('.tabview').css({'right': '-50px'});
  });
}
function setTitle(title) {
  $('.sub-title > h2').text(title);
}
function setTabview() {
  var $tab = null;
  var $tabview = null;

  $('.tabview').each(function(i) {
    var $tabview = $(this);
    var $tab = $(this).find(' > .tab');
    var $tabContent = $(this).find(' > .tab-content');
    $tab.find(' > li:eq(0)').addClass('on');
    $tabContent.find(' > li:eq(0)').addClass('on');

    $tab.find(' > li > a').on('click', function(e) {
      var index = $tab.find(' > li').index($(this).parent());
      $tab.find(' > li').removeClass('on');
      $tabContent.find(' > li').removeClass('on');
      $tab.find(' > li:eq(' + index + ')').addClass('on');
      $tabContent.find(' > li:eq(' + index + ')').addClass('on');
    });
    //hader의 tab close
    $tab.find('a.close').on('click', function(e) {
      $tabview.css({'right': '-370px'});
    });
  });
}
function setTogglePW() {
  $('.toggle-box').each(function(i) {
    $(this).addClass('hide');
  });

  $('.toggle-box > .btn-eye').on('click', function(e) {
    var $toggleBtn = $(this);
    var $toggleInput = $(this).siblings('input');
    var $toggleBox = $(this).parent();
    var isToggle = false;
    var toggleType = '';
    var toggleClass = '';

    isToggle = ($toggleInput.attr('type') === 'password') ? isToggle = true : isToggle = false;
    $toggleBox.removeClass('show hide');

    if(isToggle === true) {
      toggleType = 'text';
      toggleClass = 'show';
    } else {
      toggleType = 'password';
      toggleClass = 'hide';
    }

    $toggleInput.attr('type', toggleType);
    $toggleBox.addClass(toggleClass);
  });
}
function setDatepiker() {
  $('input.date').each(function(i) {
    $(this).datepicker({
      language: 'ko'
    });
  });

}
function setCurrent() {
  var bodyClass = $('body').attr('class');
  var classArray = bodyClass.split(' ');
  if (bodyClass === 'main') return false;
  
  $('#gnb > nav > ul > li').each(function() {
    if (classArray[1] === $(this).attr('data-menu')) {
      $(this).addClass('on');
    } else {
      $(this).removeClass('on');
    }
  });
  
  $('#gnb > nav > ul > li.on > ul > li').each(function() {
    if (classArray[2] === $(this).attr('data-menu')) {
      $(this).addClass('on');
    } else {
      $(this).removeClass('on');
    }
  });
}

//common
function setToggleUI() {
  $('a.btn-toggle').each(function() {
    var value = $(this).find('input').val();
    var valueLeft = $(this).find('input').attr('data-left');
    var valueRight = $(this).find('input').attr('data-right');
    $(this).attr({'title': value});
    if (value === valueRight) {
      $(this).addClass('on');
    } else {
      $(this).removeClass('on');
    }
  });

  $('a.btn-toggle').on('click', function() {
    var value = $(this).find('input').val();
    var valueLeft = $(this).find('input').attr('data-left');
    var valueRight = $(this).find('input').attr('data-right');
    if($(this).hasClass('disabled') === true){
      return false;
    }
    if ($(this).hasClass('on') === true) {
      $(this).removeClass('on');
      $(this).find('input').val(valueLeft);
      $(this).attr({'title': valueLeft});
    } else {
      $(this).addClass('on');
      $(this).find('input').val(valueRight);
      $(this).attr({'title': valueRight});
    }
  });

  setTogglePW();
}