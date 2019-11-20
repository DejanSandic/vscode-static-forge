{
	socket.emit('client-loaded', window.location.pathname);

	socket.on('update', function(options) {
		const type = options.type;
		const name = options.name;

		const static = [ 'sass', 'head', 'script' ].includes(type);
		const me = type === 'page' && window.location.pathname === name;
		const myComponent = type === 'component' && name in registeredComponents;

		if (static || me || myComponent) window.location.reload();
	});

	socket.on('redirect', function(path) {
		window.location.assign(window.location.origin + path);
	});
}
