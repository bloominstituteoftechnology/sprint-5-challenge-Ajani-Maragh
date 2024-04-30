async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

    async function getDataFromEndPoints(endpoint) {
    console.log(`getting data from end point: ${endpoint}...`);
    const response = await axios.get(endpoint);
    const data = response.data;
   
    return data;
  }
  const learnerInfo = document.querySelector('.info')
  learnerInfo.textContent = 'No learner selected'

  const learnersEndPoint = 'http://localhost:3003/api/learners';
  const mentorsEndPoint = 'http://localhost:3003/api/mentors';
  
  const [learnersData, mentorsData] = await Promise.all([
    getDataFromEndPoints(learnersEndPoint),
    getDataFromEndPoints(mentorsEndPoint)
  ]);
  
console.log(learnersData, mentorsData)
  
  const combinedData = [];
  learnersData.forEach(learner => {
    const mentorNames = [];
    learner.mentors.forEach(mentorId => {
      const mentor = mentorsData.find(mentor => mentor.id === mentorId);
      if (mentor) {
        mentorNames.push(`${mentor.firstName} ${mentor.lastName}`)
      } else {
        mentorNames.push('unknown mentor');
      }
    })
    combinedData.push({ ...learner, mentors: mentorNames });
  })

  

  const cards = document.querySelector('.cards');
  combinedData.forEach(learner => {
      const learnerCard = document.createElement('div');
      learnerCard.classList.add('card');
      cards.appendChild(learnerCard);
      
      const learnerName = document.createElement('h3');
      learnerName.textContent = learner.fullName;
      learnerCard.appendChild(learnerName);
      
      const learnerEmail = document.createElement('div');
      learnerEmail.textContent = learner.email;
      learnerCard.appendChild(learnerEmail);

      const mentors = document.createElement('h4');
      mentors.classList.add('closed');
      mentors.textContent = 'Mentors';
      learnerCard.appendChild(mentors);

      
      const ul = document.createElement('ul');
      learnerCard.appendChild(ul);
      
      const li = document.createElement('li');
      li.textContent = learner.mentors[0];
      ul.appendChild(li);
      
      const li2 = document.createElement('li');
      li2.textContent = learner.mentors[1]
      ul.appendChild(li2)
      

      learnerCard.addEventListener('click', (evt) => {
        // change fetching learner cards to no learner selected to the selected learner is learner.fullName
        //append the selected learner is learner.full name after learner cards h2.

        //do event lstener that adds learner id and adds or toggles  selected class to card
        
         if (learnerCard.classList.contains('selected')) {
          learnerCard.classList.remove('selected')
          learnerName.textContent = `${learner.fullName}`
          learnerInfo.textContent = 'No learner selected'
        } else {
          //removing selected from every card except current card
          //loop over the cards, remove the slected class from every single card,
          const allCards = document.querySelectorAll('.card')
          allCards.forEach(card => {
            card.classList.remove('selected')
          })

          learnerInfo.textContent = `The selected learner is ${learner.fullName}`
          learnerName.textContent =  `${learner.fullName},  ID ${learner.id}`
          learnerCard.classList.add('selected')

          
         }

         mentors.addEventListener('click', (evt) => {
          if (learnerCard.classList.contains('selected')) {
             
              evt.stopPropagation()
          }
          if (mentors.classList.contains('closed')) {
           mentors.classList.remove('closed')
            mentors.classList.add('open')
          } else if (mentors.classList.contains('open')) {
            mentors.classList.remove('open')
            mentors.classList.add('closed')
          } 


         })

      
      })
})
  
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  //return cards

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
