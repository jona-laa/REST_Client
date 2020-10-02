/********** GET **********/
/* Gets all courses with GET request
  * @param   {string}     url     API-url
*/
const getCourses = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => data.courses.forEach(course => createElement(course)))
    .catch(e => console.error(e))
}

/* Creates Div Element for Course Object
  * @param   {object}     course     Course object -> object.id/code/name/link/progression/credits/icon
*/
const createElement = (course) => {
  coursesContainer.innerHTML += `
    <div class="courses-container_course" id="course-${course.id}">
      <a href="${course.link}" class="icon-link react" target="_blank">
        <i class="${course.icon || 'fas fa-university'} fa-4x"></i>
        <h3>${course.name}</h3>
      </a>
      <p><span>Code:</span><span>${course.code}</span></p>
      <p><span>Progression:</span><span>${course.progression}</span></p>
      <p><span>Credits:</span><span>${course.credits}</span></p>
      <button class="btn delete" id="delete-${course.id}" value="delete" onclick="deleteCourse(${course.id})"><i class="fas fa-trash-alt fa-1x"></i></button>
      <button class="btn update" id="update-${course.id}" value="update" onclick="initUpdate(${course.id})"><i class="fas fa-edit fa-1x"></i></button>
      <button class="btn edit" value="update" onclick="toggleElement(50, '#delete-${course.id}','#update-${course.id}')"><i class="fas fa-ellipsis-v fa-1x"></i></button>
    </div>
  `;
  credits += parseFloat(course.credits)
  creditsTotal.innerHTML = `${credits} HP`;
}



/********** POST **********/
// Adds course with POST request
const addCourse = () => {
  fetch(coursesUrl,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          code: codeInput.value,
          name: nameInput.value,
          progression: progressionInput.value,
          link: linkInput.value,
          credits: creditsInput.value,
          icon: iconInput.value
        }
      ),
    }
  )
    .then(res => res.json())
    .then(json => {
      userFeedback(json, '.feedback')
      return json;
    })
    .then(data => {
      data.code == 201 ? resetDOM() : null;
    })
    .catch(e => console.error(e))
}



/********** UPDATE **********/
/* Initiates update process - Gets course info and auto-fills input fields
  * @param   {number}     id    ID of course to update
*/
const initUpdate = (id) => {
  updateId = id;

  fetch(`${coursesUrl}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      let { id, code, name, progression, link, credits, icon } = data.courses[0];
      console.log(id)
      codeInput.value = code;
      nameInput.value = name;
      progressionInput.value = progression;
      linkInput.value = link;
      creditsInput.value = credits;
      iconInput.value = icon;
      window.scrollTo(0, document.body.scrollHeight);
    })
}

/* Updates course with PUT request
  * @param   {number}     id     ID of course to delete
*/
const updateCourse = (id) => {
  fetch(coursesUrl,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          id: id,
          code: codeInput.value,
          name: nameInput.value,
          progression: progressionInput.value,
          link: linkInput.value,
          credits: creditsInput.value,
          icon: iconInput.value
        }
      ),
    }
  )
    .then(res => res.json())
    .then(json => userFeedback(json, '.feedback'))
    .then(data => resetDOM())
    .catch(e => console.error(e))
}

/* Cancels/Resets Form
  * @param   {object}     e     Event Object
*/
const cancelForm = (e) => {
  e.preventDefault();
  confirmIt('cancel') ? resetDOM(true) : null;
}



/********** DELETE **********/
/* Deletes selected course
  * @param   {number}     id     ID of course to delete
*/
const deleteCourse = id => {
  confirmIt('delete course') ? fetch(`${coursesUrl}?id=${id}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
    .then(feedback => userFeedback(feedback, '.feedback'))
    .then(data => resetDOM())
    .catch(e => console.error(e)) : null;
}
