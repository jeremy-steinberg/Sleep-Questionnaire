    // Initialize empty object for user answers
    let userAnswers = {};

    // Sample questions
    const questions = [
      {
        id: 1,
        text: "Do you have trouble falling asleep, staying asleep or waking up early at least three nights a week for at least the last month?",
        options: ["No", "Yes"]
      },
      {
        id: 2,
        text: "Does this interfere with your activities the next day (such as feeling unrefreshed in the morning, fatigued, unable to concentrate, or feeling irritable)?",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        text: "Are you a shift worker?",
        options: ["No", "Yes"]
      },
      {
        id: 4,
        text: "Is your bedroom hot and uncomfortable?",
        options: ["No", "Yes"]
      },
      {
        id: 5,
        text: "Do you drink alcohol, nicotine (cigarettes) or caffeine (coffee, cola, tea, chocolate, energy drinks) in the evenings? ",
        options: ["No", "Yes"]
      },
      {
        id: 6,
        text: "Do you frequently nap during the day or have highly irregular and variable bedtimes or rising times? ",
        options: ["No", "Yes"]
      },
      {
        id: 7,
        text: "Do you engage in mentally stimulating, moderate to strenuous exercise or emotionally upsetting activities within a couple of hours of bedtime?",
        options: ["No", "Yes"]
      },
      {
        id: 8,
        text: "Do you frequently use the bed for activities other than sleep or intimacy? (e.g., television watching, reading, studying, snacking, thinking, planning)",
        options: ["No", "Yes"]
      },
      {
        id: 9,
        text: "During the past month, have you been bothered by feeling down, depressed or hopeless?",
        options: ["No", "Yes"]
      },
      {
        id: 10,
        text: "Or bothered by having little interest or pleasure in doing things?",
        options: ["No", "Yes"]
      },
      {
        id: 11,
        text: "Over the last two weeks, have you been bothered by feeling nervous, anxious, or on edge?",
        options: ["No", "Yes"]
      },
      {
        id: 12,
        text: "Over the last two weeks, have you been bothered by being unable to stop or control worrying? ",
        options: ["No", "Yes"]
      },
      {
        id: 13,
        text: "Do you snore very loudly at night? ",
        options: ["No", "Yes"]
      },
      {
        id: 14,
        text: "Do you fall asleep during the day in waiting rooms or as a passenger in a vehicle? ",
        options: ["No", "Yes"]
      },
      {
        id: 15,
        text: "Do you have any significant health problems affecting your sleep quality, such as pain, difficulty breathing, acid reflux, or night cough? ",
        options: ["No", "Yes"]
      },
      {
        id: 16,
        text: "When you are asleep, do you sleepwalk, sleep talk, grind your teeth, have restless legs or anything else you would consider unusual? ",
        options: ["No", "Yes"]
      },
      {
        id: 17,
        text: "Do you ever feel the need to reduce the amount of alcohol you drink?",
        options: ["No", "Yes"]
      },
      {
        id: 18,
        text: "Do you ever feel the need to cut down on your non-prescription or recreational drug use?",
        options: ["No", "Yes"]
      },
      {
        id: 19,
        text: "Do you go to bed late at night (e.g. after midnight?)",
        options: ["No", "Yes"]
      },
      {
        id: 20,
        text: "When you can, do you prefer to sleep in late in the morning ",
        options: ["No", "Yes"]
      }
    ];

    
    function startQuestionnaire() {

      // Initialise the progress bar to 0%
      updateProgressBar(-1, questions.length);

      const progressBar = document.getElementById('progressBar');
      progressBar.style.width = '0%';
      progressBar.innerText = '0%';


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


}

