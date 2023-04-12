import { DirectiveBinding } from "vue";

const maskType = {

    cpf(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2}).*/, '$1')
    },

    cnpj(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2}).*/, '$1')
    },

    tel(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4}).*/, '$1')
    },

    cep(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3}).*/, '$1')
    },

    currency(value: string) {
        return value
            .replace(/\D/g, '')
            .replace(/^0+/, '')
            .replace(/^(\d{1})$/, 'R$ 0,0$1')
            .replace(/^(\d{2})$/, 'R$ 0,$1')
            .replace(/^(\d{1,3})(\d{2})$/, 'R$ $1,$2')
            .replace(/^(\d{1,3})(\d{3})(\d{2})$/, 'R$ $1.$2,$3')
            .replace(/^(\d{1,3})(\d{3})(\d{3})(\d{2})$/, 'R$ $1.$2.$3,$4')
            .replace(/^(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{2})$/, 'R$ $1.$2.$3.$4,$5')
            .replace(/^(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{2}).*$/, 'R$ $1.$2.$3.$4.$5,$6')
    }
}

const mask = {

    beforeMount(el: HTMLInputElement, binding: DirectiveBinding){

        const fn = binding.arg || '';

        if(!maskType.hasOwnProperty(fn)) return;

        
        el.oninput = () => {
            //@ts-ignore
            el.value = maskType[fn](el.value)
        }
    }
}

export default mask;