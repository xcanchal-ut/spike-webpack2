
function renderText() {
    const title = document.createElement('h1');
    const subtitle = document.createElement('p');
    const titleText = document.createTextNode('Webpack 2');
    const subtitleText = document.createTextNode('Module bundler for your application assets');
    title.appendChild(titleText);
    subtitle.appendChild(subtitleText);
    const mainDiv = document.getElementById('main');
    mainDiv.appendChild(title);
    mainDiv.appendChild(subtitle);
}

const homeController = {
    renderText,
};

export default homeController;
