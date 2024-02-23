const seatLeftCounterOutputElement = document.querySelector('#seatLeftCounterOutput')
let seatLeftCounter = getValueById('seatLeftCounterOutput')

let seatSelected = 0

document.querySelector('#seatContainer').addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON' && seatSelected < 4 && seatLeftCounter > 0) {
        seatSelected++
        seatLeftCounter = seatLeftCounter - 1
        e.target.classList.remove('bg-[#F7F8F8]')
        e.target.classList.add('bg-[#1DD100]', 'hover:bg-[#1DD100]', 'text-white', 'selected')
        e.target.classList.contains('selected')

        const seat = e.target.innerText
        const ticketsOutput = document.querySelector('#ticketsOutput')
        const li = document.createElement('li')
        li.classList.add('flex', 'justify-between')
        li.innerHTML = `<span>${seat}</span><span>Economic</span><span>550 TK</span>`
        ticketsOutput.appendChild(li)

        const seats = ticketsOutput.querySelectorAll('li')
        const seatsCount = seats.length

        const seatsCounterElement = document.querySelector('#seatsCounterElement')
        seatsCounterElement.innerText = seatsCount

        const totalCostElement = document.querySelector('#totalCost')
        const totalCost = seatsCount * 550
        totalCostElement.innerText = totalCost

        if(seatSelected === 4) {
            const seatAlert = document.querySelector('#seatAlert')
            seatAlert.innerHTML = `<p style="color: red; text-align: center">Your are selected maximum seats</p>`
            handleCouponValidity()
        }
        seatLeftCounterOutputElement.innerText = seatLeftCounter
    }
    
})

const couponBoxElement = document.querySelector('#couponBox')
const couponFieldElement = document.querySelector('#couponField')
const couponNewElement = document.querySelector('#couponNew')
const couponCoupleElement = document.querySelector('#couponCouple')

const passengerNameInput = document.querySelector('#passengerName')
const phoneNumberInput = document.querySelector('#phoneNumber')

const couponBtn = document.querySelector('#couponBtn')
const submitBtn = document.querySelector('#submitBtn')

const couponNew = couponNewElement.innerText
const couponCouple = couponCoupleElement.innerText

couponFieldElement.addEventListener('input', handleCouponValidity)
couponBtn.addEventListener('click', handleCoupon)
passengerNameInput.addEventListener('input', handleFormValidity)
phoneNumberInput.addEventListener('input', handleFormValidity)

function handleCouponValidity() {
    const couponField = couponFieldElement.value.trim()

    if(couponField === couponNew || couponField === couponCouple && seatSelected === 4) {
        couponBtn.disabled = false
    }
    else {
        couponBtn.disabled = true
    }
}

function handleFormValidity() {
    const passengerName = passengerNameInput.value.trim()
    const phoneNumber = phoneNumberInput.value.trim()

    if(passengerName !== '' && phoneNumber !== '') {
        submitBtn.disabled = false
    }
    else {
        submitBtn.disabled = true
    }
}

function handleCoupon() {
    const couponValue = couponFieldElement.value.trim()
    const totalCost = getValueById('totalCost')
    const grandTotalCostElement = document.querySelector('#grandTotalCost')

    if(couponValue === couponNew) {
        const grandTotalCost = totalCost - (totalCost * 0.15)
        grandTotalCostElement.innerText = grandTotalCost
    }
    if(couponValue === couponCouple) {
        const grandTotalCost = totalCost - (totalCost * 0.20)
        grandTotalCostElement.innerText = grandTotalCost
    }

    couponBoxElement.classList.add('hidden')
}

function getValueById(elementID) {
    const element = document.getElementById(elementID)
    const elementText = element.innerText
    const elementValue = parseInt(elementText)
    return elementValue
}

const modal = document.querySelector('#modal')

document.querySelector('#submitBtn').addEventListener('click', function() {
    modal.classList.remove('hidden')
})

document.querySelector('#modalClose').addEventListener('click', function() {
    modal.classList.add('hidden')
})