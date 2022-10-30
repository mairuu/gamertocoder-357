function create_router() {
  /**
   * @type {{ path: string, callback: (match: { params: {}; pathname: string;}) => void }[]}
   */
  const routes = [];

  const history = create_history();
  const [location, set_location] = create_signal(history.location);

  function find_controller() {
    const current_location = location();

    for (const route of routes) {
      const matched = match_path(route.path, create_path(current_location));

      if (matched) {
        route.callback(matched);
        return;
      }
    }
  }

  /**
   *
   * @param {string} path
   * @param {(match: { params: Record<string, string>; pathname: string;}) => void} callback
   */
  function add_route(path, callback) {
    routes.push({ path, callback });
  }

  function init() {
    history.init();
    history.listen(set_location);

    create_effect(find_controller);
  }

  return {
    init,
    add_route,

    get history() {
      return history;
    },
  };
}
