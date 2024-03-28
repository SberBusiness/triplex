# Тесты

## Функциональные и снапшот тесты

Тесты находятся в папке `__tests__`, рядом с файлом тестируемого кода.

## Скриншот тесты

Тесты находятся в папке `tests/screenshot` в корне проекта.

### Итерационные скриншот тесты

-   В папке `tests/screenshot/iteration-tests/__tests__` находятся итерационные скриншот тесты, они сравнивают новое состояние компонента с состоянием предыдущей итерации разработки.
-   Запускаются на каждом PR. Скрипт джобы - `jenkins/run-srceenshot-tests.groovy`. Jenkins - http://sbtatlas.sigma.sbrf.ru/jenkinsint/job/UFS/job/pr_check-sbbol-web-library/.
-   Локальный запуск тестов:
    -   `npm run styleguidist` - сборка сервера Styleguidist;
    -   `docker run --rm -p 58002:58002 registry.sigma.sbrf.ru/dev/ci00149046/ci00405008_sbbol-dev/screenshot-testing:1.2.0` - запуск сервиса скриншотного тестирования, будет доступен на http://localhost:58002/.
    -   `npm run test:screenshot` - запуск тестов.
-   Эталонные изображения сохраняются в папку `tests/screenshot/iteration-tests/images`.
-   Результатом теста является Allure report, он находится в папке `tests/out/screenshot/allure`. Чтобы локально посмотреть отчет нужно установить Allure - https://docs.qameta.io/allure/#_installing_a_commandline, выполнить команду `cd {Путь к склонированному репозиторию @sberbusiness/triplex}/tests/out/screenshot/allure && allure generate --clean && cd allure-report && python -m SimpleHTTPServer 8000` и зайти на `http://localhost:8000`.
