{
	// Emit current page to the extension
	socket.emit('client-loaded', window.location.pathname, registeredComponents);

	// Reload the browser when some of the dependencies have been changed
	socket.on('update', function(options) {
		const type = options.type;
		const name = options.name;

		const static = [ 'sass', 'head', 'script' ].includes(type);
		const me = type === 'page' && window.location.pathname === name;
		const myComponent = type === 'component' && name in registeredComponents;

		if (static || me || myComponent) window.location.reload();
	});

	// Redirect the browser to the provided path
	socket.on('redirect', function(path) {
		window.location.assign(window.location.origin + path);
	});
}
