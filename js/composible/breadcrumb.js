(() => {
  function Breadcrumb(props) {
    const root = document.createElement('nav');

    const el__ordered_list = document.createElement('ol');
    root.append(el__ordered_list);

    el__ordered_list.className = 'breadcrumb';

    create_effect(() => {
      el__ordered_list.textContent = '';

      props.links().forEach(({ href, label, active }) => {
        const el__list_item = document.createElement('li');
        el__list_item.className = 'breadcrumb__item';
        el__list_item.classList.toggle('breadcrumb__item--active', active);

        if (active) {
          el__list_item.textContent = label;
        } else {
          const el__link = document.createElement('a');
          el__list_item.append(el__link);

          el__link.href = href;
          el__link.textContent = label;
        }

        el__ordered_list.append(el__list_item);
      });
    });

    return root;
  }

  window.__comp__breadcrub = Breadcrumb;
})();