function displayQuestion(index) {

  updateProgressBar(index, questions.length);

  const questionDiv = document.getElementById('questionDiv');
  const question = questions[index];
  if (!question) {
    questionDiv.classList.add('hidden');
    generateRecommendations();
    return;
  }

  let html = `<p class="question-text">${question.text}</p>`;
  question.options.forEach((option, i) => {
    html += `<label><input type="radio" name="q${index}" value="${option}" onclick="handleUserInput(${index}, '${option}')">${option}</label><br>`;
  });

  document.getElementById('questionDiv').innerHTML = html;
}


    function handleUserInput(index, answer) {
      const questionID = questions[index].id;
      userAnswers[questionID] = answer;

      // Here, you can include logic to decide which question should be next
      displayQuestion(index + 1);
    }

      // Initialize empty Set for unique recommendations
      let recommendations = new Set();

      // ...


function generateRecommendations() {
  // Implement your logic to generate recommendations
  // based on the answers in userAnswers

  // Convert the object values to an array
  const answersArray = Object.values(userAnswers);

  // Check if all answers are 'No'
  if (answersArray.every(answer => answer === 'No')) {
    const everyNoText = `
  <p>If none of the above applies and you still have a sleep problem, you may have chronic insomnia. This is where you have a sleep disorder; there is no other explanation. It is very common and can be helped by several treatments.</p>
  <p>Go to bed later and spend fewer hours in bed. This is sleep restriction or time in bed restriction (see below). </p>
  <p>Other medicines can help you sleep but are difficult to stop once you take them regularly. </p>
  <h3>Time in bed restriction </h3>
  <p>Ensure the diagnosis is most likely to be chronic insomnia, the old name is primary insomnia. You've answered no to all the questions so other common conditions are less likely.<p>
  <p>If for your work you drive vehicles, operate heavy machinery, or do delicate procedures, e.g. surgeons, you should consider treatment during your vacation- sleep deprivation is a short-term safety risk.</p>
  <p>Estimate time spent in bed versus time spent asleep. If you cannot do this from memory, you can use a sleep diary if necessary. Work out what time you go to bed and wake up. Work out how long you stay asleep. Usually, there is a mismatch, e.g. 9 hours in bed and 6 hours asleep. would mean you are diluting their good sleep over 9 rather than 6 hours. Try go to bed later and wake up simultaneously with the rest of your household. Do only quiet, relaxing activities before bedtime. These activities must be done outside the bed and not lying down to avoid naps, which can disrupt the routine. We recommend you keep this new time in bed for two weeks before making any adjustments. People usually reportd that the quality of their sleep improves as they feel they are starting to have a deep sleep and the sleep period is consolidated.</p>
  <p>After two weeks: Nothing else is needed if you is sleeping better and functioning well. Many people prefer to continue on the bed restriction schedule as they find it very effective.</p>
  <p>If you are sleeping better but feel sleep deprived the next day, you may wish to add 30 minutes to the time allowed in bed for another two weeks and continue doing so until the feelings of sleep deprivation disappear while still maintaining continuous sleep at night </p>
  <p>If you are not sleeping better, you may wish to reduce the time in bed by 30 minutes (but not to less than five hours at night). Try each option for at least two weeks before making another change. If you are not sleeping better at five hours per night, you may wish to get some advice from a sleep specialist. You may need an overnight sleep study to see if there are other causes of insomnia, e.g. sleep apnoea or a movement disorder.</p>
  `;
    recommendations.add(everyNoText);
  }

  if (userAnswers[1] === 'Yes' && userAnswers[2] === 'Yes') {
    recommendations.add("You may have a sleep problem, also known as insomnia");
  }

  if (userAnswers[3] === 'Yes') {
  recommendations.add("You answered yes to being a shift worker. See <a href='https://healthify.nz/hauora-wellbeing/s/sleep-shift-work/' target='_blank'>https://healthify.nz/hauora-wellbeing/s/sleep-shift-work/</a>. You may wish to see a sleep specialist if you are having sleep problems.");
  }

  if (userAnswers[4] === 'Yes') {
  recommendations.add("You answered that your bedroom is hot and uncomfortable. You should attend to this.");
  }

  if (userAnswers[5] === 'Yes') {
  recommendations.add("You answered that you drink alcohol, nicotine, or caffeine in the evenings. You should attend to this. See <a href='https://healthify.nz/hauora-wellbeing/s/sleep-and-caffeine/' target='_blank'>https://healthify.nz/hauora-wellbeing/s/sleep-and-caffeine/</a> and <a href='https://healthify.nz/hauora-wellbeing/s/sleep-how-food-drink-affects/' target='_blank'>https://healthify.nz/hauora-wellbeing/s/sleep-how-food-drink-affects/</a>");
  }

  if (userAnswers[6] === 'Yes') {
  recommendations.add("You answered yes to frequent napping. This may be causing your sleep problem. Napping should be limited to about 30 minutes and be done before 1500 hrs.");
  }

  if (userAnswers[7] === 'Yes') {
  recommendations.add("You answered yes to engaging in mentally stimulating, moderate to strenous exercise, or emotionally upsetting acitvities within a couple hours of bedtime. This may be causing or contributing to your sleep problem. You may wish to change these behaviours.");
  }

  if (userAnswers[8] === 'Yes') {
  recommendations.add("You answered yes to frequently using the bed for activities other than sleep or intimacy. This may be causing or contributing to your sleep problem. You may wish to change these behaviours");
  }

  if (userAnswers[9] === 'Yes' || userAnswers[10] === 'Yes') {
  recommendations.add("You may have a mood or depression problem. Discuss this with your GP");
  }

  if (userAnswers[11] === 'Yes' || userAnswers[12] === 'Yes') {
  recommendations.add("You may have a mood, anxiety or stress problem. Discuss this with your GP.");
  }

  if (userAnswers[13] === 'Yes' || userAnswers[14] === 'Yes') {
  recommendations.add("You may have sleep apnoea (OSA). Discuss this with your GP. If you stop breathing at night and have a morning headache and a dry mouth, it will likely be sleep apnoea.");
  }

  if (userAnswers[15] === 'Yes') {
  recommendations.add("You said you have a significant health problem affecting sleep quality. Discuss this with your GP.");
  }

  if (userAnswers[16] === 'Yes') {
  recommendations.add("You may have restless legs or a brain issue. Discuss this with your GP. The technical term for this is a parasomnia.");
  }

  if (userAnswers[17] === 'Yes') {
  recommendations.add("You said yes to feeling the need to reduce the amount of alcohol you drink. Try and reduce this or discuss this with your GP");
  }

  if (userAnswers[18] === 'Yes') {
  recommendations.add("You said yes to feeling the need to reduce the amount of non-prescription or recreational drug use. Try and reduce this or discuss this with your GP");
  }

  if (userAnswers[19] === 'Yes' || userAnswers[20] === 'Yes') {
  recommendations.add("You may have a condition called delayed sleep phase disorder. It can be helped by using a light box in the morning and <a href='https://healthify.nz/medicines-a-z/m/melatonin/' target='_blank'>melatonin</a> at night.");
  }

  recommendations.add("Te Kete Sleep resource: <a href='https://healthify.nz/tools/t/te-kete-haerenga-and-sleep/' target='_blank'>https://healthify.nz/tools/t/te-kete-haerenga-and-sleep/</a>");

  recommendations.add("Sleep apps: <a href='https://healthify.nz/apps/s/sleep-apps/' target='_blank'>https://healthify.nz/apps/s/sleep-apps/</a>");

  recommendations.add("Just a thought course: <a href='https://healthify.nz/apps/m/managing-insomnia-just-a-thought-course/' target='_blank'>https://healthify.nz/apps/m/managing-insomnia-just-a-thought-course/</a>");

  displayRecommendations();
}

    function displayRecommendations() {
  // Clear the question display area
  document.getElementById('questionDiv').innerHTML = '';

  // Create an unordered list element for recommendations
  let ul = document.createElement('ul');

  // Loop through the recommendations and add each one as a list item
  recommendations.forEach(recommendation => {
    let li = document.createElement('li');
    li.innerHTML = recommendation;
    ul.appendChild(li);
  });

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
  recommendationsDiv.appendChild(ul);
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
}


function updateProgressBar(currentQuestionIndex, totalQuestions) {
  const progressBar = document.getElementById('progressBar');
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.style.width = progress + '%';
  progressBar.innerText = Math.round(progress) + '%';
}