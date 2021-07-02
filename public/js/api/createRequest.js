'use strict'
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url;
    let formData = null;
    xhr.responseType = 'json';

    if (options.method === 'GET' && options.data) {
        // Формируем url для GET-запроса (перебираем все свойства объекта options.data и записываем в переменную url)
        url += '?';
        for (let name in options.data) {
            url += `${name}=${options.data[name]}&`;
        }
        url = url.substr(0, url.length - 1); // Удаляем последний символ строки (&)
    } else if (options.data) {
        // Создаём объект formData и записываем в него все свойства объекта options.data
        formData = new FormData();
        for (let name in options.data) {
            formData.append(name, options.data[name]);
        }
    }

    // Открываем соединение в соотствествии с методом и отправляем на сервер сформированные данные.
    // В случае возникновения ошибки, передаём её в функцию callback, находящуюся в объекте options:
    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (err) {
        options.callback(err);
    }

    // В случае успешного выполнения кода вызываем функцию callback, находящуюся в объекте options:
    xhr.onload = () => options.callback(null, xhr.response);
};