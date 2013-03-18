function Ajax(){
  var xmlHttp;
   try{	
	xmlHttp=new XMLHttpRequest();// Firefox, Opera 8.0+, Safari
   }
   catch (e){
	try{
		xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
	}
	catch (e){
		try{
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e){
			alert("No AJAX!?");
			return false;
	 	}
	}
   }
	
   xmlHttp.onreadystatechange=function(){
   	document.getElementById('_msgAreaText').load('http://localhost:8080/');
   	setTimeout('Ajax()',5);
   }
}

window.onload=function(){
 setTimeout('Ajax()',5);
}