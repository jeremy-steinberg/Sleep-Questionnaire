    // Initialize empty object for user answers

    let userAnswers = {};

    // Sample questions
    const questions = [
      {
        id: 1,
        text: "1. Do you have trouble falling asleep, staying asleep or waking up early at least three nights a week for at least the last month?",
        options: ["No", "Yes"]
      },
      {
        id: 2,
        text: "2. Does your sleep affect your activities the next day (such as feeling unrefreshed in the morning, fatigued, unable to concentrate, or feeling irritable)?",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        text: "3. Are you a shift worker?",
        options: ["No", "Yes"]
      },
      {
        id: 4,
        text: "4. Is your bedroom hot and uncomfortable?",
        options: ["No", "Yes"]
      },
      {
        id: 5,
        text: "5. Do you use alcohol, nicotine (cigarettes, vaping) or caffeine (coffee, cola, tea, chocolate, energy drinks) in the evenings? ",
        options: ["No", "Yes"]
      },
      {
        id: 6,
        text: "6. Do you frequently nap during the day or have highly irregular and variable bedtimes or rising times? ",
        options: ["No", "Yes"]
      },
      {
        id: 7,
        text: "7. Do you engage in mentally stimulating, moderate to strenuous exercise or emotionally upsetting activities within a couple of hours of bedtime?",
        options: ["No", "Yes"]
      },
      {
        id: 8,
        text: "8. Do you frequently use the bed for activities other than sleep or intimacy? (e.g., television watching, reading, studying, snacking, thinking, planning)",
        options: ["No", "Yes"]
      },
      {
        id: 9,
        text: "9. During the past month, have you been bothered by feeling down, depressed or hopeless?",
        options: ["No", "Yes"]
      },
      {
        id: 10,
        text: "10. Or bothered by having little interest or pleasure in doing things?",
        options: ["No", "Yes"]
      },
      {
        id: 11,
        text: "11. Over the last two weeks, have you been bothered by feeling nervous, anxious, or on edge?",
        options: ["No", "Yes"]
      },
      {
        id: 12,
        text: "12. Over the last two weeks, have you been bothered by being unable to stop or control worrying? ",
        options: ["No", "Yes"]
      },
      {
        id: 13,
        text: "13. Do you snore very loudly at night? ",
        options: ["No", "Yes"]
      },
      {
        id: 14,
        text: "14. Do you fall asleep during the day in waiting rooms or as a passenger in a vehicle? ",
        options: ["No", "Yes"]
      },
      {
        id: 15,
        text: "15. Do you have any significant health problems affecting your sleep quality, such as pain, difficulty breathing, acid reflux, or night cough? ",
        options: ["No", "Yes"]
      },
      {
        id: 16,
        text: "16. When you are asleep, do you sleepwalk, sleep talk, grind your teeth, have restless legs or anything else you would consider unusual? ",
        options: ["No", "Yes"]
      },
      {
        id: 17,
        text: "17. Do you ever feel the need to reduce the amount of alcohol you drink?",
        options: ["No", "Yes"]
      },
      {
        id: 18,
        text: "18. Do you ever feel the need to cut down on your non-prescription or recreational drug use?",
        options: ["No", "Yes"]
      },
      {
        id: 19,
        text: "19. Do you go to bed late at night (e.g. after midnight?)",
        options: ["No", "Yes"]
      },
      {
        id: 20,
        text: "20. When you can, do you prefer to sleep in late in the morning ",
        options: ["No", "Yes"]
      }
    ];

    
    function startQuestionnaire() {

      // Show the progress bar container
      document.getElementById('progressBarContainer').style.display = 'flex';

      // Initialise the progress bar to 0%
      updateProgressBar(0, questions.length);

      // Hide the instructionsDiv
      document.getElementById('instructionsDiv').style.display = 'none';

      // Hide the Start button
      document.getElementById('startButton').style.display = 'none';
      

      // Show the questionDiv
      document.getElementById('questionDiv').classList.remove('hidden');

        // Reset questionnaire state
      resetQuestionnaire();

      // Begin the questionnaire
      displayQuestion(0);
    }


    function resetQuestionnaire() {
  // Clear user answers and recommendations
  userAnswers = {};
  recommendations.clear();

  // Clear the recommendations display area
  const recommendationsDiv = document.getElementById('recommendationsDiv');
  recommendationsDiv.innerText = '';
  recommendationsDiv.classList.add('hidden');

    // Clear the other resources display area
    const otherResourcesDiv = document.getElementById('otherResourcesDiv');
    otherResourcesDiv.innerText = '';
    otherResourcesDiv.classList.add('hidden');

    //clear print and credits
    document.getElementById('printButton').style.display = 'none';
    document.getElementById('creditsDiv').style.display = 'none';

    // Hide the "Copy to Clipboard" button if it exists
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
      copyButton.style.display = 'none';
    }

}

