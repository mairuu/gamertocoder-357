(() => {
  const __tmpl__section2 = template //
  `<section class="main-section" style="background-color: #161939;">
      <div class="container">
        <div class="minigame--header"></div>
        <div class="minigames"></div>
      </div>
    </section>`;

  const __tmpl__minigame_entry = template //
  `<a class="minigame">
      <div class="minigame__backdrop"></div>
      <div class="minigame__icon"></div>
      <div class="minigame__content">
        <span class="minigame--name"></span>
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

    el.href = __app_ctx.ROUTER.history.create_href({ pathname: `/minigame/${props.minigame.no}` });

    el.style.setProperty('--icon-url', `url('${props.minigame.icon}')`);
    el.querySelector('span.minigame--name').textContent = props.minigame.name;

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
  function MinigamesPage(props) {
    const el = clone_template(__tmpl__section2);

    const el__minigame_container = el.querySelector('div.minigames');

    const el__top_wave = clone_template(__tmpl__wave);
    el__top_wave.style.setProperty('transform', 'rotate(180deg)');
    el__top_wave.style.setProperty('position', 'absolute');
    el__top_wave.style.setProperty('top', '0');

    const el__bot_wave = clone_template(__tmpl__wave);
    el__bot_wave.style.setProperty('position', 'absolute');
    el__bot_wave.style.setProperty('bottom', '0');

    el.insertBefore(el__top_wave, el.firstChild);
    el.append(el__bot_wave);

    if (props.header) {
      el.querySelector('div.minigame--header').append(...props.header);
    }

    create_effect(() => {
      const minigames = props.minigames();

      if (!minigames) return;

      el__minigame_container.textContent = '';
      minigames.forEach((minigame) => {
        const el = MinigameItem({ minigame });

        el__minigame_container.append(el);
      });
    });

    return el;
  }

  window.__minigames_page = MinigamesPage;
})();
