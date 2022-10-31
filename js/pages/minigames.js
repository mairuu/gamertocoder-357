(() => {
  function MinigamesPage(props) {
    const el__minigames_heading = document.createElement('h3');
    el__minigames_heading.textContent = 'มินิเกมส์';
    el__minigames_heading.style.setProperty('font-size', '1.75rem');

    const minigames = __comp__minigames({ ...props, header: [el__minigames_heading] });

    const breadcrumb = __comp__breadcrub({
      links: () => [
        { label: 'Home', href: '#/' },
        { label: 'Minigames', href: '#/minigames', active: true },
      ],
    });

    el__minigames_heading.parentElement.parentElement.insertBefore(
      breadcrumb,
      el__minigames_heading.parentElement
    );

    return minigames;
  }

  window.__minigames_page = MinigamesPage;
})();
