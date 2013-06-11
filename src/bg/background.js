var Podio = function(){
    var that = {};

    function loadOptions(){
    	var time_update = localStorage["time_update"];
    	that.options = {
    		time_update : ((time_update) ? time_update : 5),
    		color_notification_number : "#57D121"
    	};
    }
	

	function getNumberAlerts(){
		$.get('https://podio.com/stream', function(data){
			pattern = /<title>(.*?)<\/title>/;
			matches = data.match(pattern);
			if(matches.length <= 0){
				return false;
			}
			title = matches[1].match(/\(([^)]*)\)/);
			if(title.length > -1){
				setNumberNotificationIcon(title[1]);
			}
		});
	}

	function showNotification(){
		var notify = webkitNotifications.createNotification(
				"../../icons/podio_48.png",
				"Podio Notifications",
				"You have new notifications"
			);
		notify.show();
	}

	function updateCounterNotifications(q, showNotifications){
		var actualCounter = localStorage["numActualNotifications"];
		if(actualCounter == undefined || actualCounter < q){
			if(showNotifications == true){
				showNotification();
			}
		}
		// update localstorage counter
		localStorage["numActualNotifications"] = q;
	}

	function setNumberNotificationIcon(q){
		chrome.browserAction.setBadgeBackgroundColor({color: that.options.color_notification_number});
		chrome.browserAction.setBadgeText({text: q});
		updateCounterNotifications(q);
		
	}

	

	function update(){
		getNumberAlerts();
	}

	function init(){
		loadOptions();
		update();
		return that;
	}

	that.init = init;
	that.update = update;
	return init();
};

var podio = new Podio();
podio.update();
window.setInterval(function(){
	podio.update();
}, 1000 * 60 * podio.options.time_update);
