{
	socket.on('update', function({ type, name }) {
		const static = [ 'sass', 'head', 'script' ].includes(type);
		const me = type === 'page' && window.location.pathname === name;
		const myComponent = type === 'component' && name in registeredComponents;

		if (static || me || myComponent) window.location.reload();
	});
}
