/**
 * @typedef {Set<Subscriber>} Dependency
 *
 * @typedef Subscriber
 * @type {object}
 * @property {() => void} execute
 * @property {Set<Dependency>} dependencies
 */

/** @type {Subscriber[]} */
const singal_context = [];

/**
 *
 * @template T
 * @param {T} value
 * @returns {[() => T, (value: T) => void]}
 */
function create_signal(value) {
  /** @type {Dependency} */
  const subscriptions = new Set();

  function read() {
    const running = singal_context[singal_context.length - 1];

    if (running) {
      subscriptions.add(running);
      running.dependencies.add(subscriptions);
    }

    return value;
  }

  function write(next_value) {
    value = next_value;

    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  }

  return [read, write];
}

function cleanup(running) {
  for (const dep of running.dependencies) {
    dep.delete(running);
  }
  running.dependencies.clear();
}

function create_effect(fn) {
  function execute() {
    cleanup(running);
    singal_context.push(running);

    try {
      fn();
    } finally {
      singal_context.pop();
    }
  }

  const running = {
    execute,
    dependencies: new Set(),
  };

  execute();
}

/**
 * @template T
 * @param {() => T} fn
 * @returns {T}
 */
function create_memo(fn) {
  const [value, set] = create_signal();
  create_effect(() => set(fn()));
  return value;
}
