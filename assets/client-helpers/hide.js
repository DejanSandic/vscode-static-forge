{
	const targets = document.getElementsByClassName('rbsk');

	for (let i = 0; i < targets.length; i++) {
		const target = targets[i];
		target.parentNode.removeChild(target);
	}
}
