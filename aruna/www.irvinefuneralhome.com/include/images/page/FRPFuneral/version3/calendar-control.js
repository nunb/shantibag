(function () {
    function _getAsDate(dateStr) {
            var now = new Date(), str = dateStr.split('-');
            now.setFullYear(parseInt(str[0],10),parseInt(str[1],10) - 1,parseInt(str[2],10));
            return now;
    }
    
    function updateDates(start,end) {
        if (start && end) {
            YAHOO.util.Dom.get('range-start').value = start.format('yyyy-mm-dd');
            YAHOO.util.Dom.get('range-end').value = end.format('yyyy-mm-dd');
            YAHOO.util.Dom.get('date-range-display').innerHTML = start.format('mmm dd, yyyy') + ' to ' + end.format('mmm dd, yyyy');
        }
        else {
            YAHOO.util.Dom.get('range-start').value = '';
            YAHOO.util.Dom.get('range-end').value = '';
            YAHOO.util.Dom.get('date-range-display').innerHTML = 'All dates';
        }
    }
    
    function getUrlValues() {
        if (document.location.href.indexOf('?') == -1) {
            return {};
        }
        var queryString = document.location.href.split('?')[1],
        values = queryString.split('&'), rtVl = {}, i, tmp;
        
        for (i = 0; i < values.length; ++i) {
            tmp = values[i].split('=');
            rtVl[tmp[0]] = unescape(tmp[1]);
        }
        return rtVl;
    }
    
    function initCalendar() {
        var urlVals = getUrlValues(), start = urlVals['range-start'], end = urlVals['range-end'],
        rangeDisplay = YAHOO.util.Dom.get('date-range-display'), calendarShowing;

        if (start && end) {
            start = _getAsDate(start);
            end = _getAsDate(end);
        }
        else {
            start = null;
            end = null;
        }
        updateDates(start,end);

        var rangeCalendar = new frp.widget.IntervalCalendar("cal-container", {
            pages:2,
            pagedate: end,
            navigator: {
                  strings : {
                    month: "Choose Month",
                    year: "Enter Year",
                    submit: "OK",
                    cancel: "Cancel",
                    invalidYear: "Please enter a valid year"
                },
                monthFormat: YAHOO.widget.Calendar.SHORT,
                initialFocus: "year"
            }
        });
        if (start && end) {
            rangeCalendar.setInterval(start, end);
        }
        rangeCalendar.hide();
        rangeCalendar.showEvent.subscribe(function(){
            calendarShowing = true;
        });
        rangeCalendar.hideEvent.subscribe(function(){
            calendarShowing = false;
        });

        rangeCalendar.selectEvent.subscribe(function() {
            var interval = rangeCalendar.getInterval();
            if (interval.length == 2) {
                if (interval[0].getTime() != interval[1].getTime()) {
                    updateDates(interval[0],interval[1]);
                    setTimeout(function(){
                        rangeCalendar.hide();
                    },500);
                }
            }
        });
        rangeCalendar.render();
        var YE = YAHOO.util.Event, YD = YAHOO.util.Dom, showBtn = YD.get('show-calendar'),dialogEl = YD.get('condSearch'),cal = rangeCalendar,
        clearBtn = YD.get('clear-calendar');
        YE.on('show-calendar','click',function() {
            if (calendarShowing) {
                rangeCalendar.hide();
            }
            else {
                rangeCalendar.show();
            }
        });
        YAHOO.util.Event.showErrors = true;
        
        // Hide Calendar if we click anywhere in the document other than the calendar
        YE.on(document, "click", function(e) {
            var el = YE.getTarget(e);
            
            if (el.tagName.toLowerCase() == 'a' && (el.className.indexOf('selector') != -1)) {
                return;
            }
            else if (el.tagName.toLowerCase() == 'td' && (el.className.indexOf('cal-container') != -1)) {
                return;
            }
            else if (el.tagName.toLowerCase() == 'td' && el.id && (el.id.indexOf('cal-container') != -1)) {
                return;
            }

            if (el != dialogEl && el != showBtn && !YD.isAncestor(dialogEl, el) && !YD.isAncestor(showBtn, el)) {
                cal.hide();
            }
        });
        YE.on('clear-calendar','click',function() {
            rangeCalendar.hide();
            updateDates(null, null);
        });
    }
    
    YAHOO.util.Event.onAvailable('condSearch', function () {
        var loader = new frp.Loader(function () {
                loader.require([
                        "frp.widget.IntervalCalendar",
                        "frp.global.DateFormat"
                ]);
            }, function() {
                initCalendar();
            }, librarySettings.host, librarySettings.version);
    });
}())