// Modified displayQuestion function to include Back and Skip buttons. questions 1 and 2 are required
function displayQuestion(index) {
  updateProgressBar(index, questions.length);

  const questionDiv = document.getElementById('questionDiv');
  const question = questions[index];
  if (!question) {
    questionDiv.classList.add('hidden');
    generateRecommendations();
    return;
  }

  let mandatoryQuestions = [0, 1];  // indices of mandatory questions
  let isMandatory = mandatoryQuestions.includes(index);

  let html = '';

  // Question container
  html += '<div class="question-container">';
  html += '<div class="text-container">';
  html += `<p class="${isMandatory ? 'question-text-mandatory' : 'question-text'}">${question.text} ${isMandatory ? '<span class="mandatory-indicator">*</span>' : ''}</p>`;
  if (isMandatory) {
    html += '<p class="helper-text">This question can\'t be skipped</p>';  // Helper text added
  }
  html += '</div>';  // Close the text-container div
  html += '</div>'; // Close the question-container div

  // Radio container
  html += '<div class="radio-container">';
  question.options.forEach((option, i) => {
    html += `<label class="boxed-radio"><input type="radio" name="q${index}" value="${option}" style="display:none;" onclick="handleUserInput(${index}, '${option}')">${option}</label>`;
  });
  html += '</div>';

  // Error message
  html += `<div id="error-message-${index}" class="error-message"></div>`;
  
  // Back and Skip buttons
  html += `<button onclick="handleBackClick(${index})"${index === 0 ? ' disabled' : ''}>Back</button>`;
  html += `<button id="skip-button-${index}" onclick="handleSkipClick(${index})" ${isMandatory ? 'disabled' : ''}>Skip</button>`;

  // Update the inner HTML
  document.getElementById('questionDiv').innerHTML = html;
}




// Function to handle Back button click
function handleBackClick(index) {
  // Navigate to the previous question by decrementing the index
  displayQuestion(index - 1);
}

// Function to handle Skip button click
function handleSkipClick(index) {
  displayQuestion(index + 1);
}


// Modified handleUserInput function
function handleUserInput(index, answer) {
  const questionID = questions[index].id;
  userAnswers[questionID] = answer;

  let mandatoryQuestions = [0, 1];
  let isMandatory = mandatoryQuestions.includes(index);

  if (isMandatory && answer) {
    document.getElementById(`error-message-${index}`).innerHTML = '';
    document.getElementById(`skip-button-${index}`).disabled = false;
  }

  displayQuestion(index + 1);
}



// Initialize empty Set for unique recommendations
let recommendations = new Set();


// Defines criteria for having a sleep problem. Returns True if 1 OR 2 are "Yes". Returns False if both 1 AND 2 are "No"
function sleepProblemCondition(userAnswers) {
  // Check the conditions for question 1 and 2
  const condition1or2 = userAnswers['1'] === 'Yes' || userAnswers['2'] === 'Yes';
  const bothNo = userAnswers['1'] === 'No' && userAnswers['2'] === 'No';

  return condition1or2 && !bothNo;
}

// Checks if three or more yes answers for questions 3-20
function hasThreeOrMoreYes(userAnswers) {
  let yesCount = 0;

  const totalQuestions = Object.keys(userAnswers).length;

  for (let i = 3; i <= totalQuestions; i++) {
    if (userAnswers[i.toString()] === 'Yes') {
      yesCount++;
    }

    if (yesCount >= 3) {
      return true;
    }
  }

  return false;
}



// Returns True if "Yes" to any question numbered 3 and above.
function couldSleepBeImprovedCondition(userAnswers) {
  for (const question in userAnswers) {
    if (question !== '1' && question !== '2' && userAnswers[question] === 'Yes') {
      return true;
    }
  }
  return false;
}


