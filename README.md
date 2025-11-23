# 🏨 ReservaYa

Aplicación web fullstack para reservas de alojamientos. Permite a los usuarios explorar propiedades disponibles, gestionar favoritos, compartir en redes sociales, realizar búsquedas avanzadas con calendario de disponibilidad y efectuar reservas completas.

---

## ⚙️ Tecnologías

### Frontend
- React 18.3.1
- Vite 7.1.14
- React Router DOM 6.26.0
- Axios 1.12.2
- Date-fns 4.1.0
- React Date Range 2.0.1
- React Toastify 11.0.5
- Lucide React 0.553.0
- Bootstrap 2.0.0

### Backend
- Java 17
- Spring Boot 3.3.2
- Spring Data JPA
- Spring Security + JWT (jjwt 0.11.5)
- Spring Boot Mail
- Spring Boot Validation
- H2 Database (desarrollo)
- MySQL (producción - pendiente)
- Swagger/OpenAPI 2.5.0

---

## 🚀 Instalación local

### Requisitos previos
- Node.js 18+
- Java 17+
- Maven

### Clonar el repositorio
```bash
git clone https://github.com/AndresRosaas/reservaya.git
cd reservaya
```

---

### Backend
```bash
cd backend
```

#### Base de datos
No requiere configuración. Se usa H2 en memoria que se crea automáticamente.

**Datos de prueba:** El archivo `data.sql` en `src/main/resources/` carga automáticamente:
- 3 usuarios de prueba (ver sección de credenciales)
- 3 productos de ejemplo
- Categorías y características pre-cargadas

#### Ejecutar el backend

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

**Windows:**
```bash
mvnw.cmd spring-boot:run
```

> El backend estará disponible en `http://localhost:8080`

#### Acceso a H2 Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:reservayadb`
- Username: `sa`
- Password: `sa`

#### Swagger
Documentación de la API: `http://localhost:8080/swagger-ui/index.html`

---

### Frontend
```bash
cd frontend/reservaya-frontend
npm install
```

#### Variables de entorno
Crear archivo `.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

#### Ejecutar el frontend
```bash
npm run dev
```

> La aplicación estará disponible en `http://localhost:5173`

---

## 🔐 Credenciales de prueba

El sistema incluye usuarios pre-cargados para testing:

### Administrador
- **Email:** `admin@test.com`
- **Password:** `Admin123!`
- **Permisos:** Acceso total al panel de administración

### Usuarios regulares
- **Email:** `user@test.com`
- **Password:** `User123!`

- **Email:** `maria@test.com`
- **Password:** `Maria123!`

---

## 📬 Endpoints (API REST)

### Productos
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/productos` | Listado de productos (paginado) | ❌ |
| GET | `/api/productos/{id}` | Detalle de producto | ❌ |
| POST | `/api/productos` | Crear producto | ✅ Admin |
| PUT | `/api/productos/{id}` | Editar producto | ✅ Admin |
| DELETE | `/api/productos/{id}` | Eliminar producto | ✅ Admin |
| GET | `/api/productos/{id}/imagenes` | Galería de imágenes | ❌ |
| POST | `/api/productos/search` | Búsqueda avanzada con filtros | ❌ |
| GET | `/api/productos/{id}/availability` | Calendario de disponibilidad | ❌ |

### Categorías
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/categorias` | Listar categorías | ❌ |
| POST | `/api/categorias` | Crear categoría | ✅ Admin |
| PUT | `/api/categorias/{id}` | Editar categoría | ✅ Admin |
| DELETE | `/api/categorias/{id}` | Eliminar categoría | ✅ Admin |

