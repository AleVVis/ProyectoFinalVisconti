class Docente {
    constructor(id, nombre, comisiones, pass) {
      this.id = id;
      this.nombre = nombre;
      this.comisiones = comisiones;
      this.pass = pass;
    }
  }
  
  const DOCENTES = [
    new Docente(1, 'Juan', ['Primer Grado', 'Segundo Grado'], 'pass'),
    new Docente(2, 'María', ['Tercer Grado', 'Cuarto Grado'], 'pass'),
    new Docente(3, 'Susana', ['Quinto Grado', 'Sexto Grado', 'Séptimo Grado'], 'pass'),
  ];
  
  let ESTUDIANTES = [
  
  ];
  
  class Estudiante {
    constructor(id, nombre, curso, notas) {
      this.id = id;
      this.nombre = nombre;
      this.curso = curso;
      this.notas = notas;
      this.promedioFinal = null; // Inicializamos el promedio a null, ya que aún no se ha calculado
    }
  
    calcularPromedioFinal() {
      const sumaNotas = this.notas.reduce((a, b) => a + b, 0);
      this.promedioFinal = sumaNotas / this.notas.length; // Actualizamos el promedio final cada vez que se calcula
      return this.promedioFinal;
    }
  }
  
  
  
  let currentTeacher = null;
  const loginForm = document.getElementById('loginForm');
  const welcomeSection = document.getElementById('welcomeSection');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const studentsContainer = document.getElementById('studentsContainer');
  const teacherNameInput = document.getElementById('teacherName');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  
  function showLoginForm() {  // muestra el formulario de inicio de sesión y oculta la sección de bienvenida.
    loginForm.style.display = 'block';
    welcomeSection.style.display = 'none';
  }
  
  
  
  function showWelcomeSection() {  //oculta el formulario de inicio de sesión y muestra la sección de bienvenida.
    loginForm.style.display = 'none';
    welcomeSection.style.display = 'block';
  }
  
  function renderStudents() {  // generar y mostrar las tarjetas de los estudiantes en el elemento HTML con el id "studentsContainer".
    studentsContainer.innerHTML = '';
  
    for (const estudiante of ESTUDIANTES) {
      console.log('Datos del estudiante:', estudiante);
      console.log('Comisiones del docente:', currentTeacher.commissions);
      if (currentTeacher.comisiones.includes(estudiante.curso)) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3','small-card');
  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
  
        const studentName = document.createElement('h5');
        studentName.classList.add('card-title');
        studentName.textContent = estudiante.nombre;
  
        const studentCourse = document.createElement('p');
        studentCourse.classList.add('card-text');
        studentCourse.textContent = `Curso: ${estudiante.curso}`;
  
        const noteInputs = document.createElement('div');
        noteInputs.classList.add('note-inputs');
  
        for (let i = 0; i < 3; i++) {
          const noteInput = document.createElement('input');
          noteInput.type = 'number';
          noteInput.classList.add('form-control', 'mb-2');
          noteInput.placeholder = `Nota ${i + 1}`;
          noteInput.value = estudiante.notas[i];
  
          noteInput.addEventListener('input', () => {
            estudiante.notas[i] = parseFloat(noteInput.value) || 0;
            saveDataToLocalStorage();
          });
  
          noteInputs.appendChild(noteInput);
        }
  
        const calculateBtn = document.createElement('button');
        calculateBtn.textContent = 'Calcular Promedio';
        calculateBtn.classList.add('btn', 'btn-primary', 'mt-2');
        calculateBtn.addEventListener('click', () => {
          const average = estudiante.calcularPromedioFinal();
          averageValue.textContent = average.toFixed(2);
          swal("Promedio Guardado!");
          saveDataToLocalStorage(); // Guardar los datos actualizados en el LocalStorage
        });
  
      
  
        const averageText = document.createElement('p');
        averageText.classList.add('card-text', 'mt-2', 'mb-0');
        averageText.textContent = 'Promedio:';
  
        const averageValue = document.createElement('span');
        averageValue.classList.add('fw-bold');
        averageValue.textContent = estudiante.promedioFinal ? estudiante.promedioFinal.toFixed(2) : 'N/A';
  //Si estudiante.promedioFinal tiene un valor (es decir, no es null, undefined ni NaN), se formatea como un número de dos decimales utilizando el método toFixed(2).
  //Si estudiante.promedioFinal no tiene un valor (es decir, es null, undefined o NaN), se establece el texto como "N/A".
  
        
  averageText.appendChild(averageValue);  //Esto coloca el elemento de span dentro del elemento de párrafo, de modo que el promedio final se muestre como parte del texto del párrafo.
  
  //este código agrega varios elementos creados dinámicamente al DOM para construir la estructura visual de una tarjeta de estudiante. Los elementos se anidan correctamente 
  //siguiendo la jerarquía de la estructura de la tarjeta, y finalmente la tarjeta completa se agrega al contenedor de estudiantes.    
        cardBody.appendChild(studentName);  //Esto coloca el nombre del estudiante dentro del cuerpo de la tarjeta.
        cardBody.appendChild(studentCourse);  
        cardBody.appendChild(noteInputs);  
        cardBody.appendChild(calculateBtn);
        cardBody.appendChild(averageText);
        card.appendChild(cardBody);   //Esto coloca el contenido del cuerpo de la tarjeta dentro de la tarjeta misma.
  
        studentsContainer.appendChild(card);  //Esto coloca la tarjeta completa dentro del contenedor de estudiantes.
      }
    }
  }
  
  function saveDataToLocalStorage() {
    localStorage.setItem('currentTeacher', JSON.stringify(currentTeacher));
    localStorage.setItem('ESTUDIANTES', JSON.stringify(ESTUDIANTES));
  
    // Guardar notas actualizadas
    const estudiantesConNotas = ESTUDIANTES.map(estudiante => {
      return {
        id: estudiante.id,
        nombre: estudiante.nombre,
        curso: estudiante.curso,
        notas: estudiante.notas
      };
    });
    localStorage.setItem('ESTUDIANTES_NOTAS', JSON.stringify(estudiantesConNotas));
  
    // Guardar promedios actualizados
    const estudiantesConPromedios = ESTUDIANTES.map(estudiante => {
      return {
        id: estudiante.id,
        nombre: estudiante.nombre,
        curso: estudiante.curso,
        promedioFinal: estudiante.promedioFinal
      };
    });
    localStorage.setItem('ESTUDIANTES_PROMEDIOS', JSON.stringify(estudiantesConPromedios));
  
    console.log('Datos guardados en el LocalStorage');
    console.log('ESTUDIANTES:', ESTUDIANTES);
    console.log('ESTUDIANTES_NOTAS:', estudiantesConNotas);
    console.log('ESTUDIANTES_PROMEDIOS:', estudiantesConPromedios);
  }
  
  
   //Se guarda un nuevo array en el almacenamiento local, llamado 'ESTUDIANTES_PROMEDIOS'.
   //El nuevo array se crea mapeando cada objeto estudiante del array ESTUDIANTES a un nuevo objeto con las propiedades id y promedioFinal.
   //El nuevo array se convierte en una cadena JSON mediante JSON.stringify antes de guardarlo.
  
  
  
   function retrieveDataFromLocalStorage() {
    const storedTeacher = localStorage.getItem('currentTeacher');
    const storedStudentNotes = localStorage.getItem('ESTUDIANTES_NOTAS');
    const storedStudentAverages = localStorage.getItem('ESTUDIANTES_PROMEDIOS');
  
    if (storedTeacher && storedStudentNotes && storedStudentAverages) {
      currentTeacher = JSON.parse(storedTeacher);
      welcomeMessage.textContent = `Bienvenido(a), ${currentTeacher.nombre}!`;
  
      const parsedNotes = JSON.parse(storedStudentNotes);
      const parsedAverages = JSON.parse(storedStudentAverages);
  
      for (const estudiante of ESTUDIANTES) {
        const storedStudent = parsedNotes.find(student => student.id === estudiante.id);
        if (storedStudent) {
          estudiante.notas = storedStudent.notas;
        }
  
        const storedAverage = parsedAverages.find(student => student.id === estudiante.id);
        if (storedAverage) {
          estudiante.promedioFinal = storedAverage.promedioFinal;
        }
      }
  
      renderStudents();
      showWelcomeSection();
    } else {
      showLoginForm();
    }
  }
  
  
  
  function loadStudentsFromJSON() {
    fetch('./data/alumnos.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.estudiante)) {
          ESTUDIANTES = data.estudiante.map(estudiante => new Estudiante(estudiante.id, estudiante.nombre, estudiante.curso, estudiante.notas));
          renderStudents();
        } else {
          console.error('Error al cargar los estudiantes: el archivo JSON no contiene un array válido de estudiantes');
        }
      })
      .catch(error => {
        console.error('Error al cargar los estudiantes:', error);
      });
  }
  
  loginBtn.addEventListener('click', () => {
    const teacherName = teacherNameInput.value.trim(); //teacherName contiene el valor del campo de nombre de usuario después de eliminar los espacios en blanco al principio y al final.
    const password = passwordInput.value;
  
    if (teacherName === '' || password === '') {   //si están vacíos muestra alerta
      swal("Hubo un error!", "Tipeá de nuevo tus credenciales!", "error");
      return;
    }
  
    const teacher = DOCENTES.find(  //busca en el array DOCENTES el primer objeto que cumple la condición proporcionada en la función callback.
      (docente) => docente.nombre === teacherName && docente.pass === password  //función callback verifica si el nombre de usuario y la contraseña ingresados coinciden con los de un docente.
    );   //Si se encuentra un docente que coincide, se asigna a la variable teacher. De lo contrario, teacher será undefined.
  
    if (teacher) {  //si teacher es válido
      currentTeacher = teacher;  //Se asigna el docente a la variable currentTeacher.
      welcomeMessage.textContent = `Bienvenido(a), ${currentTeacher.nombre}!`;  //Se actualiza el texto del elemento welcomeMessage para mostrar el mensaje de bienvenida con el nombre del docente.
  
      retrieveDataFromLocalStorage(); // Llamar a retrieveDataFromLocalStorage después de establecer el docente actual
  
      renderStudents();  //para generar y mostrar las tarjetas de los estudiantes correspondientes al docente.
      saveDataToLocalStorage();  //para guardar los datos en el almacenamiento local.
      showWelcomeSection();  //para ocultar el formulario de inicio de sesión y mostrar la sección de bienvenida.
    } else {
      swal("Hubo un error!", "Tipeá de nuevo tus credenciales!", "error");
    }
  });
  
  loadStudentsFromJSON();
  retrieveDataFromLocalStorage();
  showLoginForm();
  
  
  
  
  
  
  /*El flujo de ejecución sigue este orden:
  
  retrieveDataFromLocalStorage() verifica si hay datos almacenados y los restaura si es necesario.
  showLoginForm() muestra el formulario de inicio de sesión y oculta la sección de bienvenida.
  Cuando se hace clic en el botón de inicio de sesión, loginBtn se ejecuta:
  a. Se valida el nombre de usuario y la contraseña.
  b. Si las credenciales son válidas, se asigna el objeto teacher a currentTeacher.
  c. Se muestra el mensaje de bienvenida.
  d. Se generan y muestran las tarjetas de los estudiantes.
  e. Se guardan los datos en el almacenamiento local.
  f. Se muestra la sección de bienvenida y se oculta el formulario de inicio de sesión.*/