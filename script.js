const defaultText = document.querySelector("#default-text");
const calculationsContainer = document.querySelector("#calculations-container");

document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected')
        })

        if (this.checked) {
            this.parentElement.classList.add('selected')
        }
    })
})
    document.querySelector("#calculate-btn").addEventListener('click', () => {
        const amount = parseFloat(document.querySelector("#mortgage-amount").value)
        const term = parseFloat(document.querySelector("#mortgage-term").value)
        const rate = parseFloat(document.querySelector("#interest-rate").value) / 100
        const mortgageType = document.querySelector("input[name='mortgage-type']:checked");
    
    
        let isValid = true     
    
        document.querySelectorAll('.form-flex').forEach(el => {
            el.classList.remove('error')
        })

        if (isNaN(amount) || amount <= 0) {
            document.querySelector('#amount-alert').style.display = 'block'
            document.querySelector('#mortgage-amount-main').classList.add('error')
            isValid = false
        } else {
            document.querySelector('#amount-alert').style.display = 'none'
        }

    

        if (isNaN(term) || term <= 0) {
            document.querySelector('#term-alert').style.display = 'block'
            document.querySelector('#mortgage-term-main').classList.add('error')
            isValid = false
        } else {
            document.querySelector('#term-alert').style.display = 'none'
        }


        if (isNaN(rate) || rate <= 0) {
            document.querySelector('#rate-alert').style.display = 'block'
            document.querySelector('#interest-rate-main').classList.add('error')
            isValid = false
        } else {
            document.querySelector('#rate-alert').style.display = 'none'
        }

        if (!mortgageType) {
            document.querySelector('#type-alert').style.display = 'block'
            document.querySelectorAll('.radio-inputs').forEach(el => {
                el.classList.add('error')
            })
            isValid = false
        } else {
            document.querySelector('#type-alert').style.display = 'none'
            document.querySelectorAll('.radio-inputs').forEach(el => {
                el.classList.remove('error')
            })
        }

        if (isValid){
            let monthlyPayment = 0
            let totalRepayment = 0

            defaultText.classList.add('hide')
            calculationsContainer.classList.add('show')

            if (mortgageType.value === 'repayment'){
                const monthlyRate = rate / 12
                const n = term * 12
                monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n))
                totalRepayment = monthlyPayment * n
            } else if (mortgageType.value === 'interest-only') {
                monthlyPayment = (amount * rate) / 12
                totalRepayment = monthlyPayment * term * 12
            }
            
            document.querySelector('#result').innerText = `£ ${monthlyPayment.toFixed(2)}`
        document.querySelector('#term-result').innerText = `£ ${totalRepayment.toFixed(2)}`
                
            } else {
document.querySelector("#result").innerText = ''
document.querySelector('#term-result').innerText = ''
            
defaultText.classList.remove('hide')
calculationsContainer.classList.remove('show')
            }        
        })

        document.querySelector('#clear-btn').addEventListener('click', () => {
            document.querySelector('#mortgage-form').reset()
            document.querySelector('#result').innerText = ''
            document.querySelector('#term-result').innerText = ''
            document.querySelectorAll('.form-alert').forEach(alert => {
alert.style.display = 'none'
            })

            defaultText.classList.remove('hide')
            calculationsContainer.classList.remove('show')

            document.querySelectorAll('.radio-inputs').forEach(div => {
                div.classList.remove('selected')
            })

            document.querySelectorAll('.form-flex').forEach(el => {
                el.classList.remove('error')
           })
        })
        document.querySelectorAll('.form-alert').forEach(alert => {
            alert.style.display = 'none'
        })
    

   
    
