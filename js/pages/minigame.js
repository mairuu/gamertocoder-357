(() => {
  const __tmpl__sec0 = template //
  `<div class="container">
    <div class="hilight--backdrop"></div>
    <h1 class="hilight--game-name"></h1>

    <div class="hilight">
      <div class="hiilght__decs">
      
        <div class="hilight__icon"><img alt="" /></div>
        <p class="hilight--info"></p>

        <div class="hilight--genres"></div>
      </div>

      <div class="hiilght__gall">
        <div class="hilight__preview"></div>
        <div class="hilight__preview--items"></div>
      </div>
    </div>
  </div>`;

  function HilightPreviewItem(props) {
    const el = document.createElement('div');

    el.onclick = () => {
      props.set_preview_image_url(props.image_url);
      el.scrollIntoView();
    };

    el.className = 'hilight__preview--item';
    el.style.setProperty('--image-url', `url('${props.image_url}')`);

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
   * @param {{ minigames: () => MinigameEntry[] | null, location: { params: Record<string, string>; pathname: string;} | null }} props
   */
  function MinigamePage(props) {
    const el = clone_template(__tmpl__sec0);

    const [preview_image_url, set_preview_image_url] = create_signal('');

    const el__game_name = el.querySelector('.hilight--game-name');
    const el__icon_img = el.querySelector('.hilight__icon > img');
    const el__info = el.querySelector('p.hilight--info');
    const el__genres = el.querySelector('.hilight--genres');
    const el__preview = el.querySelector('.hilight__preview');
    const el__preview__select = el.querySelector('.hilight__preview--items');

    create_effect(() => {
      el__preview.style.setProperty('--image-url', `url('${preview_image_url()}')`);
    });

    create_effect(() => {
      const minigames = props.minigames();
      const minigame_no = props.location.params.no;

      const minigame = minigames?.find((e) => e.no === parseInt(minigame_no));

      if (!minigame) return;
      set_preview_image_url(minigame.images?.[0]);

      el__game_name.textContent = minigame.name;
      el__icon_img.src = minigame.icon;
      el__info.textContent = minigame.description;

      minigame.genre.forEach((genre) => {
        const el__pill = document.createElement('span');
        el__pill.className = 'hilight--genre';
        el__pill.textContent = genre;

        el__genres.append(el__pill);
      });

      el__preview__select.textContent = '';
      minigame.images?.forEach((image_url) => {
        const el = HilightPreviewItem({ image_url, set_preview_image_url });

        create_effect(() => {
          el.classList.toggle('selected', preview_image_url() === image_url);
        });

        el__preview__select.append(el);
      });
    });

    return el;
  }

  window.__minigame_page = MinigamePage;
})();