//Checks if every answer is No 
function allAnswersNo(userAnswers) {
  // Get all values (answers) from the userAnswers object
  const answersArray = Object.values(userAnswers);

  // Check if every answer is 'No'
  return answersArray.every(answer => answer === 'No');
}

// Returns True if has a sleep problem PLUS yes to one of the questions in the array
function sleepRestrictionWithOtherCauseCondition(userAnswers) {
  const questionsToCheck = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '15', '16', '17', '18', '19', '20'];
  
  const hasOtherCauses = questionsToCheck.some(question => userAnswers[question] === 'Yes');
  const hasSleepProblem = sleepProblemCondition(userAnswers);
  
  return hasOtherCauses && hasSleepProblem;
}

//Defines criteria to display the sleep restriction advice in generateRecommendations
function sleepRestrictionConditionWithoutCause(userAnswers) {
  // Create an array of all keys except for the first and second question
  const otherQuestions = Object.keys(userAnswers).filter(id => id !== '1' && id !== '2');

  // Check if all other answers are 'No'
  const allOthersNo = otherQuestions.every(id => userAnswers[id] === 'No');

  // Check the conditions for question 1 and 2
  const condition1 = userAnswers['1'] === 'Yes' && allOthersNo;
  const condition2 = userAnswers['2'] === 'Yes' && allOthersNo;
  const condition3 = userAnswers['1'] === 'Yes' && userAnswers['2'] === 'Yes' && allOthersNo;

  return condition1 || condition2 || condition3;
}



