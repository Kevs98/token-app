# Token App

Este proyecto fue creado como una prueba para SonarQ.

## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-proyecto.git
   ```

2. Instala las dependencias del proyecto usando npm:

   ```bash
   cd nombre-del-proyecto
   npm install
   ```

3. Inicia la aplicación:

   ```bash
   npm run start
   ```

   La aplicación estará disponible en `http://localhost:3005` por defecto.
   si se desea probar los endpoint por medio de Swagger este esta disponible por defecto en `http://localhost:3005/api`

## Uso

1. Usar el endpoint para crear un usuario en el que se solicitan los parametros necesarios.
2. Usar el endpoint logion para obtener un token de acceso.
3. Si el token se vencio osea que pasaron los 30 minutos usar el endpoint refresh token el cual solicita el antiguo token para renovarlo, cabe mencionar que si el token no esta vencido igual puede refrescarse y el antiguo token pasa a ser parte de la blacklist
4. usar el endpoint private-content para acceder al string que solo esta disponible con un token valido.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

## Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme a través de mi dirección de correo electrónico: kevinpalma657@gmail.com.

