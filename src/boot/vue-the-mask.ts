import { mask } from 'vue-the-mask'

//@ts-ignore
export default ({ app }) => {
    app.directive('mask', mask)
}