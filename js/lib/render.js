/**
 *
 * @param {TemplateStringsArray | string} src
 * @returns
 */
function template(src) {
  const tmpl = document.createElement('template');
  tmpl.innerHTML = src.raw || src;

  return tmpl.content.firstChild;
}

/**
 *
 * @param {Node} node
 * @returns {HTMLElement}
 */
function clone_template(node) {
  return node.cloneNode(true);
}

/**
 *
 * @param {string} href
 */
function inject_css(href) {
  const link = document.createElement('link');
  link.href = href;
  link.type = 'text/css';
  link.rel = 'stylesheet';

  document.head.append(link);
}
