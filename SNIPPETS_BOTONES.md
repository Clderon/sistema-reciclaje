# 🎨 Snippets de Código - Botones del Sistema

## Botón 1: Botón Principal con Gradiente Verde

### HTML
```html
<button class="button button--primary">
  <span class="button__text">Enviar Mi Reciclaje</span>
  <span class="button__vines"></span>
</button>
```

### CSS
```css
/* ========================================
   COMPONENTE: Button (BEM)
   Block: .button
   Elements: .button__text, .button__vines
   Modifiers: .button--primary, .button--secondary
======================================== */

/* Block: Button base */
.button {
  font-family: "Roboto", sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  padding: 1.8rem 2rem;
  width: 25rem;
  height: 6rem;
  border-radius: 1.5rem;
  border: 3.5px solid var(--colorTextBorde);
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Element: Texto del botón */
.button__text {
  position: relative;
  z-index: 3;
  color: var(--colorTextWhite);
}

/* Element: Lianas decorativas */
.button__vines {
  position: absolute;
  top: -1.4rem;
  left: 0;
  right: -0.4rem;
  bottom: -0.3rem;
  width: 100%;
  background-image: url(../img/upscalemedia-transformed.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 2;
}

/* Modifier: Primary (verde con gradiente) */
.button--primary {
  background: linear-gradient(
    to bottom,
    var(--colorButtonDegradado) 0%,
    var(--colorButton) 100%
  );
  color: var(--colorTextWhite);
  box-shadow: inset 0 2px 4px var(--shadowLight),
    inset 0 -2px 4px var(--shadowDarkStrong);
}

.button--primary:hover {
  transform: scale(1.02);
  box-shadow: inset 0 2px 4px var(--shadowLight),
    inset 0 -2px 4px var(--shadowDarkStrong), 
    0 4px 12px var(--shadowDarkExtra);
}

.button--primary:active {
  transform: scale(0.98);
}

/* Modifier: Secondary (sin gradiente) */
.button--secondary {
  background-color: var(--colorTarget);
  color: var(--colorTextContenido);
}

.button--secondary .button__text {
  color: var(--colorTextContenido);
}

.button--secondary:hover {
  background-color: var(--colorTargetFondo);
  transform: scale(1.02);
}
```

---

## Botón 2: Botón con Imagen de Fondo (Hoja)

### HTML
```html
<button class="modal-puntos__button">
  <span class="modal-puntos__button-text">¡Genial!</span>
</button>
```

### CSS
```css
/* ========================================
   Botón con imagen de fondo
======================================== */
.modal-puntos__button {
  position: relative;
  width: 24rem;
  height: 7.5rem;
  background-image: url(../img/hoja.webp);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 2.4rem;
  font-weight: 900;
  color: white;
  text-shadow: 
    2px 2px 0 var(--colorTextBorde),
    -1px -1px 0 rgba(0, 0, 0, 0.2);
  box-shadow: none;
  transition: transform 0.2s ease;
  overflow: visible;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.modal-puntos__button-text {
  position: relative;
  z-index: 2;
}

.modal-puntos__button:hover {
  transform: scale(1.05);
}

.modal-puntos__button:active {
  transform: scale(0.98);
}
```

---

## 📋 Instrucciones de Reutilización

### Para el Botón Principal (`.button--primary`)

#### Cambiar el Color del Botón

**Opción 1: Usando Variables CSS (Recomendado)**
```css
/* En styles/base.css, modifica las variables: */
:root {
  --colorButton: #46a330;           /* Color principal (verde) */
  --colorButtonDegradado: #7bc224;  /* Color del gradiente (verde claro) */
  --colorTextBorde: #1d420f;        /* Color del borde */
  --colorTextWhite: #e9f5e6;        /* Color del texto */
}
```

**Opción 2: Modificar directamente el gradiente**
```css
.button--primary {
  background: linear-gradient(
    to bottom,
    #7bc224 0%,    /* Cambia este color */
    #46a330 100%   /* Cambia este color */
  );
}
```

**Ejemplo - Botón Azul:**
```css
.button--primary {
  background: linear-gradient(
    to bottom,
    #4a90e2 0%,
    #2e5c8a 100%
  );
}
```

