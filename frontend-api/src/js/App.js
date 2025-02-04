document.addEventListener('DOMContentLoaded', () => {
    getCategories();
    getProducts();
});

const apiToken = "S3EZQ46Fzm0EpZnmR2fyvvbDsNFKFxadBQeCFv5wj0j2tvbKbQ4G8AVqGuww";

let allProducts = [];

// Modales
const modalCategoria = new bootstrap.Modal(document.getElementById('new_cate'))
const modalProducto = new bootstrap.Modal(document.getElementById('new_produ'))

// Mostrar alerta global
const verAleGlobal = (text = "") => {
    let alertGlobal = document.getElementById('alertGlob');
    alertGlobal.classList.add('d-none');

    // Si el texto no esta vacio, lo mostramos
    if(text != "") {
        alertGlobal.innerHTML = text;
        alertGlobal.classList.remove('d-none');
    }
}

// obtener categorias
const getCategories = async () => {
    let seleCate = document.getElementById('categoPro'); // select de categorias
    let tabCate = document.getElementById('table_cate'); // tabla de categorias
    let filterCategory = document.getElementById('filterCategory'); // select para filtrar

    // Limpiar tabla y select
    seleCate.innerHTML = '';
    tabCate.innerHTML = '';
    filterCategory.innerHTML = '<option value="">Todas las categorías</option>';

    await fetch('http://localhost:8000/api/categories',{
            method: 'GET',    
            headers: {'Authorization': `Bearer ${apiToken}`}
        })
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(element => {
                // Agregar datos a la tabla y select
                tabCate.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                    </tr>
                `
                seleCate.innerHTML += `<option value="${element.id}">${element.name}</option>`;
                filterCategory.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
        });
}

// obtener productos
const getProducts = async () => {
    let tabProdu = document.getElementById('table_products'); // tabla de productos
    tabProdu.innerHTML = '';

    await fetch('http://localhost:8000/api/products',{
            method: 'GET',    
            headers: {'Authorization': `Bearer ${apiToken}`}
        })
        .then(response => response.json())
        .then(data => {
            allProducts = data.products; // Almacenar los productos en la variable global
            renderProducts(allProducts); // Renderizar los productos
        });
}

// 
const renderProducts = (products) => {
    let tabProdu = document.getElementById('table_products');
    tabProdu.innerHTML = '';

    products.forEach(element => {
        tabProdu.innerHTML += `
            <tr>
                <td style="width: 10%;">${element.id}</td>
                <td style="width: 25%;">${element.name}</td>
                <td style="width: 15%;">${element.stock}</td>
                <td style="width: 25%;">${element.category.name}</td>
                <td style="width: 15%;"> <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#new_produ" onclick='asigData(${JSON.stringify(element)})'>Editar</button> </td>
                <td style="width: 15%;"> <button class="btn btn-danger" onclick="deleteProduct(${element.id})">Eliminar</button> </td>
            </tr>
        `;
    });
}

const filterProducts = (categoryId) => {
    if (categoryId === '') {
        renderProducts(allProducts); // Mostrar todos los productos si no se selecciona ninguna categoría
    } else {
        const filteredProducts = allProducts.filter(product => product.category.id == categoryId);
        renderProducts(filteredProducts);
    }
}
document.getElementById('filterCategory').addEventListener('change', (event) => {
    const categoryId = event.target.value;
    filterProducts(categoryId);
});

// Abrir modal de categoria
const limpiarCategoria = () => {
    verAleGlobal();
    document.getElementById('name').value = '';
    document.getElementById('alertName').classList.add('d-none');
}

// Guardar categoria
const saveCategory = (event) => {
    event.preventDefault(); // Evitar que se recargue la pagina
    let alertName = document.getElementById('alertName'); // alerta de nombre
    let nom = document.getElementById('name').value; // nombre de la categoria
    let btn = document.getElementById('btnSaveCate'); // boton guardar

    // Cambiar texto del boton y deshabilitarlo
    btn.innerHTML = 'Guardando...';
    btn.setAttribute('disabled', 'disabled');
    alertName.classList.add('d-none');
    
    // Validar que el campo nombre no este vacio
    if(nom == '') {
        alertName.classList.remove('d-none');
        alertName.innerHTML = 'El campo nombre es obligatorio';
        // Cambiar texto del boton y habilitarlo
        btn.innerHTML = 'Guardar';
        btn.removeAttribute('disabled');
        return;
    }

    // Guardar categoria
    fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'data-type': 'json',
            'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({name: nom}),
    })
    .then(response => response.json())
    .then(data => {
        btn.innerHTML = 'Guardar';
        btn.removeAttribute('disabled');
        getCategories();
        limpiarCategoria();
        if (data.code == 422) {
            verAleGlobal(data.message);
        }else if (data.code == 201) {
            verAleGlobal(data.message);
        }
        // Cerrar el modal
        modalCategoria.hide();
    });
}
document.querySelector('#form_cate').addEventListener('submit', saveCategory);

// Check name category
const checkName = () => {
    const input = document.getElementById('name');
    const alertName = document.getElementById('alertName');
    let name = input.value;

    // Expresión regular para permitir solo letras y espacios
    let regex = /^[a-zA-Z\s]*$/;

    // Si no cumple con la expresión regular, eliminamos los caracteres no permitidos
    if (!regex.test(name)) {
        alertName.classList.remove('d-none');
        alertName.innerHTML = 'Solo se permiten letras';
        
        // Filtrar el valor para dejar solo letras y espacios
        input.value = name.replace(/[^a-zA-Z\s]/g, '');
    } else {
        alertName.classList.add('d-none');
    }
};

let editProd = false;

// verifica si se va a editar o guardar un producto
const verEdit = (event) => {
    event.preventDefault(); // Evitar que se recargue la pagina
    if(editProd) {
        editProduct();
    }
    else {
        saveProduct();
    }
        
}

// Limpia formulario de producto
const limpiaProdu = () => {
    verAleGlobal();
    editProd = false;
    let idPro = document.getElementById('idPro');
    let namePro = document.getElementById('namePro');
    let stockPro = document.getElementById('stockPro');
    let categoPro = document.getElementById('categoPro');
    let btnSave = document.getElementById('btnSaveProdu');
    let btnEdit = document.getElementById('btnEditProdu');

    idPro.value = '';
    namePro.value = '';
    namePro.removeAttribute('disabled');
    stockPro.value = '0';
    categoPro.removeAttribute('disabled');
    document.getElementById('alertProd').classList.add('d-none');
    btnSave.classList.remove('d-none');
    btnEdit.classList.add('d-none');
}

// Guardar producto
const saveProduct = () => {
    let alertProd = document.getElementById('alertProd'); // alerta de nombre
    let name = document.getElementById('namePro').value; // nombre del producto
    let stock = document.getElementById('stockPro').value; // stock del producto
    let cate = document.getElementById('categoPro').value; // categoria del producto
    let btn = document.getElementById('btnSaveProdu'); // boton guardar

    // Cambiar texto del boton y deshabilitarlo
    btn.innerHTML = 'Guardando...';
    btn.setAttribute('disabled', 'disabled');
    alertProd.classList.add('d-none');

    // Validar que el campo nombre no este vacio
    if(name == '') {
        alertProd.classList.remove('d-none');
        alertProd.innerHTML = 'El campo nombre es obligatorio';
        // Cambiar texto del boton y habilitarlo
        btn.innerHTML = 'Guardar';
        btn.removeAttribute('disabled');
        return;
    }

    // Validar que el campo stock sea un numero y sea mayor a 0
    if(isNaN(stock) || stock <= 0) {
        alertProd.classList.remove('d-none');
        alertProd.innerHTML = 'El campo stock debe ser un número mayor a 0';
        // Cambiar texto del boton y habilitarlo
        btn.innerHTML = 'Guardar';
        btn.removeAttribute('disabled');
        return;
    }

    // Guardar producto
    fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'data-type': 'json',
            'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({name: name, stock: stock, category_id: cate}),
    })
    .then(response => response.json())
    .then(data => {
        btn.innerHTML = 'Guardar';
        btn.removeAttribute('disabled');
        getProducts();
        limpiaProdu();
        verAleGlobal(data.message);
        // Cerrar el modal
        modalProducto.hide();
    });
}

const asigData = (datos) => {
    let idPro = document.getElementById('idPro');
    let namePro = document.getElementById('namePro');
    let stockPro = document.getElementById('stockPro');
    let categoPro = document.getElementById('categoPro');
    let btnSave = document.getElementById('btnSaveProdu');
    let btnEdit = document.getElementById('btnEditProdu');

    editProd = true;
    idPro.value = datos.id;
    namePro.value = datos.name;
    stockPro.value = datos.stock;
    categoPro.value = datos.category_id;
    namePro.setAttribute('disabled', 'disabled');
    categoPro.setAttribute('disabled', 'disabled');
    btnSave.classList.add('d-none');
    btnEdit.classList.remove('d-none');
}

// Editar producto
const editProduct = () => {
    let alertProd = document.getElementById('alertProd'); // alerta de nombre
    let btn = document.getElementById('btnEditProdu'); // boton guardar

    // Cambiar texto del boton y deshabilitarlo
    btn.innerHTML = 'Actualizando...';
    btn.setAttribute('disabled', 'disabled');
    alertProd.classList.add('d-none');

    // Datos del producto
    datos = {
        id: document.getElementById('idPro').value,
        name: document.getElementById('namePro').value,
        stock: document.getElementById('stockPro').value,
        category_id: document.getElementById('categoPro').value
    }

    if(datos.stock <= 0) {
        alertProd.classList.remove('d-none');
        alertProd.innerHTML = 'El campo stock debe ser un número mayor a 0';
        return
    }

    fetch(`http://localhost:8000/api/products/${datos.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'data-type': 'json',
            'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({name: datos.name, stock: datos.stock, category_id: datos.category_id}),
    })
    .then(response => response.json())
    .then(data => {
        btn.innerHTML = 'Actualizar';
        btn.removeAttribute('disabled');
        getProducts();
        verAleGlobal(data.message);
        // Cerrar el modal
        modalProducto.hide();
    });
}
document.querySelector('#formProd').addEventListener('submit', verEdit);

// Eliminar producto
const deleteProduct = (id) => {
    fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${apiToken}`}
    })
    .then(response => response.json())
    .then(data => {
        getProducts();
        verAleGlobal(data.message);
    });
}

// Check name product
const checkNamePro = () => {
    const input = document.getElementById('namePro');
    const alertProd = document.getElementById('alertProd');
    let name = input.value;

    // Expresión regular para permitir solo letras, numeros y espacios
    let regex = /^[a-zA-Z0-9\s]*$/;

    // Si no cumple con la expresión regular, eliminamos los caracteres no permitidos
    if (!regex.test(name)) {
        alertProd.classList.remove('d-none');
        alertProd.innerHTML = 'Solo se permiten letras y números';
        
        // Filtrar el valor para dejar solo letras, numeros y espacios
        input.value = name.replace(/[^a-zA-Z0-9\s]/g, '');
    } else {
        alertProd.classList.add('d-none');
    }
}