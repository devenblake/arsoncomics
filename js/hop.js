/* hop.js; Deven Blake 2021; Public domain */

window.hop_DIGITS = 4;

window.hop_button_action = function(){
	var hop_box_value;

	if((hop_box_value = hop_get_intended_value()) != -1)
		window.location.href = window.hop_url_from_position(hop_box_value);
};

window.hop_get_intended_value = function(){
	var hop_box_value;

	if(isNaN(hop_box_value = parseInt(document.getElementById("hop_box").value)))
		/* not valid value */
		document.getElementById("hop_feedback").innerHTML =
			"'" + document.getElementById("hop_box").value + "'"
			+ " is not a valid number."
		;
	else if(hop_box_value >= Math.pow(10, window.hop_DIGITS) || hop_box_value < 1)
		/* out of bounds */
		document.getElementById("hop_feedback").innerHTML =
			"There are no arson comics succeeding "
			+ (Math.pow(10, window.hop_DIGITS) - 1).toString()
			+ " or preceding 1."
	else
		return hop_box_value;
	return -1;
};

window.hop_url_from_position = function(position){
	var i;
	var current_href;
	var hop_destination;
	var pre_hash;
	var post_hash;

	current_href = window.location.href;

	pre_hash = ((position - (position % 10)) / 10).toString();
	while(pre_hash.length < window.hop_DIGITS - 1)
		pre_hash = "0" + pre_hash;

	/* If the URL ends with '/', remove the trailing '/' */
	if(current_href.charAt(current_href.length - 1) == '/')
		current_href = current_href.substring(0, current_href.length - 1);

/* 'website/000' */
	hop_destination = current_href.split('/');
/* 'website', '000' */
	hop_destination.pop();
/* 'website' */
	return hop_destination.join('/')
/* 'website' */
		+ "/" + pre_hash + "#" + (position % 10).toString()
/* 'website/000#1' */
	;
};
