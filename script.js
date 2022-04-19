class FormValidate {
    constructor() {
        this.form = document.querySelector('.formulario')
        this.events()
    }

    events() {
        this.form.onsubmit = e => this.handleSubmit(e)
    }    

    handleSubmit(e) {
        e.preventDefault()
        const valid = this.isValid()
        if(valid) {
            alert('Formulário enviado')
            this.form.submit()
        }
    }

    isValid() {

        let valid = true

        for(let errorText of this.form.querySelectorAll('.message-error')) {
            errorText.remove()
        }

        const fields = this.form.querySelectorAll('.validar')

        for(let field of fields) {
            const label = field.previousElementSibling
            if(!field.value) {
                this.createError(field, `** Campo "${label.innerText}" não pode estar vazio`)
                valid = false
            }

            if(field.classList.contains('name') || field.classList.contains('last-name')) {
                if(field.value.length < 3) {
                    this.createError(field, `** Campo "${label.innerText}" Precisa ter 3 ou mais letras`)
                    valid = false
                }
            }

            if(field.classList.contains('cpf')) {
                if(!this.CPFValidate()) {
                    this.createError(field, '** CPF inválido')
                    valid = false
                }   
            }

            if(field.classList.contains('user')) {
                if(field.value.length < 3 || field.value.length > 12) {
                    this.createError(field, '** Usuário precisa ter entre 3 e 12 caracteres')
                    valid = false
                }

                if(!field.value.match(/^[a-zA-Z0-9]+$/g)) {
                    this.createError(field, '** Usuário aceita apenas letras e/ou números')
                    valid = false
                }
            }

            if(field.classList.contains('password')) {
                const passwordRepeat = this.form.querySelector('.repeat-password')

                if(field.value.length < 6 || field.value.length > 12) {
                    this.createError(field, '** Senha precisa ter entre 6 e 12 caracteres')
                    valid = false
                }
                
                if(field.value !== passwordRepeat.value) {
                    this.createError(field, '** Os campos senha e repetir senha precisam ser iguais')
                    valid = false
                }
            }
        }

        return valid
    }

    CPFValidate () {
        const cpf = this.form.querySelector('.cpf')
        const cpfClear = cpf.value.replace(/\D+/g, '')
        const cpfWithoutDigits = cpfClear.slice(0, 9)
        const digitOne = generateDigits(cpfWithoutDigits)
        const digitTwo = generateDigits(cpfWithoutDigits + digitOne)
        const cpfComplete = cpfWithoutDigits + digitOne + digitTwo

        if(typeof cpf.value !== 'string') return false
        if(cpfClear.length !== 11) return false
        if(cpf.value[0].repeat(11) === cpfClear) return false
        if(cpfComplete !== cpfClear) return false
        
        function generateDigits(cpf) {
            cpf = Array.from(cpf)
            let amount = 0
            let decrementor = cpf.length + 1
            
            for(let cpfString of cpf) {
                amount += decrementor * Number(cpfString)
                decrementor--
            }

            let digit = 11 - (amount % 11)
            return digit > 9 ? '0' : String(digit) 
        }

        return true
    }

    createError (field, message) {
        const p = document.createElement('p')
        p.classList.add('message-error')
        p.innerText = message
        field.after(p)
        // field.insertAdjacentElement('afterend', small)
    }

}

const validate = new FormValidate()
