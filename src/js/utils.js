// Output Elements
const
  coursesContainer = document.querySelector('#courses-container'),
  creditsTotal = document.querySelector('#credits-total_score');

// Form Input Values
const
  codeInput = document.querySelector('#code'),
  nameInput = document.querySelector('#name'),
  progressionInput = document.querySelector('#progression'),
  linkInput = document.querySelector('#link'),
  creditsInput = document.querySelector('#credits'),
  iconInput = document.querySelector('#icon'),
  feedbackMessage = document.querySelector('#feedback-message'),
  feedbackDiv = document.querySelector('.feedback');

// To Top Button
const toTopBtn = document.querySelector('#goTop');

// Used for Total Credits Counter
let credits = 0;

// Holds ID of course to update
let updateId;

// Authtoken
let authToken;

// Courses URL
const coursesUrl = 'http://localhost:8080/DEMO_REST/api/courses';
// const coursesUrl = 'http://studenter.miun.se/~jola1803/dt173g/moment5/Server/courses.php';



/* Resets Form Input, updateID, and credits
  * @param   {boolean}     cancelPress     If Call Came From Cancel Button Press or Not
*/
const resetDOM = (cancelPress) => {
  updateId = null;
  credits = 0;
  codeInput.value = '';
  nameInput.value = '';
  progressionInput.value = '';
  linkInput.value = '';
  creditsInput.value = '';
  iconInput.value = '';
  cancelPress ? null : coursesContainer.innerHTML = '';
  cancelPress ? null : getCourses(coursesUrl);
}



/* Counts and Prints Credits Score
  * @param   {string}      credit     Course Credits, e.g 7.5
*/
const countCredits = (credit) => {
  credits += parseFloat(credit)
  creditsTotal.innerHTML = `${credits} HP`;
}



/* Show User Feedback Div
  * @param   {object}      feedback     Uses object.message & object.code
  * @param   {string}      element      Element ID or class, e.g '.feedback'
*/
const userFeedback = (feedback, element) => {
  fadeInElement(element, 500);

  const status = feedback.code;
  feedbackMessage.textContent = feedback.message;
  status == 201 | status == 200 ? feedbackDiv.style.backgroundColor = 'green' : feedbackDiv.style.backgroundColor = 'red';

  fadeOutElement(1000, 4000, element);
}



// Hides Feedback onclick
$('.feedback').click(function () {
  $('.feedback').fadeOut(300, function () {
  });
});



/* Fade in Element
  * @param   {string}        element     Element ID or class, e.g '.feedback'
  * @param   {number}        fadeMs      Fade speed in milliseconds
*/
const fadeInElement = (element, fadeMs) => {
  $(element).fadeIn(fadeMs, function () {
  });
}



/* Fade out Element
  * @param   {number}           fadeMs      Fade speed in milliseconds
  * @param   {number}           timeoutMS   Timeout in milliseconds
  * @param   {Array<string>}    elements    Element ID/Class, e.g '.feedback'
*/
const fadeOutElement = (fadeMs, timeoutMs, ...elements) => {
  elements.forEach(e => {
    setTimeout(() => {
      $(e).fadeOut(fadeMs, function () {
      })
    }, timeoutMs);
  })
}



/* Toggles Element
  * @param   {number}         fadeMs       Fade speed in milliseconds
  * @param   {Array<string>}  elements     Element ID/Class, e.g '.feedback'
*/
const toggleElement = (fadeMs, ...elements) => {
  elements.forEach(e => {
    $(`${e}`).toggle(fadeMs, function () {
    });
  })
}



/* Confirm Pop-Up
  * @param   {string}          action    E.g 'proceed' -> 'Sure you want to proceed?'
*/
const confirmIt = (action) => window.confirm(`Sure you want to ${action}?`);



// Make "Back To Top"-button scroll to the top
const toTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}



// Hide "to top button"
const hideToTopBtn = () => {
  window.pageYOffset > window.screen.height ?
    elementHide(toTopBtn, 'bottom', '20px')
    :
    elementHide(toTopBtn, 'bottom', '-50px')
}



/* Toggle element from top or bottom
  * @param   {DOM element}   element     Target DOM element to toggle
  * @param   {string}        position    'top' or 'bottom'
  * @param   {string}        offset      Offset in e.g. pixels, rem, em, etc.
*/
const elementHide = (element, position, offset) => position === 'top' ? element.style.top = offset : element.style.bottom = offset;



// Hide to top on scroll & Load Courses on Page Load
window.onscroll = () => hideToTopBtn();
window.addEventListener("load", getCourses(coursesUrl));
