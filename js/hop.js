/* hop.js; Deven Blake 2021; Public domain */

window.hop_button_stuff = function(){
	var hop_box_value;
	if(isNaN(hop_box_value = parseInt(document.getElementById("hop_box").value)))
		/* not valid value */
		document.getElementById("hop_feedback").innerHTML =
			"'" + document.getElementById("hop_box").value + "'"
			+ " is not a valid number."
		;
	else if(hop_box_value > 9999 || hop_box_value < 1)
		/* too high */
		document.getElementById("hop_feedback").innerHTML =
			"There are no arson comics succeeding 9999 or preceding 1."
		;
	else
		window.hop_to_position(hop_box_value);
};

window.hop_to_position = function(position){
	var i;
	var current_href;
	var pre_hash;
	var post_hash;

	current_href = window.location.href;
	post_hash = (position % 10).toString();

	pre_hash = ((position - (position % 10)) / 10).toString();
	while(pre_hash.length < 3)
		pre_hash = "0" + pre_hash;

	/* If the URL ends with '/', remove the trailing '/' */
	if(current_href.charAt(current_href.length - 1) == '/')
		/* This was my original method: */
		/* current_href = Array.from(current_href).reverse().slice(1).reverse().join(''); */
		/* This is much easier: */
		current_href = current_href.substring(0, current_href.length - 1);

	window.location.href = window.location.href.split('/').pop().join('/') + "/" + pre_hash + "#" + post_hash;
};
