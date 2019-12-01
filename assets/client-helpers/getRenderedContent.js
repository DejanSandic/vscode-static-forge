{
	window.getRenderedContent = function(html) {
		var content = new DOMParser().parseFromString(html, 'text/html');
		var renderTarget = document.createElement('div');
		renderTarget.style.display = 'none';

		while (content.activeElement.childNodes.length > 0) {
			if (!content.activeElement.firstElementChild) break;
			renderTarget.appendChild(content.activeElement.firstElementChild);
		}

		document.body.appendChild(renderTarget);
		var rendered = renderTarget.innerHTML;
		document.body.removeChild(renderTarget);
		return rendered;
	};
}