#### Cambiar el Tamaño del Botón
```css
.button {
  width: 30rem;  /* Cambia el ancho */
  height: 7rem;  /* Cambia la altura */
  font-size: 2rem; /* Cambia el tamaño del texto */
}
```

#### Quitar las Lianas Decorativas
```html
<!-- Opción 1: No incluir el elemento -->
<button class="button button--primary">
  <span class="button__text">Mi Botón</span>
</button>

<!-- Opción 2: Usar el modificador -->
<button class="button button--primary button--no-vines">
  <span class="button__text">Mi Botón</span>
  <span class="button__vines"></span>
</button>
```

#### Cambiar el Texto
```html
<button class="button button--primary">
  <span class="button__text">Nuevo Texto Aquí</span>
  <span class="button__vines"></span>
</button>
```

---

### Para el Botón con Imagen (`.modal-puntos__button`)

#### Cambiar la Imagen de Fondo

**Paso 1:** Reemplaza la imagen en la carpeta `img/`
- Formato recomendado: WebP
- Tamaño recomendado: 480x150px (proporción 3.2:1)

**Paso 2:** Actualiza la ruta en el CSS
```css
.modal-puntos__button {
  background-image: url(../img/mi-nueva-imagen.webp);
  /* Resto del código... */
}
```

#### Cambiar el Tamaño del Botón
```css
.modal-puntos__button {
  width: 28rem;   /* Ancho (ajusta según tu imagen) */
  height: 8.5rem; /* Alto (ajusta según tu imagen) */
  font-size: 2.6rem; /* Tamaño del texto */
}
```

#### Cambiar el Color del Texto
```css
.modal-puntos__button {
  color: #ff0000; /* Rojo */
  /* O usa una variable CSS */
  color: var(--colorTextWhite);
}
```

#### Cambiar el Texto
```html
<button class="modal-puntos__button">
  <span class="modal-puntos__button-text">Aceptar</span>
</button>
```

#### Ajustar la Sombra del Texto
```css
.modal-puntos__button {
  text-shadow: 
    2px 2px 0 #000000,        /* Sombra principal */
    -1px -1px 0 rgba(0, 0, 0, 0.2); /* Sombra secundaria */
}
```

---

## 🎨 Ejemplos de Personalización

### Botón Principal - Variante Roja
```css
.button--primary-red {
  background: linear-gradient(
    to bottom,
    #ff6b6b 0%,
    #ee5a6f 100%
  );
}
```
```html
<button class="button button--primary-red">
  <span class="button__text">Eliminar</span>
  <span class="button__vines"></span>
</button>
```

### Botón Principal - Variante Azul
```css
.button--primary-blue {
  background: linear-gradient(
    to bottom,
    #4a90e2 0%,
    #2e5c8a 100%
  );
}
```

### Botón con Diferente Imagen
```css
.boton-fruta {
  background-image: url(../img/manzana.webp);
  width: 20rem;
  height: 6rem;
}
```

---

## 📝 Notas Importantes

1. **Variables CSS**: Para mantener consistencia, siempre usa las variables definidas en `base.css`
2. **Responsive**: Los botones se adaptan automáticamente, pero puedes agregar media queries si necesitas tamaños específicos
3. **Accesibilidad**: Los botones ya incluyen `cursor: pointer` y estados `:hover` y `:active`
4. **Imágenes**: Usa formato WebP para mejor rendimiento
5. **Metodología BEM**: Mantén la nomenclatura BEM al crear nuevas variantes

---

## 🔧 Troubleshooting

**Problema:** La imagen no se muestra
- Verifica que la ruta sea correcta: `url(../img/nombre.webp)`
- Asegúrate de que la imagen existe en la carpeta `img/`

**Problema:** El texto no se ve bien sobre la imagen
- Ajusta el `text-shadow` para mayor contraste
- Cambia el `color` del texto a uno más visible

**Problema:** El botón no se centra
- Verifica que el contenedor padre tenga `text-align: center` o usa `margin: 0 auto`

**Problema:** Las animaciones no funcionan
- Verifica que `transition` esté definido
- Asegúrate de que no haya conflictos con otros estilos

