function create_router() {
  /**
   * @type {{ pattern: RoutePattern, callback: (match: { params: {}; pathname: string;}) => void }[]}
   */
  const routes = [];

  const hooks = {
    before_navigate: noop,
    after_navigate: noop,
  };

  const history = create_history();
  const [location, set_location] = create_signal(history.location);

  function find_controller() {
    const current_location = location();

    for (const route of routes) {
      const matched = match_path(route.pattern, current_location.pathname);

      if (matched) {
        hooks.before_navigate();
        route.callback(matched);
        hooks.after_navigate();

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
    routes.push({ pattern: compile_path(path), callback });
  }

  function init() {
    history.init();
    history.listen(set_location);

    create_effect(find_controller);
  }

  function noop() {}

  return {
    init,
    add_route,

    hooks,

    get history() {
      return history;
    },
  };
}
