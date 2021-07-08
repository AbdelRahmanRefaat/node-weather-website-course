const log = console.log

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    // prevents the browser from refreshing after submting
    e.preventDefault()
    const location = search.value
    if (!location) {
        return log('You must specify a location!')
    }

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const url = `/weather?address=${location}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })

})