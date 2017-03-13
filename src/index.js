import homeController from './home-module/home-controller';
import './main.scss';

document.addEventListener('DOMContentLoaded', function () {
    homeController.renderText();
}, false);