// $(function() {    
// 	/*获取一个月的天数 */
// 	function getCountDays(thisMouth) {
// 		var curDate = new Date();
// 		/* 获取当前月份 */
// 		var curMonth = thisMouth;
// 		/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
// 		curDate.setMonth(curMonth);
// 		/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
// 		curDate.setDate(0);
// 		/* 返回当月的天数 */
// 		return curDate.getDate();
// 	}
// 	var day = getCountDays(7);

// 	// 3. 在通过数组来添加天数：
// 	console.log(day);
// 	function getEvryDay() {
// 		var dayArry = [];
// 		for (var k = 1; k <= day; k++) {
// 			dayArry.push(k);
// 		}
// 		return dayArry;
// 	};
// 	console.log(getEvryDay());
// })
/**
 * Created by WZH on 2017/7/31.
 */
/**
 * 日历控件
 * v1.0
 */
(function ($) {
    var Calendar = function (elem, options) {
        this.$calendar = elem;
        var _date = new Date();
        this.defaults = {
            ifSwitch: true,
            hoverDate: false,
            year: _date.getFullYear(),
            month: _date.getMonth(),
            day: _date.getDate(),
            click: function () {

            }
        };

        this.opts = $.extend({}, this.defaults, options);
        dateObj.setDate(new Date(this.opts.year, this.opts.month, this.opts.day));
    };
    var thisWeek = 0;
    var init = 0;
    var makInit = 0;
    Calendar.prototype = {
        showHoverInfo: function (obj) { // hover 时显示当天信息

        },

        showCalendar: function () { // 输入数据并显示
            var self = this;
            var year = dateObj.getDate().getFullYear();
            var month = dateObj.getDate().getMonth() + 1;
            var dateStr = returnDateStr(dateObj.getDate());
            var firstDay = new Date(year, month - 1, 1); // 当前月的第一天

            this.$calendarTitle_text.text(year + '年' + dateStr.substr(4, 2) + "月");

            this.$calendarDate_item.each(function (i, date) {
                // allDay: 得到当前列表显示的所有天数                                                                                                   

                var allDay = new Date(year, month - 1, i - firstDay.getDay() - 5);
                var allDay_str = returnDateStr(allDay);
                $(this).html(allDay.getDate()).attr('data', allDay_str);
                if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
                    $($('.J_numBox')[$(this).parent().parent('.J_numBox').index() - 1]).show();
                    $(this).attr('class', 'caList'); //普通日期  
                }
                if (returnDateStr(firstDay).substr(0, 6) != allDay_str.substr(0, 6)) {
                    // 非本月日期 
                    if (i <= 49 && i >= 42) {
                        if (i == 42) {
                            $($('.J_numBox')[$(this).parent().parent('.J_numBox').index() - 1]).hide();
                            if ($(date).text() <= 8) {
                                $(this).parent().parent('.J_numBox').hide();
                                if (makInit == 'pre') {
                                    thisWeek = 6;
                                } else if (makInit == 'net') {
                                    thisWeek = 1;
                                }
                            }
                        }
                    } else if (i <= 7) {
                        $($('.J_numBox')[$(this).parent().parent('.J_numBox').index() - 1]).hide();
                    }
                    $(this).attr('class', 'disClick');
                }
                if (returnDateStr(new Date(self.opts.year, self.opts.month, self.opts.day)) === allDay_str) {
                    init = $(this).parent().parent('.J_numBox').index();
                    $(this).addClass('select');
                }
            });
            // 已选择的情况下，切换日期也不会改变
            if (self.selected_data) {
                var selected_elem = self.$calendar_body.find('[data=' + self.selected_data + ']');

                selected_elem.addClass('select');
            }
        },
        showWeekCalendar: function () {
            this.$calendarDate_item.each(function (i, dom) {
                $('.J_numBox').hide();
                if ($(dom).hasClass('caList')) {
                    if ($('.select').length == 0 || $('.select').hasClass('disClick')) {
                        if ($(dom).text() == 1) {
                            $(this).parent().parent('.J_numBox').show();
                            thisWeek = $(this).parent().parent('.J_numBox').index();
                            return false;
                        }
                    } else {
                        $('.select').parent().parent('.J_numBox').show();
                        thisWeek = $('.select').parent().parent('.J_numBox').index();
                        return false;
                    }
                }
            });
        },
        renderDOM: function () { // 渲染DOM
            this.$calendar.children().remove();
            this.$calendar_title = $('<div class="caTile"></div>');
            this.$calendar_body = $('<div class="caCent numBox"></div>')
            this.$calendar_week = $('<div class="caBox"></div>');
            var _titleStr =
                '<div class="leftTile J_preweek"><i class="fa fa-caret-left arrow-prev" aria-hidden="true"></i></div>' +
                '<div class="conTile">2017 四月</div>' +
                '<div class="leftTile J_netweek"><i class="fa fa-caret-right arrow-next" aria-hidden="true"></i></div>';
            var _weekStr =
                '<div class="caList"><div>一</div></div>' +
                '<div class="caList"><div>二</div></div>' +
                '<div class="caList"><div>三</div></div>' +
                '<div class="caList"><div>四</div></div>' +
                '<div class="caList"><div>五</div></div>' +
                '<div class="caList"><div>六</div></div>' +
                '<div class="caList"><div>日</div></div>';
            this.$calendar_week.append(_weekStr);
            this.$calendar_body.append(this.$calendar_week);
            for (var i = 0; i < 7; i++) {
                var _dateStr = '';
                _dateStr +=
                    '<div class="caBox J_numBox"><div class="caList"><div class="numDiv">1</div></div>' +
                    '<div class="caList"><div class="numDiv">2</div></div>' +
                    '<div class="caList"><div class="numDiv">3</div></div>' +
                    '<div class="caList"><div class="numDiv">4</div></div>' +
                    '<div class="caList"><div class="numDiv">5</div></div>' +
                    '<div class="caList"><div class="numDiv">6</div></div>' +
                    '<div class="caList"><div class="numDiv">7</div></div></div>';
                this.$calendar_body.append($(_dateStr));
            }
            // console.log(this.$calendar_week);
            this.$calendar_title.html(_titleStr);
            this.$calendar.append(this.$calendar_title, this.$calendar_body);
            this.$calendar.show();
        },

        inital: function () { // 初始化
            var self = this;

            this.renderDOM();

            this.$calendarTitle_text = this.$calendar_title.find('.conTile');
            // 切换月
            this.$arrow_prev = this.$calendar_title.find('.J_preMouth');
            this.$arrow_next = this.$calendar_title.find('.J_netMouth');
            // 切换周            
            this.$arrow_prevWeek = this.$calendar_title.find('.J_preweek');
            this.$arrow_nextWeek = this.$calendar_title.find('.J_netweek');
            this.$calendarDate_item = this.$calendar_body.find('.numDiv');
            this.selected_data = 0;
            this.showCalendar();
            this.showWeekCalendar();
            if (this.opts.ifSwitch) {
                // 上月
                $(document).off('click', '.J_preMouth').on('click', '.J_preMouth', function () {
                    var _date = dateObj.getDate();

                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));

                    self.showCalendar();
                });
                // 下月
                $(document).off('click', '.J_netMouth').on('click', '.J_netMouth', function () {
                    var _date = dateObj.getDate();

                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));

                    self.showCalendar();
                });
                // 上周
                $(document).off('click', '.J_preweek').on('click', '.J_preweek', function () {
                    if (makInit == 'net') {
                        thisWeek--;
                    }
                    if (makInit == 0) {
                        thisWeek = init - 1;
                    }
                    makInit = 'pre';
                    if (thisWeek <= 1) {
                        $(this).addClass('J_preMouth');
                        $(this).removeClass('J_preweek');
                        $('.J_preMouth').click();
                        $(this).removeClass('J_preMouth');
                        $(this).addClass('J_preweek');
                    }
                    $('.J_numBox').hide();
                    $($('.J_numBox')[thisWeek - 1]).show();
                    thisWeek--;
                });
                // 下周
                $(document).off('click', '.J_netweek').on('click', '.J_netweek', function () {
                    if (makInit == 'pre') {
                        thisWeek++;
                    }
                    if (makInit == 0) {
                        thisWeek = init;
                    }
                    makInit = 'net';
                    if (thisWeek >= 6) {
                        $(this).addClass('J_netMouth');
                        $(this).removeClass('J_netweek');
                        $('.J_netMouth').click();
                        $(this).removeClass('J_netMouth');
                        $(this).addClass('J_netweek');
                    }
                    $('.J_numBox').hide();
                    $($('.J_numBox')[thisWeek]).show();
                    thisWeek++;
                });
                var ClickNum = 0;
                $('.conTile').on('click', function () {
                    var thisTitle = $(this);
                    ClickNum = ClickNum + 1;
                    var timer = setTimeout(function () {
                        if (ClickNum == 2) {
                            // 双击回到当前月
                            var _date = dateObj.getDate('back');
                            dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));
                            $('.J_netweek').addClass('J_netMouth').removeClass('J_netweek');
                            $('.J_preweek').addClass('J_preMouth').removeClass('J_preweek');
                            thisTitle.addClass('clicked');
                            self.showCalendar();
                            // self.showWeekCalendar();
                            console.log(thisWeek);
                        } else if (ClickNum == 1) {
                            // 单击显示当前月
                            if (thisTitle.hasClass('clicked')) {
                                $('.J_netMouth').addClass('J_netweek').removeClass('J_netMouth');
                                $('.J_preMouth').addClass('J_preweek').removeClass('J_preMouth');
                                thisTitle.removeClass('clicked');
                                self.showWeekCalendar();
                                console.log(thisWeek);
                            } else {
                                $('.J_netweek').addClass('J_netMouth').removeClass('J_netweek');
                                $('.J_preweek').addClass('J_preMouth').removeClass('J_preweek');
                                thisTitle.addClass('clicked');
                                $('.J_numBox').show();
                                self.showCalendar();
                                console.log(thisWeek);
                            }
                        }
                        ClickNum = 0;
                    }, 300);
                });
            }

            this.$calendarDate_item.hover(function () {
                self.showHoverInfo($(this));
            });

            this.$calendarDate_item.click(function () {
                var _dateStr = $(this).attr('data');
                var _date = changingStr(addMark(_dateStr));
                var $curClick = null;
                self.selected_data = $(this).attr('data');

                dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));
                self.opts.year = _date.getFullYear();
                self.opts.month = _date.getMonth();
                self.opts.day = _date.getDate();

                if ($(this).hasClass('select')) {
                    self.showCalendar();
                }

                $curClick = self.$calendar_body.find('[data=' + _dateStr + ']');
                if (!$curClick.find(".numDiv").hasClass('select')) {
                    self.$calendarDate_item.find(".numDiv").removeClass('select');

                    $curClick.find(".numDiv").addClass('select');
                }
                if (typeof self.opts.click == "function") {
                    self.opts.click(self.selected_data);
                }
            });
        },
        constructor: Calendar
    };

    $.fn.extend({
        defaultOptions: {

        },
        calendar: function (options) {
            var calendar = new Calendar(this, options);
            calendar.inital();
            this.defaultOptions = $.extend({}, this.defaultOptions, options)
            return this.each(function () {});
        },
        setDate: function (year, month, day) {
            this.defaultOptions.year = year;
            this.defaultOptions.month = month - 1;
            this.defaultOptions.day = day;
            var calendar = new Calendar(this, this.defaultOptions);
            calendar.inital();
            return this.each(function () {});
        }
    })


    // ========== 使用到的方法 ==========

    var dateObj = (function () {
        var _date = new Date();

        return {
            getDate: function (back) {
                if(back == 'back') {
                    _date = new Date();
                    return _date;
                } else {                        
                    return _date
                };
            },

            setDate: function (date) {
                _date = date;
            }
        }
    })();

    function returnDateStr(date) { // 日期转字符串
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = month <= 9 ? ('0' + month) : ('' + month);
        day = day <= 9 ? ('0' + day) : ('' + day);

        return year + month + day;
    };

    function changingStr(fDate) { // 字符串转日期
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    };

    function addMark(dateStr) { // 给传进来的日期字符串加-
        return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
    };

    // 条件1：年份必须要能被4整除
    // 条件2：年份不能是整百数
    // 条件3：年份是400的倍数
    function isLeapYear(year) { // 判断闰年
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }

})(jQuery);