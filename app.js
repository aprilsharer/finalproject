// track how many affirmations the user has viewed
var count = 0

// store saved affirmations
var savedAffirmations = []

// keep track of the current affirmation showing
var currentAffirmation = ''

// grab all the elements we need from the page
var affirmationText = document.querySelector('#affirmation-text')
var countDisplay = document.querySelector('#count')
var savedList = document.querySelector('#saved-list')
var newBtn = document.querySelector('#new-btn')
var saveBtn = document.querySelector('#save-btn')
var clearBtn = document.querySelector('#clear-btn')

// fetch the affirmations from the json file
function loadAffirmations() {
  fetch('affirmations.json')
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      showRandom(data.affirmations)
    })
    .catch(function(error) {
      console.log('Error loading affirmations:', error)
    })
}

// pick a random affirmation and display it
function showRandom(affirmations) {
  var randomIndex = Math.floor(Math.random() * affirmations.length)
  currentAffirmation = affirmations[randomIndex]
  affirmationText.textContent = currentAffirmation

  // update the counter
  count = count + 1
  countDisplay.textContent = count
}

// save the current affirmation to the saved list
function saveAffirmation() {
  if (currentAffirmation === '' || currentAffirmation === 'Click the button to get your affirmation for today.') {
    return
  }

  // dont save duplicates
  if (savedAffirmations.includes(currentAffirmation)) {
    return
  }

  savedAffirmations.push(currentAffirmation)
  updateSavedList()
}

// update what shows up in the saved list on the page
function updateSavedList() {
  savedList.innerHTML = ''

  for (var i = 0; i < savedAffirmations.length; i++) {
    var li = document.createElement('li')
    li.textContent = savedAffirmations[i]
    savedList.appendChild(li)
  }
}

// clear all saved affirmations
function clearSaved() {
  savedAffirmations = []
  updateSavedList()
}

// button event listeners
newBtn.addEventListener('click', function() {
  loadAffirmations()
})

saveBtn.addEventListener('click', function() {
  saveAffirmation()
})

clearBtn.addEventListener('click', function() {
  clearSaved()
})

// load the first affirmation when the page opens
loadAffirmations()