{
	document.addEventListener('keyup', function(event) {
		var keyCode = event.keyCode;

		if (keyCode === 192) {
			const links = document.getElementById('rbsk-links');

			if (links) {
				const current = links.style.display;

				if (current === 'none') {
					links.style.display = 'block';
				} else {
					links.style.display = 'none';
				}
			}
		}
	});
}
