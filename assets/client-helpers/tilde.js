{
	document.addEventListener('keyup', function({ keyCode }) {
		if (keyCode === 192) {
			const links = document.getElementById('strt-links');
			const current = links.style.display;

			if (current === 'none') {
				links.style.display = 'block';
			} else {
				links.style.display = 'none';
			}
		}
	});
}
