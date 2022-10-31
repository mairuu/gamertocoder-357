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

    // Todo: Implement hash linking appropriately
    setTimeout(() => {
      if (window.location.hash.includes('platform')) {
        document.getElementById('platforms').scrollIntoView();
      }
    });
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

  router.add_route('/about', () => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__about_page({}));
  });

  router.add_route('/privacy', () => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__privacy_page({}));
  });

  router.add_route('/terms', () => {
    document.getElementById('main').textContent = '';
    document.getElementById('main').append(__terms_page({}));
  });

  // default route
  router.add_route('*', () => {
    document.getElementById('main').textContent = 'unknown path ;c;';
  });

  router.hooks.after_navigate = after_navigate;

  let first_render = true;
  function after_navigate() {
    if (first_render) {
      first_render = false;
      return;
    }

    window.scrollTo({ top: 0 });
  }

  setTimeout(() => router.init());
})();
