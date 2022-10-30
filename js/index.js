const __app_ctx = (() => {
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

  router.add_route('/minigame/', () => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__minigames_page({ minigames }));
  });

  // mingame
  router.add_route('/minigame/:no', (location) => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__minigame_page({ minigames, location }));
  });

  // default route
  router.add_route('*', () => {
    document.getElementById('main').textContent = 'unknown path ;c;';
  });

  const APP_CONTEXT = {};
  APP_CONTEXT.ROUTER = router;

  setTimeout(() => {
    router.init();
  });

  return APP_CONTEXT;
})();
