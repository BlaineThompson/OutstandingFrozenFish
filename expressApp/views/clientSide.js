exports.talkToServer = talktoserver();

function newXMLHttpRequest() {
	var xmlreq = false;
	if (window.XMLHttpRequest) {
		xmlreq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
    		// Try ActiveX
		try { 
			xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e1) { 
			// first method failed 
			console.log("oops");
			try {
				xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				 // both methods failed
				console.log("not again"); 
			} 
		}
 	}
   	return xmlreq;
} 

function getReadyStateHandler(req, responseXmlHandler) {
	return function () {
	if (req.readyState == 4) {
		if (req.status == 200) {
        		responseXmlHandler(req.responseXML);
		} 
    	}
 	}
}

function talktoServer(){
	var req = newXMLHttpRequest();
	//register the callback handler function
  	var callbackHandler = getReadyStateHandler(req, updateMsgOnBrowser);
  	req.onreadystatechange = callbackHandler;
  	req.open("POST", "servertime.php", true);
  	//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  	//get the value from the text input element and send it to server
  	var testmsg = document.getElementById("_msgSubmit");
  	var msg_value = testmsg.value;
	console.log(msg_value);
  	req.send("msg="+msg_value);
}

// This is the callback functions that gets called
// for the response from the server with the XML data

var lastPing = 0;
function updateMsgOnBrowser(testXML) {

	var test = testXML.getElementsByTagName("test")[0];
	var message = testXML.getElementsByTagName("message")[0];
	var ip = testXML.getElementsByTagName("ip")[0];

	var timestamp = test.getAttribute("timestamp");
	if (timestamp > lastPing) {
		lastPing = timestamp;

		var ip_value = ip.firstChild.nodeValue;
		var message_value = message.firstChild.nodeValue;

		var msg_display = document.getElementById("msg_display");
		msg_display.innerHTML = " Server got the  message: \"" + 
			message_value + "\"" +
			"<br>Server IP: "+ ip_value + 
			" Server Timestamp: \""+ timestamp + "\"" ;
	}
}