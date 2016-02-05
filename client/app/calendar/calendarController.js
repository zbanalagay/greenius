var calendar = angular.module('calendar', []);
calendar.controller('calendarController', ['auth', '$window', 'Events', 'Plants','$compile', '$timeout', 'uiCalendarConfig', function(auth, $window, Events, Plants, $compile, $timeout, uiCalendarConfig) {
	var that = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  // fake events
  that.events = [
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  ];

  /* Change View */
  that.changeView = function(view,calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
  };

  /* Change View */
  that.renderCalender = function(calendar) {
    $timeout(function() {
     if(uiCalendarConfig.calendars[calendar]){
       uiCalendarConfig.calendars[calendar].fullCalendar('render');
     }
   });
  };

  /* Configure calendar */
  that.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: that.alertOnEventClick,
        eventDrop: that.alertOnDrop,
        eventResize: that.alertOnResize,
        eventRender: that.eventRender
      }
    };

    that.eventSources = [that.events];
    
}]);
