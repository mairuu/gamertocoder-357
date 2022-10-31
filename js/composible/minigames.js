(() => {
  const __tmpl__section2 = template //
  `<section class="minigames__section" style="background-color: #161939;">
    <div class="container">
      <div class="minigames__header"></div>
      <div class="minigames__container"></div>
    </div>
  </section>`;

  const __tmpl__minigame_entry = template //
  `<a class="minigame__card">
    <div class="minigame__card--backdrop"></div>
    <div class="minigame__card--icon"></div>
    <div class="minigame__card__content">
      <span class="minigame__card__content--name"></span>
      <span class="minigame__card__content--genre"></span>
    </div>
  </a>`;

  const __tmpl__wave = template //
  `<svg id="visual" viewBox="0 0 960 80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 54L32 51.3C64 48.7 128 43.3 192 37.3C256 31.3 320 24.7 384 26.7C448 28.7 512 39.3 576 46.7C640 54 704 58 768 53.3C832 48.7 896 35.3 928 28.7L960 22L960 81L928 81C896 81 832 81 768 81C704 81 640 81 576 81C512 81 448 81 384 81C320 81 256 81 192 81C128 81 64 81 32 81L0 81Z" fill="#05060b" stroke-linecap="round" stroke-linejoin="miter"></path></svg>`;

  /**
   *
   * @param {{ minigame: MinigameEntry}} props
   * @returns
   */
  function MinigameItem(props) {
    const el = clone_template(__tmpl__minigame_entry);

    el.href = `#/minigame/${props.minigame.no}`;

    el.style.setProperty('--icon-url', `url('${props.minigame.icon}')`);
    el.querySelector('span.minigame__card__content--name').textContent = props.minigame.name;
    el.querySelector('span.minigame__card__content--genre').textContent =
      props.minigame.genre.join(',  ');

    return el;
  }

  /**
   * @typedef MinigameEntry
   * @type {object}
   * @property {number} no
   * @property {string} name
   * @property {string} icon
   * @property {string[]} genre
   * @property {string[] | null} images
   * @property {string} description
   *
   * @param {{ minigames: () => MinigameEntry[] | null }} props
   */
  function Minigames(props) {
    const el__sec0 = clone_template(__tmpl__section2);

    const el__minigames_container = el__sec0.querySelector('div.minigames__container');
    const el__minigames_header = el__sec0.querySelector('div.minigames__header');

    const el__top_wave = clone_template(__tmpl__wave);
    el__top_wave.style.setProperty('transform', 'rotate(180deg)');
    el__top_wave.style.setProperty('position', 'absolute');
    el__top_wave.style.setProperty('top', '0');

    const el__bot_wave = clone_template(__tmpl__wave);
    el__bot_wave.style.setProperty('position', 'absolute');
    el__bot_wave.style.setProperty('bottom', '0');

    el__sec0.insertBefore(el__top_wave, el__sec0.firstChild);
    el__sec0.append(el__bot_wave);

    if (props.header) {
      el__minigames_header.append(...props.header);
    }

    create_effect(() => {
      const minigames = props.minigames();

      if (!minigames) return;

      el__minigames_container.textContent = '';
      minigames.forEach((minigame) => {
        const el = MinigameItem({ minigame });

        el__minigames_container.append(el);
      });
    });

    const fragments = document.createDocumentFragment();
    fragments.append(el__sec0);

    return fragments;
  }

  window.__comp__minigames = Minigames;
})();