### Características
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/features` | Listar características | ❌ |
| POST | `/api/features` | Crear característica | ✅ Admin |
| PUT | `/api/features/{id}` | Editar característica | ✅ Admin |
| DELETE | `/api/features/{id}` | Eliminar característica | ✅ Admin |

### Autenticación
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registro de usuario | ❌ |
| POST | `/api/auth/login` | Inicio de sesión | ❌ |
| POST | `/api/auth/logout` | Cerrar sesión | ✅ |
| GET | `/api/auth/profile` | Perfil del usuario | ✅ |

### Usuarios (Admin)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Listar usuarios | ✅ Admin |
| PUT | `/api/users/{id}/role` | Cambiar rol de usuario | ✅ Admin |

### Favoritos
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/{id}/favorites` | Listar favoritos del usuario | ✅ |
| POST | `/api/users/{id}/favorites/{productId}` | Agregar a favoritos | ✅ |
| DELETE | `/api/users/{id}/favorites/{productId}` | Quitar de favoritos | ✅ |

### Reseñas
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/productos/{id}/reviews` | Obtener reseñas de producto | ❌ |
| POST | `/api/productos/{id}/reviews` | Crear reseña | ✅ |
| DELETE | `/api/reviews/{id}` | Eliminar reseña | ✅ |

### Reservas (Sprint 4)
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/reservations` | Crear reserva | ✅ |
| GET | `/api/reservations/{id}` | Detalle de reserva | ✅ |
| GET | `/api/reservations/user/{userId}` | Historial del usuario | ✅ |
| DELETE | `/api/reservations/{id}` | Cancelar reserva | ✅ |

> Swagger Docs: `http://localhost:8080/swagger-ui/index.html`

---

## 🗂️ Base de datos

### Sprint 1-4 - Desarrollo
- H2 en memoria
- Se crea automáticamente al iniciar
- `spring.jpa.hibernate.ddl-auto=create-drop`
- Datos de prueba se cargan desde `data.sql`

### Producción (pendiente)
- MySQL
- Se configurará en próximos sprints

---

## 📧 Configuración de Email (Opcional)

Para habilitar el envío de emails de confirmación de registro y reservas, configurar en `application.properties`:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=tu-email@gmail.com
spring.mail.password=tu-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> **Nota:** Requiere configurar una contraseña de aplicación en Gmail

---

