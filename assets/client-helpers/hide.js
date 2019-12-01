{
	var targets = document.getElementsByClassName('rbsk');

	while (targets.length > 0) {
		var target = targets[0];
		target.parentNode.removeChild(target);
	}
}
