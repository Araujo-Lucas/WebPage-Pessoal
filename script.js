let validador =
{
    handleSubmit: (event) =>
    {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');

        validador.clearErrors();

        for(let i=0; i<inputs.length; i++)
        {
            let input = inputs[i];
            let check = validador.checkInput(input);
            if(check !== true)
            {
                send = false;
                validador.showError(input, check);
            } 
        }

        if(send)
        {
            form.submit();
        }
    },

    checkInput: (input) =>
    {
        let rules = input.getAttribute('data-rules');
        if(rules !== null)
        {
            rules = rules.split('|');
            for(let k in rules)
            {
                let detalhesRegras = rules[k].split('=');
                switch(detalhesRegras[0])
                {
                    case 'required':
                        if(input.value == '')
                        {
                            return 'Este campo deve ser preenchido.';
                        }
                    break;

                    case 'min':
                        if(input.value.length < detalhesRegras[1])
                        {
                            return `O Nome deve ter no mínimo ${detalhesRegras[1]} caracteres`;
                        }
                    break;

                    case 'email':
                        if(input.value != '')
                        {
                            let expRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!expRegular.test(input.value.toLowerCase()))
                            {
                                return 'Email inválido';
                            }
                        }
                    break;

                    case 'tel':
                        if(input.value.length < detalhesRegras[1])
                        {
                            return `O telefone deve ter no mínimo ${detalhesRegras[1]} números`;
                        }
                    break;
                }
            }
        }
        return true;
    },

    showError:(input, error) =>
    {
        input.style.borderColor = 'red';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    clearErrors:() =>
    {
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length; i++)
        {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i<errorElements.length; i++)
        {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validarForm');

form.addEventListener('submit', validador.handleSubmit);






// Slides Projetos
// Variáveis de ambiente
let totalSlides = document.querySelectorAll('.slider-item').length;
let slideAtual = 0;

 let sliderWidth = document.querySelector('.slider').clientWidth;
 document.querySelector('.slider-width').style.width = `${sliderWidth * totalSlides}px`;


 document.querySelector('.slider-controls').style.width = `${sliderWidth}px`;

 document.querySelector('.slider-controls').style.height = `${document.querySelector('.slider').clientHeight}px`;

function goPrev()
{
    slideAtual--;
    if(slideAtual < 0)
    {
        slideAtual = totalSlides - 1;
    }
    updateMargin();
}

function goNext()
{
    slideAtual++;
    if(slideAtual > (totalSlides - 1))
    {
        slideAtual = 0;
    }
    updateMargin();
}

function updateMargin()
{
    let sliderItemWidth = document.querySelector('.slider-item').clientWidth;
    let novaMargin = (slideAtual * sliderItemWidth);
    document.querySelector('.slider-width').style.marginLeft = `-${novaMargin}px`;
}

setInterval(goNext, 10000);