'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import toggleImage from './modules/toggleImage';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('2020, 9, 22');
// меню
toggleMenu();
//popup
togglePopup();
// табы
tabs();
// слайдер
slider();
//Блок с картинками Наша Команда
toggleImage();
// калькулятор
calc(100);
//send-ajax-form
sendForm();
