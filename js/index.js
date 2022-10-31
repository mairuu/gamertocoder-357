(() => {
  const router = create_router();
  const [minigames, set_minigames] = create_signal(null);

  fetch('https://gamertocoder.garena.co.th/api/minigames')
    .then((res) => res.json())
    .then(set_minigames);

  // home
  router.add_route('/', () => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__home_page({ minigames }));
  });

  // minigames
  router.add_route('/minigames/', () => {
    document.getElementById('main').textContent = '';

    document.getElementById('main').append(__minigames_page({ minigames }));
  });

  // mingame
  router.add_route('/minigame/:no', (location) => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__minigame_page({ minigames, location }));
  });

  // about... why?
  router.add_route('/about', () => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__about_page({}));
  });

  // default route
  router.add_route('*', () => {
    document.getElementById('main').textContent = 'unknown path ;c;';
  });

  router.hooks.after_navigate = restore_scroll;

  function restore_scroll() {
    window.scrollTo({ top: 0 });
  }

  setTimeout(() => router.init());
})();
