/* hop.js; Deven Blake 2021; Public domain */

/* constants */
window.hop_DIGITS = 4;
window.hop_BOX_ID = "hop_box";
window.hop_FEEDBACK_ID = "hop_feedback";

window.hop_errorstr = "";

/* void window.hop_button_action(void) */
/* This is the main hop function. It gets the hop value and goes to it or
 * says why it can't. */
window.hop_button_action = function(){
	var hop_box_value;

	if((hop_box_value = hop_get_intended_value()) != -1)
		window.location.href = window.hop_url_from_position(hop_box_value);
	else
		document.getElementById(window.hop_FEEDBACK_ID).innerHTML = window.hop_errorstr;
};

/* int window.hop_get_intended_value(void) */
/* Returns a safe hop box value. If it can't, -1 is returned, and
 * window.hop_errorstr is set to a description of the user error. */
window.hop_get_intended_value = function(){
	var hop_box_value;

	if(isNaN(hop_box_value = parseInt(document.getElementById(window.hop_BOX_ID).value))){
		window.hop_errorstr =
			"'" + document.getElementById(window.hop_BOX_ID).value + "'"
			+ " is not a valid number."
		;
		return -1;
	}

	if(hop_box_value >= Math.pow(10, window.hop_DIGITS) || hop_box_value < 1){
		window.hop_errorstr =
			"There are no arson comics succeeding "
			+ (Math.pow(10, window.hop_DIGITS) - 1).toString()
			+ " or preceding 1."
		;
		return -1;
	}

	return hop_box_value;
};

/* String window.hop_url_from_position(int position); */
/* Returns the URL to which the user would want to navigate given the comic
 * number they'd like to see. Does no checking for proper values. */
window.hop_url_from_position = function(position){
	var i;
	var current_href;
	var current_protocol;
	var pre_octo;

	/* protocol://host/directory/page#item */
	current_protocol = window.location.href.split("//")[0];
	current_href = window.location.href.split("//")[1];

	pre_octo = ((position - (position % 10)) / 10).toString();
	while(pre_octo.length < window.hop_DIGITS - 1)
		pre_octo = "0" + pre_octo;

	/* If the URL ends with '/', remove the trailing '/' */
	if(current_href.charAt(current_href.length - 1) == '/')
		current_href = current_href.substring(0, current_href.length - 1);

	current_href = current_href.split('/');
	if(current_href.length > 1)
		current_href.pop();

	return current_protocol + "//"
		+ current_href.join('/') + "/"
		+ pre_octo + "#" + (position % 10).toString()
	;
};
