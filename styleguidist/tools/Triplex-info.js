class TriplexInfo {
  constructor() {
    // Список версий Triplex, найденных на вкладке.
    this.versions = [];
    this.palette = ['#59FC17', '#FF6925', '#141EDF', '#597D4A', 'red'];
  }

  init() {
    this.getVersions();

    if (this.versions.length) {
      this.addStyle();
      this.createTriplexInfoPanel();
    }
  }

  addStyle() {
    const style = document.createElement('style');
    style.innerHTML = this.versions.map((version, index) => {
      return `[data-tinfo="${version}"] {
        border: 1px solid ${this.palette[index]} !important;
      }
      [data-tinfo="${version}"]:hover {
        background: ${this.palette[index]};
      }
      `
    }).join('\n');
    document.head.appendChild(style);
  }

  createTriplexInfoPanel() {
    const div = document.createElement('div');
    div.setAttribute('id', 'triplex-info');
    const list = document.createElement('ul');
    list.classList.add('triplex-info-list');
    this.versions.forEach((version, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('triplex-info-list-item');
      const color = document.createElement('span');
      color.classList.add('triplex-info-list-item-color');
      color.style.backgroundColor = this.palette[index];

      const text = document.createElement('span');
      text.innerHTML = version;

      listItem.appendChild(color);
      listItem.appendChild(text);
      list.appendChild(listItem);
    })

    div.appendChild(list);
    document.body.appendChild(div);
  }

  getVersions() {
    const versions = new Set();
    const elementsWithTInfo = document.querySelectorAll(`[data-tinfo]`);
    elementsWithTInfo.forEach(element => {
      const version = element.getAttribute('data-tinfo');
      versions.add(version);
    });
    this.versions = Array.from(versions).sort();
  }

}

export const triplexInfo = new TriplexInfo();