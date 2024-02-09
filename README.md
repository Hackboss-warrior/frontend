[![React](https://img.shields.io/badge/react-V18.2.0-blue)](https://es.react.dev/)
[![TsParticles](https://img.shields.io/badge/tsParticles-V3.1.0-green)](https://particles.js.org/)
[![Axios](https://img.shields.io/badge/axios-V1.6.5-red)](https://axios-http.com/es/docs/intro)
[![JwtDecode](https://img.shields.io/badge/jwtdecode-V4.0.0-yellow)](https://www.npmjs.com/package/jwt-decode)
[![ReactDom](https://img.shields.io/badge/reactdom-V18.2.0-purple)](https://es.legacy.reactjs.org/docs/react-dom.html)
[![ReactIcons](https://img.shields.io/badge/reacticons-V5.0.1-orange)](https://www.npmjs.com/package/react-icons)
[![ReactRouterDom](https://img.shields.io/badge/reactrouterdom-V6.21.2-white)](https://reactrouter.com/en/main/start/tutorial)
[![Toastify](https://img.shields.io/badge/reacttoastify-V10.0.4-aquamarine)](https://www.npmjs.com/package/react-toastify)
[![UUID](https://img.shields.io/badge/uuid-V9.0.1-brown)](https://www.npmjs.com/package/uuid)
[![typesreact](https://img.shields.io/badge/typesreact-V18.2.43-pink)](https://www.npmjs.com/package/@types/react)
[![typesreactdom](https://img.shields.io/badge/typesreactdom-V18.2.17-pink)](https://www.npmjs.com/package/@types/react-dom)
[![VITE](https://img.shields.io/badge/vite-V5.0.8-yellow)](https://vitejs.dev/)
[![esLint](https://img.shields.io/badge/eslint-V8.55.0-red)](https://eslint.org/)

# fakNews Front-end

En este proyecto hemos desarrollado el front-end que junto con el backend realizado anteriormente conforman la app fakNews. Esta es una red social similar a twitter o reddit, en la que el usuario puede compartir sus noticias, valorar positiva o negativamente noticias de otros usuarios, etc.

Para su desarrollo hemos empleado las siguientes dependencias:

## Dependencias

### De npm: @tsparticles/react , @tsparticles/slim. Dependencia estética.

Una biblioteca basada en tsParticles; JavaScript de código abierto que permite crear y animar partículas de forma programática, y proporciona una interfaz de React para su integración sencilla en proyectos de React.

### De npm: axios: Dependencia con la que reducimos y simplificamos el fetch.

Axios es una biblioteca de JavaScript que se utiliza para realizar solicitudes HTTP desde el navegador o desde Node.js. Es una herramienta ampliamente utilizada y popular debido a su facilidad de uso y su capacidad para manejar diversas tareas relacionadas con solicitudes HTTP, como hacer peticiones GET, POST, PUT, DELETE, etc. Axios proporciona una interfaz simple y consistente para interactuar con servicios web y APIs, permitiendo a los desarrolladores realizar solicitudes y manejar las respuestas de manera sencilla, ya sea con promesas o mediante el uso de async/await en JavaScript moderno.

### De https://jwt.io/ | jwt-decode: Núcleo de nuestro sistema de autenticación para la navegación:

JSON Web Token (JWT) es un estándar abierto ( RFC 7519 ) que define una forma compacta y autónoma de transmitir información de forma segura entre partes como un objeto JSON. Esta información se puede verificar y confiar porque está firmada digitalmente. Los JWT se pueden firmar usando un secreto (con el algoritmo HMAC ) o un par de claves pública/privada usando RSA o ECDSA .

### De https://es.react.dev/ | react: Dependencia principal del proyecto.

Crea interfaces de usuario a partir de componentes
React te permite construir interfaces de usuario a partir de piezas individuales llamadas componentes. Crea tus propios componentes de React y luego los combina para formar pantallas, páginas y aplicaciones.

### De https://es.react.dev/ | react-dom:

React-dom proporciona las herramientas necesarias para integrar y manipular componentes de React en el DOM de una página web.  
Es una biblioteca de JavaScript que proporciona métodos específicos para la manipulación del DOM (Modelo de Objetos del Documento) en aplicaciones web desarrolladas con React. Esta biblioteca es una parte fundamental de la infraestructura de React y se utiliza para renderizar los componentes de React en el navegador web.

### De https://react-icons.github.io/react-icons/icons/ai/ | react-Icons:

React Icons como su nombre indica es una biblioteca que facilita la utilización de iconos en un proyecto de react

### De https://reactrouter.com/en/main | react-router-dom:

React Router habilita el "enrutamiento del lado del cliente".
El enrutamiento del lado del cliente permite que su aplicación actualice la URL al hacer clic en un enlace sin realizar otra solicitud de otro documento desde el servidor. En cambio, su aplicación puede representar inmediatamente una nueva interfaz de usuario y realizar solicitudes de datos “fetch” para actualizar la página con nueva información.

### De npm | react-toastify:

Toastify es una biblioteca que nos permite generar notificaciones en nuestra web de manera predefinida.

### De npm | UUID:

UUID es una biblioteca en JavaScript que se utiliza para generar Identificadores Únicos Universales . Un UUID es un valor de 128 bits que se utiliza para identificar de manera única información en un sistema. En nuestro proyecto hemos utilizado la Versión 4 (UUID-V4).

## Dependencias de desarrollo (devDependencies)

### De npm | @types/react y types/react-dom:

Herramientas esenciales para desarrolladores que trabajan con React y TypeScript, ya que mejoran la experiencia de desarrollo al proporcionar tipos estáticos precisos y útiles para las bibliotecas React. y react DOM respectivamente.
Otras ventajas de estas herramientas son: detección de errores, ayuda con el autocompletado, facilita la refactorización y mantenimiento del código.

### De https://vitejs.dev/ | VITE:

Es una herramienta moderna y potente para el desarrollo de aplicaciones web que ofrece un entorno de desarrollo rápido y eficiente, así como optimizaciones de producción para un rendimiento óptimo en el navegador.

### De npm | vitejs/plugin-react:

Es un complemento que facilita el desarrollo y producción de aplicaciones React utilizando Vite al proporcionar configuraciones y optimizaciones específicas para proyectos basados en React, lo que permite a los desarrolladores aprovechar al máximo las características de ambas herramientas con un soporte nativo para JSX.

### De npm | ESLint:

Es una herramienta de búsqueda de errores para JavaScript. Su función principal es analizar el código JavaScript en busca de patrones que puedan llevar a errores, identificar prácticas no recomendadas o mejorar la legibilidad y consistencia del código. ESLint permite configurar reglas personalizadas o utilizar conjuntos de reglas predefinidos, y puede integrarse fácilmente en flujos de trabajo de desarrollo como parte de un proceso de construcción o en editores de código para proporcionar retroalimentación instantánea a los desarrolladores.

## Recorrido por la aplicación

Para explicar el funcionamiento de la app “fakNews” en profundidad vamos a aprovechar los diferentes roles que puede adoptar un usuario al ingresar a ella. Estos son:

### Usuario no registrado.

En un primer momento cualquier usuario pertenece a este grupo. Como usuario no registrado puedes consultar las últimas noticias publicadas.

En la “home” de la aplicación cualquier usuario puede visualizar las noticias ordenadas por fecha de publicación. Además, puede acceder a la página individual de cada una de ellas en la ruta “/post/númerodepost” para consultar también los comentarios asociados a ella. Desde la página inicial, el usuario también puede utilizar el botón de búsqueda para realizar un filtrado de las publicaciones, tanto por su título como por el tema o tag asociado al post que se pretende encontrar.

Los usuarios que todavía no se hayan registrado también pueden acceder a las páginas de “About” y “Contacto”, en la primera se explica de manera sarcástica la historia de la plataforma y su creación, además de tener unos contadores que ofrecen datos que pueden ser relevantes para el usuario y animarlo a realizar un registro para ser parte de nuestra comunidad.

Por último los usuarios no registrados pueden obtener su rol de “user” completando el formulario de registro y accediendo a la plataforma a través del “Login”.

### Usuario con rol "user".

En esta categoría englobamos a los usuarios que ya han realizado el proceso de registro y se han autenticado en la aplicación, lo que les otorga el denominado rol de “user”. Estos además de poder realizar todas las acciones mencionadas para el usuario no registrado puede llevar a cabo muchas otras.

Lo primero que podemos destacar de acciones relacionadas con este rol de usuario, es que puede crear nuevas publicaciones. Accediendo a la página “/createpost” la persona en cuestión puede crear una noticia nueva completando los diferentes campos necesarios para que esta sea publicada. Por otra parte, cuando el usuario está logueado se descubre una nueva página en el menú lateral, Favoritos.

En este apartado el usuario puede guardar las noticias que le hayan gustado simplemente pulsando en el botón con una estrella situado en la parte superior derecha de cualquiera de las noticias. Esta funcionalidad es muy útil ya que gracias a esta se pueden almacenar las noticias que más interés han despertado en la persona o incluso algunas que puede preferir leer con más detenimiento en otro momento. Desde el propio apartado de favoritos podrás quitarle el rol de favorito a una noticia, pero esta no desaparecerá inmediatamente, ya que inspirándonos en otras aplicaciones del estilo creemos que es mucho más útil para el usuario que una noticia que le ha interesado se mantenga a la vista hasta realizar una nueva navegación.

En cuanto a funcionalidades, el rol de “user” otorga a la persona un abanico mucho más amplio de opciones, posibilitando lo siguiente:

- **Valorar positivamente o negativamente una noticia:** ya sea una noticia propia o de otro usuario, la persona que está usando la aplicación podrá enviar un voto negativo o positivo de la misma. Justo en el margen inferior de la imagen principal de cualquier publicación se aprecian dos flechas mediante las cuáles el usuario puede llevar a cabo la valoración. El número que aparece es el contador de votos, a través del cuál se puede saber si una noticia está siendo valorada de manera positiva o negativa.

- **Contador de comentarios:** a la derecha de los botones de valoración encontramos un contador de comentarios, en él se almacena el número de comentarios que una publicación ha ido recibiendo. Este además de tener una función meramente informativa, actúa como botón redirigiendo al usuario a la página de detalle de la publicación donde podrá realizar los comentarios que considere pertinentes. También se ha incluido la funcionalidad de eliminar tus propios comentarios por si se diese el caso de que fuese necesario.

- **Editar la publicación creada:** en el caso de ser los creadores de una publicación podremos ver dos botones que aparecen en el margen derecho de la misma. El primero de ellos es el botón de editar la publicación, a través del cuál y mediante una petición de tipo “patch” al backend el usuario podrá modificar cualquiera de los datos de la noticia aunque esta ya haya sido publicada.

- **Eliminar una publicación:** el segundo de los botones mencionados en el apartado anterior es el de eliminar una noticia publicada. Solo los propietarios de sus noticias tendrán acceso a este botón para evitar que un usuario pueda eliminar publicaciones creadas por otros. Para hacer desaparecer un “post” solo debes clicar en este botón y confirmar que quieres eliminar esta publicación.

- **Visualización y edición del perfil de usuario:** en la ruta “/profile” el usuario podrá tanto visualizar los datos de su perfil de usuario, como editarlos y modificarlos, rellenando el formulario de la parte inferior, incluyendo en él solo los aspectos a modificar.

### Usuario con rol de "admin".

Gracias al rol de administrador, este tipo de usuarios pueden realizar además de todas las acciones mencionadas anteriormente las siguientes:

- **Gestión de usuarios:** en la ruta “/users” el administrador podrá visualizar todos los datos de los diferentes usuarios de la página, además de poder borrar tanto sus perfiles como todas sus interacciones con la aplicación. Este rol es importante a nivel de gestión, ya que es el encargado de evitar comportamientos indeseados por parte de otros usuarios de la aplicación.

- **Gestión de roles de usuario:** a pesar de que el primer rol de administrador se deberá otorgar de manera manual en la base de datos, este puede otorgar privilegios de administrador a otros usuarios gracias a la tabla interactiva contenido en la ruta “/admin”.
