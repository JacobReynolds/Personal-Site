var socket = io('https://void.jakereynolds.co');
var id = 0;

// Sends a chat message
function shout() {
	var message = $('#shout').val();
	message = message.substring(0, 300);
	// Prevent markup from being injected into the message
	// if there is a non-empty message and a socket connection
	if (message) {
        $('#shout').val('');
		// tell server to execute 'new message' and send along one parameter
		socket.emit('message', message);
	}
}

//When enter is pressed, shout!
$(".shout").keypress(function (e) {
	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		shout();
	}
});

socket.on('message', function (message) {
	if (message.toLowerCase()=='peek') {
		$('#mainPic').mouseenter();
		setTimeout(()=>{
			$('#mainPic').mouseleave();
		},2000)
	} else {
		thevoid(message);
	}
});

function thevoid(message) {
    message = cleanInput(message);
	$('.void').append('<div class="echo" id="' + id + '">' + message + '</div>');
	//Animation calculations
	var fromX = getRandom(0, $('.void').width());
	var fromY = getRandom(0, $('.void').height());
	var toX = getRandom(0, $('.void').width());
	var toY = getRandom(0, $('.void').height());
	var echo = $('#' + id);
	var fontSize = getFontSize(message);
	var echoWidth = getWidth($(echo).width());
	//We need to set these before calculating overflow, because they can change the height/width
	$(echo).css({
		maxWidth: echoWidth,
		'font-size': fontSize
	});
	//Don't let text go off screen
	var xOverflow = (toX + echoWidth) - $('.void').width();
	if (xOverflow > 0) {
		toX -= xOverflow;
	}
	//Don't let text go off screen
	var yOverflow = (toY + $(echo).height()) - $('.void').height();
	if (yOverflow > 0) {
		toY -= yOverflow;
	}

	//Animation sequence
	$(echo).css({
		top: fromY,
		left: fromX,
		'font-size': fontSize
	})
	$(echo).animate({
		top: toY,
		left: toX,
		opacity: 1
	}, 2000)

	//Get rid of it
	destroyEcho(echo);
	id++;
}

function destroyEcho(echo) {
	//Destroy the echo
	setTimeout(function () {
		$(echo).animate({
			opacity: 0
		}, 1500)
		setTimeout(function () {
			$(echo).remove();
		}, 1500)
	}, 2000)
}

function getWidth(width) {
	return getRandom(200, Math.min(width, 400));
}

function getFontSize(message) {
	if (message.length <= 24) {
		return 32;
	} else if (message.length <= 48) {
		return 26
	} else if (message.length <= 72) {
		return 24
	} else if (message.length <= 96) {
		return 20
	} else {
		return 16;
	}
}

// Prevents input from having injected markup
function cleanInput(input) {
	return $('<div/>').text(input).html();
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

socket.on('new user', function () {
	thevoid('Someone has joined, can you hear them?');
});

socket.emit('count');

socket.on('count',(count)=>{
	console.log('Count: ' + count);
	if (count===1) {
		$('#shout').attr('placeholder',`Say hello - You're the only online user`);
	} else {
		$('#shout').attr('placeholder',`Say hello - ${count} users online`);
	}
})

