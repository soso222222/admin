// common script
$(document).ready(function() {
  preventDefaultAnchor();
  initFunction();
});


// 상단 튐 방지
function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function initFunction() {
  setToggleUI();
  setHeader();
  setTabview();
  setDatepiker();
  setEditor();
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
  setCurrentMenu();
  setToggleMenu();
}
function setTitle(title) {
  $('.sub-title > h2').text(title);
}
function setToggleMenu() {
  $('#gnb > nav > ul > li > a').on('click', function(e) {
    var windowWidth = $(window).width();
    // if (windowWidth < 1024 && $(this).parent().find('ul').length > 0) {
    if ($(this).parent().find('ul').length > 0) {
      e.preventDefault();
      
      // $(this).next().css({'transition': 'height 0.3s'});
      openMenu($(this).next());
      
      $(this).parent().siblings().each(function() {
        $(this).find('ul').css({'height': '0px'});
        // $(this).find('> a i').attr({'class': 'fas fa-plus mobile'});
      });
    }
  });
}
function openMenu(ul) {
  var $ul = ul;
  var height = 0;
  $ul.find('> li').each(function() {
    height += $(this).outerHeight(true);
  });
  $ul.css({'height': height + 'px'});
  // $(this).find('i').attr({'class': 'fas fa-minus mobile'});
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
function setCurrentMenu() {
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
      // $(this).parent().css({'transition': 'none'});
      openMenu($(this).parent());
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
function setCheckedAll() {
  document.querySelectorAll('input.check-all').forEach(function (el, i) {

    el.addEventListener('change', function(e){
    var checkboxName = el.getAttribute('name');
    var isChecked = (el.checked === true) ? true : false;
    var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]');

      checkboxes.forEach(function (el, i) {
        el.checked = isChecked;
      });
    });
  });
}
function setMenuClick (menuUl) {
  $menu = $(menuUl);
  $menu.find('li > a').on('click', function(e) {
    var index = $menu.find('li').index($(this).parent());
    var modeName = (index === 1) ? 'dark' : 'light';
    $menu.find('li').removeClass('on');
    $menu.find('li:eq(' + index + ')').addClass('on');
  });
}
// tinymce editor 적용
function setEditor() {
  var rootPath = (document.querySelector('base')) ? document.querySelector('base').getAttribute('href') : '/';

  tinymce.init({
    selector: 'textarea.editor',
    plugins: [
      'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table directionality emoticons template paste'
    ],
    //content_css: 'css/content.css',
    content_style: 'p {font-family: "나눔고딕", NanumGothic; margin: 5px; font-size: 13px; line-height: 1.4em;}',
    toolbar: 'print preview newdocument undo redo | fontselect | fontsizeselect | forecolor backcolor bold italic underline strikethrough | link image media charmap code',
    font_formats: '나눔고딕=나눔고딕,NanumGothic;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
    fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
    language: 'ko_KR',
    // images_upload_url: rootPath + 'editor-image-upload',
    // images_upload_base_path: rootPath + 'storage/editor',
    relative_urls : false,
    images_upload_credentials: true,
    image_dimensions: false,
    setup: function (editor) {
        editor.on('change', function() { editor.save(); });
    }
  });
}
function setChart(id, type) {
  //type : bar, bubble, doughnut, line, mixed, polarArea, radar, scatter
  var ctx = document.getElementById(id).getContext('2d');
  var myChart = new Chart(ctx, setSampleChartData(type));
}
function setSampleChartData(type) {
  var datasets = null;
  var label = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  var light_red = 'rgba(255, 99, 132, 0.2)';
  var light_blue = 'rgba(54, 162, 235, 0.2)';
  var light_yellow = 'rgba(255, 206, 86, 0.2)';
  var light_green = 'rgba(75, 192, 192, 0.2)';
  var light_purple = 'rgba(153, 102, 255, 0.2)';
  var light_orange = 'rgba(255, 159, 64, 0.2)';
  var light_grey = 'rgba(201, 203, 207, 0.2)';
  var red = 'rgba(255, 99, 132, 1)';
  var blue = 'rgba(54, 162, 235, 1)';
  var yellow = 'rgba(255, 206, 86, 1)';
  var green = 'rgba(75, 192, 192, 1)';
  var purple = 'rgba(153, 102, 255, 1)';
  var orange = 'rgba(255, 159, 64, 1)';
  var grey = 'rgba(201, 203, 207, 1)';

  
  switch(type) {
    case 'bar':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [{
            label: 'Colors', 
            data: [12, 19, 3, 5, 2, 3], //x축 label에 대응되는 데이터 값
            backgroundColor: [light_red, light_blue, light_yellow, light_green, light_purple, light_orange],
            borderColor: [red, blue, yellow, green, purple, orange],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // 0부터 시작하게 합니다.
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Bar Chart Sample'
            }
          }
        }
      };
      break;
    case 'bubble':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [{
            label: 'Dataset 1',
            data: {
              x: 20,
              y: 30,
              r: 15
            },
            borderColor: red,
            backgroundColor: light_red
          },
          {
            label: 'Dataset 2',
            data: {
              x: 40,
              y: 10,
              r: 15
            },
            borderColor: orange,
            backgroundColor: light_orange
          }]
        },
        options: {
          // animation: {
          //   onComplete: () => {
          //     delayed = true;
          //   },
          //   delay: (context) => {
          //     let delay = 0;
          //     if (context.type === 'data' && context.mode === 'default' && !delayed) {
          //       delay = context.dataIndex * 300 + context.datasetIndex * 100;
          //     }
          //     return delay;
          //   },
          // },
          plugins: {
            title: {
              display: true,
              text: 'Bubble Chart Sample'
            }
          }
        }
      };
      break;
    case 'doughnut':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [{
            label: 'Colors', 
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [red, blue, yellow, green, purple, orange],
            hoverOffset: 4 // hover 시, 호 오프셋(픽셀 단위).
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Doughnut Chart Sample'
            }
          }
        }
      };
      break;
    case 'line':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [
            {
              label: '1',
              data: [65, 59, 80, 81, 56, 55],
              //Fill 옵션은 총 네 가지가 존재합니다 
              // - false  : 아무것도 채워지지 않음
              // - origin : 기준점 사이로 채워짐 
              // - start : x축 선부터 채워짐
              // - end : x축의 최대값의 기준으로 채워짐
              fill: false,
              backgroundColor: light_red,
              borderColor: red,
              tension: 0.1
            },
            {
              label: '2',
              data: [44, 22, 55, 77, 44, 55],
              fill: false,
              backgroundColor: light_blue,
              borderColor: blue,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          // interaction : point에 상호작용
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: 'Line Chart Sample'
            }
          }
        },
      };
      break;
    case 'pie':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [{
            label: 'Colors', 
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [red, blue, yellow, green, purple, orange],
            hoverOffset: 4 // hover 시, 호 오프셋(픽셀 단위).
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Pie Chart Sample'
            }
          }
        }
      };
      break;
    case 'polarArea':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [{
            label: 'Colors', 
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [red, blue, yellow, green, purple, orange],
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Polar Area Chart Sample'
            }
          }
        }
      };
      break;
    case 'radar':
      datasets = {
        type: type,
        data: {
          labels: label,
          datasets: [{
            label: 'First Dataset',
            data: [65, 59, 90, 81, 56, 40],
            fill: true,
            backgroundColor: light_purple,
            borderColor: purple,
            pointBackgroundColor: purple,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: purple
          }, 
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 96, 27],
            fill: true,
            backgroundColor: light_green,
            borderColor: green,
            pointBackgroundColor: green,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: green
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Polar Area Chart Sample'
            }
          }
        }
      };
      break;
    case 'scatter':
      break;
    case 'bar-line':
      datasets = {
        type: 'scatter',
        data: {
          labels: label,
          datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40, 33, 2],
            borderColor: yellow,
            backgroundColor: light_yellow
          }, {
            type: 'line',
            label: 'Line Dataset',
            data: [44, 22, 55, 77, 44, 55],
            fill: false,
            borderColor: blue
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // 0부터 시작하게 합니다.
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Bar & Line Chart Sample'
            }
          }
        }
      };
      break;
    default: 
      break;
  }

  return datasets;
}
function setCalendar() {
  // document.addEventListener('DOMContentLoaded', function() {
  //   var calendarEl = document.getElementById('calendar');
  //   var calendar = new FullCalendar.Calendar(calendarEl, {
  //     initialView: 'dayGridMonth'
  //   });
  //   calendar.render();
  // });
  
  document.addEventListener('DOMContentLoaded', function() {
    // var calendarEl = document.getElementById('calendar');
    var calendarEl = document.querySelector('.full-calendar');
    // var calendarEl = $('.full-calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      initialDate: '2020-09-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2020-09-01'
        },
        {
          title: 'Long Event',
          start: '2020-09-07',
          end: '2020-09-10'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2020-09-09T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2020-09-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2020-09-11',
          end: '2020-09-13'
        },
        {
          title: 'Meeting',
          start: '2020-09-12T10:30:00',
          end: '2020-09-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2020-09-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2020-09-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2020-09-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2020-09-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2020-09-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2020-09-28'
        }
      ]
    });
  
    calendar.render();
  });
}