function generateRecommendations() {
  // Implement your logic to generate recommendations
  // based on the answers in userAnswers
  // Convert the object values to an array
  const answersArray = Object.values(userAnswers);
  const sleepRestrictionText = `
  <h3>Chronic Insomnia Treatments</h3>
  <h4>Time in bed restriction </h4>
  <p>One treatment option is sleep restriction or time in bed restriction. This is where you go to bed later and spend fewer hours in bed.</p>
  <p>If for work you drive vehicles, operate heavy machinery, or do delicate procedures, e.g. surgeons, you should consider treatment during your vacation- sleep deprivation is a short-term safety risk.</p>
  <p>Estimate time spent in bed versus time spent asleep. If you cannot do this from memory, you can use a sleep diary if necessary. Work out what time you go to bed and wake up. Work out how long you stay asleep. Usually, there is a mismatch, e.g. 9 hours in bed and 6 hours asleep. would mean you are diluting their good sleep over 9 rather than 6 hours. Try go to bed later and wake up simultaneously with the rest of your household. Do only quiet, relaxing activities before bedtime. These activities must be done outside the bed and not lying down to avoid naps, which can disrupt the routine. We recommend you keep this new time in bed for two weeks before making any adjustments. People usually reportd that the quality of their sleep improves as they feel they are starting to have a deep sleep and the sleep period is consolidated.</p>
  <p>After two weeks: Nothing else is needed if you is sleeping better and functioning well. Many people prefer to continue on the bed restriction schedule as they find it very effective.</p>
  <p>If you are sleeping better but feel sleep deprived the next day, you may wish to add 30 minutes to the time allowed in bed for another two weeks and continue doing so until the feelings of sleep deprivation disappear while still maintaining continuous sleep at night </p>
  <p>If you are not sleeping better, you may wish to reduce the time in bed by 30 minutes (but not to less than five hours at night). Try each option for at least two weeks before making another change. If you are not sleeping better at five hours per night, you may wish to get some advice from a sleep specialist. You may need an overnight sleep study to see if there are other causes of insomnia, e.g. sleep apnoea or a movement disorder.</p>
  <h4>Medication</h4>
  <p>You could consider trying <a href='https://healthify.nz/medicines-a-z/m/melatonin/' target='_blank'>melatonin.</a></p>
  <p>Other medicines can help you sleep but are difficult to stop once you take them regularly and they also tend to lose effectiveness over time. </p>
  <h4>Other</h4>
  <p>A special type of therapy can be helpful called CBTi - Cognitive Behavioural Therapy for Insomnia. Just a thought course: <a href='https://healthify.nz/apps/m/managing-insomnia-just-a-thought-course/' target='_blank'>Just a Thought Insomnia Course</a></p>
  `;
  const everyNoText = `
  It sounds like none of the questions from this questionnaire apply. If despite this you still feel that you have a sleep problem you may have a condition called chronic insomnia. This is where you have a sleep disorder without any particular explanation. It is very common and can be helped by several treatments.
  `;
  const chronicInsomniaDiagnosisAdditional = `
  If you are struggling with sleep the above may not be the only cause. It is possible to also have a condition called chronic insomnia. This is a very common condition where you have a sleep disorder without any particular explanation. If fixing the above doesn't work or isn't possible, you could explore treatments for chronic insomnia.
  `;
  
  if (allAnswersNo(userAnswers)) {
    recommendations.add("You don't seem to have a sleep problem based on the answers you gave to this questionnaire.");
  } else {
      if (sleepProblemCondition(userAnswers)) {
        recommendations.add("Having a sleep problem can be frustrating but the good news is there are things you can do to improve your sleep.  Learn more: <a href='https://healthify.nz/hauora-wellbeing/s/sleep-tips/' target='_blank'>10 tips to help you sleep.</a> Learn more about <a href='https://healthify.nz/health-a-z/i/insomnia/' target='_blank'>insomnia</a>.");
        if (hasThreeOrMoreYes(userAnswers)) {
          recommendations.add("You seem to have several areas that could be affecting your sleep. Your problem may be quite complex and so you may wish to see your GP or a sleep specialist.")
        }
      } else {
        recommendations.add("Based on your answers you may not have a sleep problem. ");
        if (couldSleepBeImprovedCondition(userAnswers)){
          recommendations.add("However based on the answers to the questions you could still take a look at the following recommendations if you wanted to try improve your sleep quality:")
        }
      }
  }

 

  if (userAnswers[3] === 'Yes') {
  recommendations.add("You answered yes to being a shift worker. Shift workers can develop a condition known as shift work sleep disorder, as a result of a misalignment between the body and the sleep-wake cycle. This can result in mood problems, poor work performance, higher accident risk and added health problems. See <a href='https://healthify.nz/hauora-wellbeing/s/sleep-shift-work/' target='_blank'>Shift Work page on Healthify and how it affects your sleep</a>. You may wish to see a sleep specialist as this can be a difficult problem to solve.");
  }

  if (userAnswers[4] === 'Yes') {
  recommendations.add("You answered that your bedroom is hot and uncomfortable. You should attend to this if you aren't happy with your sleep.");
  }

  if (userAnswers[5] === 'Yes') {
  recommendations.add("You answered that you drink alcohol, nicotine, or caffeine in the evenings. These substances are known as stimultants, which can give the feeling of increased alertness but at the same time, cause difficulty in getting to sleep. You should attend to this if you aren't happy with your sleep. Learn more about stimulants and sleep: See <a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-caffeine/' target='_blank'>Sleep and Caffeine page</a> and <a href='https://healthify.nz/hauora-wellbeing/s/sleep-how-food-drink-affects/' target='_blank'>Food and Drink effects on Sleep page on Healthify</a>");
  }

  if (userAnswers[6] === 'Yes') {
  recommendations.add("You answered yes to frequent napping. This may be causing your sleep problem. However it may be due sleep deprivation from another cause, e.g. sleep apnoea. Regular bed and rising times are good sleep hygiene approaches. Napping should be limited to about 30 minutes and be done before 1500 hrs.");
  }

  if (userAnswers[7] === 'Yes') {
  recommendations.add("You answered yes to engaging in mentally stimulating, moderate to strenous exercise, or emotionally upsetting acitvities within a couple hours of bedtime. This may be causing or contributing to your sleep problem. You may wish to change these behaviours."); 
 }

  if (userAnswers[8] === 'Yes') {
  recommendations.add("You answered yes to frequently using the bed for activities other than sleep or intimacy. This may be causing or contributing to your sleep problem. You may wish to change these behaviours");
 }

 //check for mood or anxiety problem
  const moodOrAnxiety = [userAnswers[11], userAnswers[12]].some(answer => answer === 'Yes');
  const moodOrDepression = [userAnswers[9], userAnswers[10]].some(answer => answer === 'Yes');

  if (moodOrAnxiety || moodOrDepression) {
    if (moodOrAnxiety) {
      recommendations.add("You may have a mood, anxiety or stress problem. Discuss this with your GP as this could be a factor in your sleep quality.");
    } else if (moodOrDepression) {
      recommendations.add("You may have a mood or depression problem. Discuss this with your GP as this could be a factor in your sleep quality.");
    }
  }


  if (userAnswers[13] === 'Yes' && userAnswers[14] === 'Yes') {
  recommendations.add("You said you snore loudly and you are falling asleep during the day. If you also stop breathing at night (called 'apnoea') then you likely have Obstructive Sleep Apnoea (OSA). Morning headaches and a dry mouth are other potential symptoms of OSA. You may wish to see your GP about this. You can answer a few more questions with the <a href='https://jackofallorgans.com/stopbang'target='_blank'>STOP-BANG tool</a> here to see how likely the diagnosis is. See also <a href='https://healthify.nz/health-a-z/o/obstructive-sleep-apnoea/' target='_blank'>Obstructive Sleep Apnoea page on Healthify</a>");
  }

  if (userAnswers[13] === 'No' && userAnswers[14] === 'Yes') {
    recommendations.add("You said you are falling asleep frequently during the day. The medical term for this is 'Excessive Daytime Sleepiness.' The most common cause is sleep deprivation. Another common cause is Obstructive Sleep Apnoea, but you said you don't snore so this is less likely. If you are going to bed too late (e.g. playing video games late in the night, partying late, etc) then go to bed earlier and try get at least 7 hours of sleep.");
  }

  if (userAnswers[15] === 'Yes') {
  recommendations.add("You said you have a significant health problem affecting sleep quality. Discuss this with your GP as this could be a factor in your sleep quality.");  
 }

  if (userAnswers[16] === 'Yes') {
  recommendations.add("You may have restless legs or some other issue with your brain (e.g. sleep walking, sleep talking, etc). The technical term for this is a parasomnia. If your bedsheets are in complete disarray or you have ever woken up with unexplained injuries then parasomnia is more likely. Discuss this with your GP as this could be a factor in your sleep quality.");
 }

  if (userAnswers[17] === 'Yes') {
  recommendations.add("You said yes to feeling the need to reduce the amount of alcohol you drink. Try and reduce this, discuss this with your GP, or self refer to <a href='https://www.cads.org.nz/' target='_blank'>CADS</a> if you want extra suppor. See <a href='https://healthify.nz/hauora-wellbeing/a/alcohol-and-harmful-drinking/' target='_blank'>alcohol page on Healthify</a>");
 }

  if (userAnswers[18] === 'Yes') {
  recommendations.add("You said yes to feeling the need to reduce the amount of non-prescription or recreational drug use. Try and reduce this as this could be a factor in your sleep quality. Or discuss this with your GP.");
 }

  if (userAnswers[19] === 'Yes' || userAnswers[20] === 'Yes') {
  recommendations.add("You may have a condition called delayed sleep phase disorder. It can be helped by using a light box in the morning and <a href='https://healthify.nz/medicines-a-z/m/melatonin/' target='_blank'>melatonin</a> at night.");
 }

  // Check if meets the sleep restriction recommendation condition, without another cause
  if (sleepRestrictionConditionWithoutCause(userAnswers)) {
  recommendations.add(everyNoText);
  recommendations.add(sleepRestrictionText);
  }

  // Check if meets the sleep restriction recommendation condition, with another cause
  if (sleepRestrictionWithOtherCauseCondition(userAnswers)) {
    recommendations.add(chronicInsomniaDiagnosisAdditional);
    recommendations.add(sleepRestrictionText);
  }

  // Display recommendations
  displayRecommendations();

  // Display the other resources
  displayOtherResources();

}

