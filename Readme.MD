## Service Discovery

### Описание
Проект "Service Discovery" представляет собой сервис, разработанный для обнаружения и регистрации служб в распределенной среде. Этот сервис позволяет службам регистрироваться, обновлять свой статус и удаляться из реестра. Кроме того, он выполняет периодическую проверку состояния зарегистрированных служб.

### Установка и настройка
1. Клонируйте репозиторий: `git clone <URL репозитория>`
2. Перейдите в директорию проекта: `cd Service discovery`
3. Установите зависимости: `npm install`


### Использование
- **Регистрация службы:** Службы могут зарегистрироваться, отправив POST-запрос на `/api/register` с указанием своего хоста и порта.
- **Получение списка зарегистрированных служб:** Выполните GET-запрос на `/api/list`, чтобы получить список всех зарегистрированных служб.
- **Проверка состояния служб:** Сервис периодически проверяет состояние зарегистрированных служб и обновляет их статус.

### Пример использования
```bash
# Запустите сервис
node server.js

# В новых терминалах (неограниченное количество) запустите создание экземпляров нод

node nodeCluster.js [количество экземпляров] [порт с которого начинаем]

# В файле data.json вы получите информацию о последних рабочих экземпляров нод
```
**Зависимости:**
- **Express.js:** Фреймворк для создания веб-приложений на Node.js.
- **Axios:** Библиотека для выполнения HTTP-запросов из Node.js.

**Структура проекта:**
- **server.js:** Основной файл, содержащий логику сервиса обнаружения служб.
- **data.json:** Файл для хранения информации о зарегистрированных службах.
- **package.json:** Файл, описывающий зависимости и скрипты проекта.

**Дополнительная информация:**
- Для запуска сервиса необходимо установить Node.js.
- По умолчанию сервис слушает порт 3000.
