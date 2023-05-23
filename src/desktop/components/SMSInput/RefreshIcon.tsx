import * as React from 'react';

const iconPath =
    'M18.1 9.101a.9.9 0 0 0-.9.9 7.245 7.245 0 1 1-1.998-4.95h-2.16a.9.9 0 1 0 0 1.8h4.077a.9.9 0 0 0 .9-.9v-4.05a.9.9 0 0 0-1.8 0v1.593A9 9 0 1 0 19 10.001a.9.9 0 0 0-.9-.9z';

/**
 * Внешние свойства компонента.
 * @prop {number} percent Процент заполнения иконки (выражается в долях единицы от 0 до 1).
 */
interface IProps {
    percent: number;
}

const radInOneDeg = Math.PI / 180; // Радиан в одном градусе.
const radiansInCircle = Math.PI * 2; // Радиан в окружности.
// Перевод градусов в радианы.
const deg2rad = (deg: number) => {
    deg = deg % 360; // У круга только 360 градусов.
    deg = deg < 0 ? 360 + deg : deg; // Отрицательный угол равносилен положительному получаемому прибавлением отрицательного угла к 360;
    return deg * radInOneDeg; // Ну и под конец нормализованный угол переводим в радианы.
};
const startAnge = deg2rad(-8); // Угол, с которого начинается отрисовка сектора - маски (иконка не строго горизонтально начинается, а на 8 градусов выше).
const endAngle = deg2rad(-22); // Угол, которым заканчивается отрисовка сектора - маски (выше горизонтали на 22 градуса).
const diff = endAngle < startAnge ? radiansInCircle - (startAnge - endAngle) : endAngle - startAnge; // Разница между углами в радианах.
const ra2X = (r: number, a: number) => Math.round(r * Math.cos(a) * 1000) / 1000; // По радиусу и углу определяем координату X.
const ra2Y = (r: number, a: number) => Math.round(r * Math.sin(a) * 1000) / 1000; // По радиусу и углу определяем координату Y.

/**
 * Рисует сектор средствами svg-path, начиная с правой горизонтали и далее по часовой стрелке в зависимости от процентажа (0.99 - Практически полный круг).
 *
 * @param {number} centerX Координата X центра окружности.
 * @param {number} centerY Координата Y центра окружности.
 * @param {number} radius Радиус окружности.
 * @param {number} percent На сколько процентов от окружности рисовать сектор.
 */
const calculateSectorPath = (centerX: number, centerY: number, radius: number, percent: number) =>
    'M' +
    centerX +
    ' ' +
    centerY + // Смещаем перо в центр окружности.
    'L' +
    // Рисуем горизонтальную линию вправо в начало сектора.
    (centerX + ra2X(radius, startAnge)) + // Координата X начала дуги.
    ' ' +
    (centerY + ra2Y(radius, startAnge)) + // Координата Y начала дуги.
    'A' + // Рисуем дугу.
    radius + // Радиус окружности дуги по оси X.
    ' ' +
    radius + // Радиус окружности дуги по оси Y.
    ' 0 ' + // Смещение центра по оси X.
    (percent > 0.5 ? '1' : '0') + // Флаг отрисовки длинной дуги (если 0 то короткой).
    ' 1 ' + // Рисовать по часовой стрелке.
    (centerX + ra2X(radius, (startAnge + percent * diff) % radiansInCircle)) + // Координата X конца дуги.
    ' ' +
    (centerY + ra2Y(radius, (startAnge + percent * diff) % radiansInCircle)) + // Координата Y конца дуги.
    'Z'; // Замыкаем линию.

/** Компонент для радиальной закраски иконки другим цветом. */
export const RefreshIcon: React.FC<IProps> = (props: IProps) => {
    const percent = Math.round(Math.min(props.percent, 0.999) * 1000) / 1000;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" focusable="false">
            <clipPath id={`clipFront${percent}`}>
                <path d={calculateSectorPath(10, 10, 12, percent)} />
            </clipPath>
            <path className="cssClass[light]" d={iconPath} />
            <path className="cssClass[dark]" d={iconPath} clipPath={`url(#clipFront${percent})`} />
        </svg>
    );
};