## 🧪 Testing

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend/reservaya-frontend
npm test
```

> **Sprints 1-4:** Los tests fueron ejecutados manualmente y todas las funcionalidades están operativas.

---

## ✨ Funcionalidades Sprint 1

### Usuario
- ✅ Header con logo y navegación
- ✅ Visualización de productos en home (máximo 10 aleatorios)
- ✅ Detalle de producto
- ✅ Galería de imágenes responsive
- ✅ Footer
- ✅ Paginación de productos

### Administrador
- ✅ Panel de administración
- ✅ Agregar productos
- ✅ Listar productos
- ✅ Eliminar productos

---

## ✨ Funcionalidades Sprint 2

### Autenticación y Usuarios
- ✅ Registro de usuario con validaciones
- ✅ Inicio de sesión (JWT)
- ✅ Cierre de sesión
- ✅ Visualización de perfil (avatar con iniciales)
- ✅ Gestión de roles (Admin/User)
- ✅ Email de confirmación de registro *(opcional)*

### Categorías
- ✅ Crear categorías
- ✅ Editar categorías
- ✅ Eliminar categorías
- ✅ Asignar categorías a productos
- ✅ Filtrar productos por categoría

### Características de Productos
- ✅ Crear características (nombre + ícono)
- ✅ Editar características
- ✅ Eliminar características
- ✅ Asignar múltiples características a productos
- ✅ Visualizar características en detalle de producto

### Administración
- ✅ Listar usuarios registrados
- ✅ Cambiar roles de usuario (Admin/User)
- ✅ Panel de administración de características
- ✅ Panel de administración de categorías

---

## ✨ Funcionalidades Sprint 3

### Búsqueda y Disponibilidad
- ✅ Búsqueda avanzada por fecha con calendario doble (US#22)
- ✅ Autocompletado y sugerencias de búsqueda
- ✅ Filtros por categoría
- ✅ Visualización de disponibilidad en calendario (US#23)
- ✅ Indicadores visuales de fechas disponibles y ocupadas
- ✅ Manejo de errores en búsqueda y disponibilidad

### Sistema de Favoritos
- ✅ Marcar/desmarcar productos como favoritos (US#24)
- ✅ Página de favoritos personalizados (US#25)
- ✅ Sincronización en tiempo real
- ✅ Persistencia de favoritos por usuario
- ✅ Actualizaciones optimistas en la UI

### Compartir en Redes Sociales
- ✅ Modal de compartir productos (US#27)
- ✅ Integración con Facebook, Twitter y WhatsApp
- ✅ Mensaje personalizable
- ✅ Copiar enlace directo al portapapeles
- ✅ Preview del producto con imagen y descripción
- ✅ Diseño responsive

### Políticas y Gestión
- ✅ Visualización de políticas del producto (US#26)
- ✅ Políticas organizadas por categorías
- ✅ Eliminación de categorías con confirmación (US#29)
- ✅ Validación de productos asociados antes de eliminar

### Sistema de Reseñas
- ✅ Puntuar productos con sistema de estrellas (US#28)
- ✅ Escribir comentarios detallados
- ✅ Visualizar reseñas de otros usuarios
- ✅ Promedio de puntuación en tiempo real
- ✅ Solo usuarios autenticados pueden reseñar

### Mejoras Técnicas
- ✅ Persistencia de sesión con localStorage
- ✅ Interceptores de Axios para autenticación automática
- ✅ Manejo centralizado de errores
- ✅ Notificaciones toast para feedback al usuario
- ✅ Optimistic UI updates en favoritos

---

## ✨ Funcionalidades Sprint 4

### Sistema de Reservas
- ✅ Selección de fechas con calendario doble (US#30)
- ✅ Validación de usuario logueado antes de reservar
- ✅ Página de confirmación con resumen completo (US#31)
- ✅ Visualización de producto, fechas, noches y precio total
- ✅ Datos del usuario en la reserva
- ✅ Crear reserva con validaciones de disponibilidad (US#32)
- ✅ Cálculo automático de precio total
- ✅ Validación de fechas solapadas
- ✅ Validación de fechas pasadas

### Historial de Reservas
- ✅ Acceso a historial desde perfil de usuario (US#33)
- ✅ Lista de reservas con estado (Confirmada, Cancelada, Pendiente, Completada)
- ✅ Navegación al producto desde la reserva
- ✅ Cancelación de reservas con confirmación modal
- ✅ Banner "Faltan X días para tu viaje" en Mis Datos

### Comunicación
- ✅ Botón flotante de WhatsApp (US#34)
- ✅ Apertura directa a chat con mensaje predefinido
- ✅ Email de confirmación de reserva (US#35)
- ✅ Detalles de reserva en el correo

### Páginas Informativas
- ✅ Página de Términos y Condiciones
- ✅ Página de Política de Privacidad
- ✅ Página de Contacto

### Mejoras de UX
- ✅ Redirección post-login a página de origen
- ✅ Estados visuales de reservas con badges de colores
- ✅ Modal de confirmación para cancelar reservas
- ✅ Notificaciones toast para feedback al usuario

---

## 👤 Autor

**AndresRosaas**
- GitHub: [@AndresRosaas](https://github.com/AndresRosaas)

---

## 📝 Notas de desarrollo

- El proyecto utiliza H2 en modo `create-drop`, los datos se reinician al cerrar la aplicación
- JWT expira en 24 horas (configurable en el backend)
- Las contraseñas se almacenan hasheadas con BCrypt
- CORS está configurado para permitir requests desde `http://localhost:5173`
- La sesión de usuario se persiste en localStorage para mantenerla al recargar la página
- Los favoritos son únicos por usuario y se sincronizan automáticamente entre pestañas
- Las reservas validan automáticamente disponibilidad y fechas antes de confirmarse
- El email de confirmación de reserva incluye todos los detalles de la reserva

---

## 📄 Licencia

MIT