function displayRecommendations() {
  // Clear the question display area
  document.getElementById('questionDiv').innerHTML = '';

  // Create the accordion button
  let accordion = document.createElement('button');
  accordion.innerHTML = "Show Questionnaire Answers";
  accordion.className = "accordion";

  // Create the panel to display answers
  let panel = document.createElement('div');
  panel.className = "panel";

  // Add answers to the panel
  for (const [questionID, answer] of Object.entries(userAnswers)) {
    const question = questions.find(q => q.id === parseInt(questionID));
    if (question) {
      panel.innerHTML += `<p><strong>${question.text}</strong><br>Answer: ${answer}</p>`;
    }
  }

  // Show the recommendations with a heading
  const recommendationsDiv = document.getElementById('recommendationsDiv');
  recommendationsDiv.innerHTML = "<h2>Recommendations</h2>";

  // Check if there is more than one recommendation
  if (recommendations.size > 1) {
    let ul = document.createElement('ul');
    recommendations.forEach(recommendation => {
      let li = document.createElement('li');
      li.innerHTML = recommendation;
      ul.appendChild(li);
    });
    recommendationsDiv.appendChild(ul);
  } else if (recommendations.size === 1) {
    let p = document.createElement('p');
    p.innerHTML = Array.from(recommendations)[0];  // Convert set to array and get the first element
    recommendationsDiv.appendChild(p);
  }

  recommendationsDiv.appendChild(accordion);
  recommendationsDiv.appendChild(panel);
  recommendationsDiv.classList.remove('hidden');

  // Add accordion functionality
  accordion.addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });

  // Change button text to 'Restart' and show the button
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('startButton').innerText = 'Restart';

  // Create a 'Copy to Clipboard' button
  const copyButton = document.createElement('button');
  copyButton.innerHTML = 'Copy link of this page to Clipboard';
  copyButton.id = 'copyButton';
  copyButton.addEventListener('click', function() {
    // Create a temporary textarea element to hold the URL
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = generateURL();  // Assuming generateURL() returns the URL as a string
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    
  });

  // Append the 'Copy to Clipboard' button to the recommendationsDiv
  startAndPrint.appendChild(copyButton);


  // Show the Print button
  document.getElementById('printButton').style.display = 'block';


  // Show the credits Div
  document.getElementById('creditsDiv').style.display = 'block';


}



