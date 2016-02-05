var calendar = angular.module('calendar', []);
calendar.controller('calendarController', ['auth', '$window', 'Events','$compile', '$timeout', 'uiCalendarConfig', 'Plants', function(auth, $window, Events, $compile, $timeout, uiCalendarConfig, Plants) {
	var that = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  that.data = {};
  that.data.username = $window.localStorage.getItem('username');
  // for each event, get plantid get plant name from there
  // parse out the date
  // with those results then create and event inside the calendar
  //
  that.getEvents = function(){
    Events.getUserEvents(that.data)
      .then(function(results){
        console.log('SUCCESS IN getUserEvents CONTROLLER', results.data);
        for(var i = 0; i < results.data.length; i++){
          // that.data.nickname = results.data[i].nickname;
          that.data.eventDate = results.data[i].eventDate;
          console.log(that.data, 'HELLOEOWOEREU@#*&*(#)')
        }
          //results in an array of objects
          // TODO possible convert ms back into time
        })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS CONTROLLER');
      })
  };

        that.getEvents();

  that.getPlantById = function(){
            // plant is hardcoded to test the route and db helper
    var plant = {
      plantId: 1
    }
    Plants.getPlantById(plant)
      .then(function(results){
        console.log('SUCCESS IN GETPLANTBYIDCONTROLLER', results.data.nickname);
          that.nickname = results.data.nickname;
      })
      .catch(function(error) {
        console.log('ERROR IN GETPLANTBYIDCONTROLLER', error);
      })
    }

  that.getPlantById();

  that.events = [
    {title: 'Rose needs to plant', start: new Date(y, m , d + 1, 19, 0), end: new Date(y, m , d +1, 20, 30), allDay: false }
  ];


	that.eventSources = [that.events];
  // that.renderCalendar = function(calendar) {
  //     if(uiCalendarConfig.calendars[calendar]){
  //       uiCalendarConfig.calendars[calendar].fullCalendar('render');
  //     }
  //   };
  // that.eventsF

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

  //   that.eventsF = function (start, end, timezone, callback) {
  //    var s = new Date(start).getTime() / 1000;
  //    var e = new Date(end).getTime() / 1000;
  //    var m = new Date(start).getMonth();
  //    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
  //    callback(events);
  //  };
    // that.addEvent = function() {
    //    that.events.push({
    //      title: 'Open Sesame',
    //      start: new Date(y, m, 28),
    //      end: new Date(y, m, 29),
    //      className: ['openSesame']
    //    });
    //  };
}]);
