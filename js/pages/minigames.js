(() => {
  const __tmpl__section2 = template //
  `<section style="background-color: #0a0c13; padding-top: 4rem; padding-bottom: 4rem">
      <div class="container">
        <h3 style="font-size: 2rem">มินิเกมส์</h3>
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

    if (props.header) {
      el.querySelector('h3').textContent = props.header;
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
