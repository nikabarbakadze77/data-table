export class Menu {
    constructor(menuElement) {
        this.menuElement = menuElement;
    }

    getNames(item, parent) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.url || '#';
        link.style.textDecoration = 'none';
        link.style.color = 'black'

        const iconPath = `/icons/${item.name.toLowerCase()}.png`;
        const icon = document.createElement('img');
        icon.alt = `${item.name} icon`;
        icon.style.width = '20px';
        icon.style.marginRight = '10px';

        fetch(iconPath)
            .then(response => {
                if (response.ok) {
                    icon.src = iconPath;
                } else {
                    console.error(`Icon not found: ${iconPath}`);
                }
                listItem.appendChild(icon);
            })
            .catch(error => console.error('Error fetching icon:', error));

        link.appendChild(document.createTextNode(item.name));
        listItem.appendChild(link);
        parent.appendChild(listItem);

        if (item.children && item.children.length > 0) {
            const childList = document.createElement('ul');
            childList.classList.add('nested');
            parent.appendChild(childList);

            item.children.forEach(child => this.getNames(child, childList));

            listItem.addEventListener('click', (e) => {
                e.stopPropagation();
                childList.classList.toggle('active');
            });
        }
    }

    init(data) {
        data.forEach(item => this.getNames(item, this.menuElement));
    }
}

const menuEl = document.querySelector('#menu');
const menu = new Menu(menuEl);

fetch('/data/menu.json')
    .then(res => res.json())
    .then(data => menu.init(data))
    .catch(error => console.error('Error fetching menu data:', error));



