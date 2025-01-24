# Proyecto de Gestión de Categorías y Productos

Este proyecto es una aplicación web para la gestión de categorías y productos. Permite crear, editar y eliminar categorías y productos, así como visualizar la lista de ambos.

## Requisitos

- PHP >= 7.3
- Composer
- Laravel >= 8.x
- MySQL o cualquier otra base de datos compatible con Laravel

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:
Una vez que hayas clonado el repositorio, dirígete a la carpeta clonada y abre una terminal con la dirección de la carpeta del proyecto.
Verífica que se tenga instalado composer usando el comando:
- composer --version
En caso de que no esté instalado, composer dirígete a esta dirección:
- https://getcomposer.org/download/
Una vez instalado, composer dirígete a la carpeta backend-api que se encuentra en el repositorio usando la terminal con el siguiente comando:
- cd backend-api

Procede a instalar las Dependencias de PHP:
- composer install

## Configurar el Archivo .env
Dentro de la carpeta backend-api copia el archivo .env.example a .env y configura tus credenciales de base de datos y otras variables de entorno necesarias.
- cp .env.example .env
Edita el archivo .env y configura las siguientes variables:
- DB_CONNECTION=mysql
- DB_HOST=127.0.0.1
- DB_PORT=3306
- DB_DATABASE=init
- DB_USERNAME=root
- DB_PASSWORD=

## Generar la Clave de la Aplicación
Una vez finalizada la configuración del .env dirígete a la terminal y utiliza el siguiente comando para generar una nueva clave en el proyecto de Laravel:
- php artisan key:generate


## Migrar y Seedear la Base de Datos
La base de dato se encuentra alojada en la carpeta DATABASE en la raíz del proyecto. También se pueden ocupar migraciones de Laravel con seeders de ejemplo.
Para correr las migraciones, se tiene que correr el siguiente comando dentro de la terminal en la carpeta backend-api:
- php artisan migrate --seed

## Ejecutar el Servidor de Desarrollo
Para ejecutar el servidor de desarrollo en un puerto específico que es el 8000, usa el siguiente comando en la terminal dentro de la carpeta backend-api:
- php artisan serve --port=8000
La aplicación estará disponible en http://localhost:8000.

## Abrir aplicacion FrontEnd
Una vez que el servidor virtual de Laravel con el puerto 8000, este activo dirígete a la raíz del proyecto y abre la carpeta frontend-api.
Una vez dentro de la carpeta frontend-api abre el archivo index.html usando el navegador de tu preferencia.
