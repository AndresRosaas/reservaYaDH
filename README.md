# 🏨 ReservaYa

Aplicación web fullstack para reservas de alojamientos. Permite a los usuarios explorar propiedades disponibles, ver detalles con galerías de imágenes, y a los administradores gestionar el catálogo de forma sencilla.

---

## ⚙️ Tecnologías

### Frontend
- React 18.3.1
- Vite 7.1.14
- React Router DOM 6.26
- Axios 1.12.2
- Bootstrap 2.0

### Backend
- Java 17
- Spring Boot 3.3.2
- Spring Data JPA
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
git clone https://github.com/tu-usuario/reservaya.git
cd reservaya
```

---

### Backend
```bash
cd backend
```

#### Base de datos
No requiere configuración. Se usa H2 en memoria que se crea automáticamente.

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
cd frontend
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

## 📬 Endpoints (API REST)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/productos` | Listado de productos (paginado) | ❌ |
| GET | `/api/productos/{id}` | Detalle de producto | ❌ |
| POST | `/api/productos` | Crear producto | ❌ |
| DELETE | `/api/productos/{id}` | Eliminar producto | ❌ |
| GET | `/api/productos/{id}/imagenes` | Galería de imágenes | ❌ |

> Swagger Docs: `http://localhost:8080/swagger-ui/index.html`

---

## 🗂️ Base de datos

### Sprint 1 - Desarrollo
- H2 en memoria
- Se crea automáticamente al iniciar
- `spring.jpa.hibernate.ddl-auto=create-drop`
- No persiste datos entre reinicios

### Producción (pendiente)
- MySQL
- Se configurará en próximos sprints

---

## 🧪 Testing

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend
npm test
```

---

## ✨ Funcionalidades Sprint 1

- Header con logo y navegación
- Visualización de productos en home (máximo 10 aleatorios)
- Detalle de producto
- Galería de imágenes responsive
- Footer
- Panel de administración
- Agregar productos
- Eliminar productos
- Paginación de productos

---

## 👤 Autor

AndresRosaas