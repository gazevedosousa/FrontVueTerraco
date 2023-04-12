import { date } from 'quasar'

export const formatPrice = (value: number) => {
    let val = 'R$ ';
    val += (value/1).toFixed(2).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatDate = (value: string) => {
    return date.formatDate(new Date(value).toISOString().slice(0, 23), 'DD/MM/YYYY');
};

export const formatMonth = (value: string) => {
    return date.formatDate(new Date(value).toISOString().slice(0, 23), 'MM/YYYY');
};

const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validEmail = (val: string) => (val == '' || checkEmail.test(val)) || 'Email Inválido';

export const requiredRule = (val: string) => (val && val.length > 0) || 'Campo Obrigatório';

export const selectRequired = (val: number) => (val && val.valueOf != null) || 'Campo Obrigatório';

export const stringToFloat = (value: string) => {
    return parseFloat(value.substring(3).replaceAll('.','').replace(',','.'));
}

export const user = {
    id: '',
    perfil: ''
}

