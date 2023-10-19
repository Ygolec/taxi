

export function telephone(data){
    const pattern = "\\d{10}"
    if (data.match(pattern)){
        return true;
    } else return 'Вы ввели неправильный номер телефона'
}
export function email(data) {
    const pattern="^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    if (data.match(pattern)){
        return true;
    } else return "Вы ввели неправильный Email";
}
export function required(value) {
    return !!value || 'Это обязательное поле'
}
export function password(data) {
    const pattern = "^[a-zA-Z]\\w{3,21}$"
    if (data.match(pattern)){
        return true;
    } else return "Неверный пароль: минимальная длина пароля 4, без кириллицы";
}
export function birthday(data) {
    const value=new Date(data)
    const today=new Date()
    const difYears=today.getFullYear()-value.getFullYear();
    if (difYears>=14){
        return true;
    } else return "Вам должно быть больше 14 лет"
}
export function checkSecondPassword(password){
    return (secondPassword)=>{if (password==secondPassword)return true ;else return "Пароли не сопадают"}

}