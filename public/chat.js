const msgContainer = document.querySelector('article.msgContainer')

const form = document.querySelector('form')

const addMessage = (who, msg) => {
  const element = document.createElement('p')
  element.style.justifySelf = who ? 'start' : 'end'
  element.style.display = 'flex'
  element.innerText = msg
  msgContainer.appendChild(element)
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const question = e.target[0].value
  e.target[0].value = ''
  addMessage(true, question)
  const response = await fetch('/chat', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
    body: JSON.stringify({
      question
    })
  })
  const answer = await response.json()
  addMessage(false, answer.answer)
})
