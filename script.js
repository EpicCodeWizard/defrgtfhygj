/*

Name    : Responsive HTML5 Chat

Responsive HTML5 Chat helps you to create useful chatbox on your website easly. 
You can change skin and sizes. You can read the installation and support documentation 
before you begin. If you do not find the answer, do not hesitate to send a message to me.

Owner   : Vatanay Ozbeyli
Web     : www.vatanay.com
Support : hi@vatanay.com

*/

function responsiveChat(element) {
    $(element).html('<form class="chat"><span></span><div class="messages"></div><input type="text" placeholder="Your message" tabindex="0" style="border-radius: 50px;"><input type="submit" value="Send"></form>');

    function showLatestMessage(element) {
      $('.responsive-html5-chat').find('.messages').scrollTop($('.responsive-html5-chat .messages')[0].scrollHeight);
    }
    showLatestMessage(element);

    $(element + ' input[type="text"]').keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $(element + ' input[type="submit"]').click();
        }
    });
    $(element + ' input[type="submit"]').click(function (event) {
        event.preventDefault();
        var message = $(element + ' input[type="text"]').val();
        if ($(element + ' input[type="text"]').val()) {
            var d = new Date();
            var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var currentDate =
                (("" + day).length < 2 ? "0" : "") +
                day +
                "." +
                (("" + month).length < 2 ? "0" : "") +
                month +
                "." +
                d.getFullYear() +
                "&nbsp;&nbsp;" +
                clock;
            sendme("Me", getdate(), message);
            setTimeout(function () {
                $(element + ' > span').addClass("spinner");
            }, 100);
            setTimeout(function () {
                $(element + ' > span').removeClass("spinner");
            }, 2000);
        }
        $(element + ' input[type="text"]').val("");
        showLatestMessage(element);
    });
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function responsiveChatPush(element, sender, origin, date, message) {
    var dauuid = uuidv4();
    var originClass;
    if (origin == 'me') {
        originClass = 'myMessage';
    } else {
        originClass = 'fromThem';
    }
    $(element + ' .messages').append('<div class="message"><div class="' + originClass + '" id="' + dauuid + '"><p>' + message + '</p><date><b>' + sender + '</b> ' + date + '</date></div></div>');
    return dauuid;
}

responsiveChat('.responsive-html5-chat');

function sendyou(name, date, message) {
  return responsiveChatPush('.chat', name, 'you', date, message);
}

async function readAllChunks(readableStream, dauuid) {
  const reader = readableStream.getReader();
  var daelement = document.getElementById(dauuid);
  let done, value;
  while (!done) {
    ({ value, done } = await reader.read());
    if (done) {
      return [];
    }
    daelement.innerText += new TextDecoder().decode(value);
  }
}

async function mainfunconrun(question, convo_id) {
  let formData = new FormData();
  formData.append('message', question);
  formData.append('convoId', window.convo_id);
  const response = await fetch("https://flash-backend.epiccodewizard2.repl.co/chat", {method: 'post', body: formData});
  var dauuid = sendyou("Bot", getdate(), "Answering...");
  await readAllChunks(response.body, dauuid);
}

function setGreenChatColor() {
  document.body.style.setProperty("--message-background-color", "#00e34d");
}
function setBlueChatColor() {
  document.body.style.setProperty("--message-background-color", "#4fa0ff");
}

function getdate() {
  var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "pm" : "am";
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return curHour + ":" + curMinute + " " + curMeridiem + " " + mm + '/' + dd + '/' + yyyy;
}

// setGreenChatColor();
setBlueChatColor();

/* DEMO */
if (parent == top) {
  $("a.article").show();
}

function validateUUID(text) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(text);
}

function sendme(name, date, message) {
  window.responsiveChatPush('.chat', name, 'me', date, message)
  window.mainfunconrun(question, convo_id)
}
