{
	var socket = window._forge.socket;
	var registeredComponents = window._forge.registeredComponents;

	// Emit current page to the extension
	socket.emit('client-loaded', window.location.pathname, registeredComponents);

	// Reload the browser when some of the dependencies have been changed
	socket.on('update', function(options) {
		var type = options.type;
		var name = options.name;

		var pageUpdated = type === 'page';
		var sassUpdated = type === 'sass';
		var headUpdated = type === 'head';
		var scriptUpdated = type === 'script';
		var componentUpdated = type === 'component';

		// Check is one of the static files changed
		var static = sassUpdated || headUpdated || scriptUpdated;

		// Check is this page changed
		var me = pageUpdated && window.location.pathname === name;

		// Check is one of the registered components changed
		var myComponent = componentUpdated && name in registeredComponents;

		if (static || me || myComponent) window.location.reload();

		// If changed page is not on the list, add it to the page list
		if (pageUpdated && !me) {
			var exists = false;
			var pages = window._forge.pages;

			pages.forEach(function(page) {
				if (page === name) exists = true;
			});

			if (!exists && window._forge && window._forge.addLink) {
				pages.push(name);
				window._forge.addLink(name);
			}
		}
	});

	// Redirect the browser to the provided path
	socket.on('redirect', function(path) {
		window.location.assign(window.location.origin + path);
	});
}