function updateProgressBar(currentQuestionIndex, totalQuestions) {
  const progressBar = document.getElementById('progressBar');
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.style.width = progress + '%';
  
  if (progress > 0) {
    progressBar.innerText = Math.round(progress) + '%';
  } else {
    progressBar.innerText = '';  // Empty string when progress is 0
  }
}

function displayOtherResources() {
  const otherResourcesDiv = document.getElementById('otherResourcesDiv');
  otherResourcesDiv.innerHTML = `
    <h2>Other Resources</h2>
    <ul>
      <li>Te Kete Sleep resource: <a href='https://healthify.nz/tools/t/te-kete-haerenga-and-sleep/' target='_blank'>Te Kete Sleep resource on Healthify</a></li>
      <li>Sleep apps: <a href='https://healthify.nz/apps/s/sleep-apps/' target='_blank'>Sleep App Reviews on Healthify</a></li>
      <li>Just a thought course: <a href='https://healthify.nz/apps/m/managing-insomnia-just-a-thought-course/' target='_blank'>Just a Thought Insomnia Course</a></li>
    </ul>
  `;
  otherResourcesDiv.classList.remove('hidden');
}

function printQuestionnaire() {
  // Find the accordion button for showing answers
  const accordion = document.querySelector('.accordion');
  
  // Find the panel that is the next sibling element of the accordion
  const panel = accordion.nextElementSibling;
  
  // Check if the accordion is already open by checking the display property of the panel
  if (panel.style.display !== "block") {
    // If it's not open, simulate a click to open it
    accordion.click();
  }
  
  // Initiate print dialog
  window.print();
}


// Add this function to generate a URL based on the user's answers
function generateURL() {
  const jsonString = JSON.stringify(userAnswers);
  const base64String = btoa(jsonString);
  const newURL = `${window.location.origin}${window.location.pathname}?data=${base64String}`;
  
  // Show the new URL to the user, for example, in an alert or some UI element
  return newURL;
}

// Add this function to load answers from a URL
function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const base64String = urlParams.get('data');
  
  if (base64String) {
    const jsonString = atob(base64String);
    userAnswers = JSON.parse(jsonString);
    document.getElementById('instructionsDiv').style.display = 'none';
    // Re-generate recommendations based on these answers
    generateRecommendations();
  }
}

// Add this line to call loadFromURL when the page loads
window.addEventListener("load", loadFromURL);
