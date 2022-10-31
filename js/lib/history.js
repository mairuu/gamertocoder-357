/**
 * @typedef Path
 * @type {object}
 * @property {string} pathname
 * @property {string} search
 * @property {string} hash
 *
 * @typedef To
 * @type {Path | string}
 *
 * @typedef RoutePattern
 * @type {[RegExp, string[]]}
 */

/**
 *
 * @param {string} path
 * @return {RoutePattern}
 */
function compile_path(path) {
  /** @type {string[]} */
  const param_names = [];

  let regexp_source =
    '^' +
    path
      .replace(/\/*\*?$/, '')
      .replace(/^\/*/, '/')
      .replace(/[\\.*+^$?{}|()[\]]/g, '\\$&')
      .replace(/:(\w+)/g, (_, name) => {
        param_names.push(name);
        return '([^\\/]+)';
      });

  if (path.endsWith('*')) {
    param_names.push('*');
    regexp_source += path === '*' || path === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$';
  } else if (true) {
    regexp_source += '\\/*$';
  }

  return [new RegExp(regexp_source), param_names];
}

/**
 *
 * @param {string | RoutePattern} pattern
 * @param {string} pathname
 *
 * @returns {{ params: Record<string, string>; pathname: string;} | null} */
function match_path(pattern, pathname) {
  const [matcher, param_names] = typeof pattern === 'string' ? compile_path(pattern) : pattern;
  const match = pathname.match(matcher);

  if (!match) return null;

  const matched_pathname = match[0];
  const capture_groups = match.slice(1);

  const params = param_names.reduce((intl, param_name, i) => {
    intl[param_name] = capture_groups[i] || '';
    return intl;
  }, {});

  return { params, pathname: matched_pathname };
}

/**
 *
 * @param {Partial<Path>} param0
 * @returns
 */
function create_path({ pathname = '/', search = '', hash = '' }) {
  if (search && search !== '?') {
    pathname += search[0] === '?' ? search : '?' + search;
  }

  if (hash && hash !== '#') {
    pathname += hash[0] === '#' ? hash : '#' + hash;
  }

  return pathname;
}

/**
 *
 * @param {string} path
 * @returns {Partial<Path>}
 */
function parse_path(path) {
  /**
   * @type {Partial<Path>}
   */
  let parsed_path = {};

  if (path) {
    let hash_index = path.indexOf('#');
    if (hash_index >= 0) {
      parsed_path.hash = path.substr(hash_index);
      path = path.substr(0, hash_index);
    }

    let search_index = path.indexOf('?');
    if (search_index >= 0) {
      parsed_path.search = path.substr(search_index);
      path = path.substr(0, search_index);
    }

    if (path) {
      parsed_path.pathname = path;
    }
  }

  return parsed_path;
}

function create_history() {
  /**
   * @type {((location: Path) => void)[]}
   */
  const listeners = [];
  let location = get_location();

  /**
   *
   * @returns {Path}
   */
  function get_location() {
    const { hash = '', pathname = '/', search = '' } = parse_path(window.location.hash.slice(1));
    return { hash, pathname, search };
  }

  /**
   *
   * @param {To} to
   * @returns
   */
  function create_href(to) {
    return '#' + (typeof to === 'string' ? to : create_path(to));
  }

  /**
   *
   * @param {To} to
   */
  function push(to) {
    const url = create_href(to);
    window.history.pushState(null, null, url);

    location = get_location();
    listeners.forEach((func) => func(location));
  }

  /**
   *
   * @param {(location: Path) => void} callback
   * @returns
   */
  function listen(callback) {
    listeners.push(callback);

    return () => {
      listeners.splice(listeners.indexOf(callback), 1);
    };
  }

  function handle_onpopstate() {
    location = get_location();
    listeners.forEach((func) => func(location));
  }

  function init() {
    window.addEventListener('popstate', handle_onpopstate);
  }

  function shutdown() {
    window.removeEventListener('popstate', handle_onpopstate);
  }

  return {
    push,
    listen,
    init,
    shutdown,
    create_href,
    /**
     * @returns {Path}
     */
    get location() {
      return location;
    },
  };
}
