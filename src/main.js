import Vue from 'vue'
import vuetify from './plugins/vuetify'
console.log(process.env.NODE_ENV)
try {

    console.log(`__dirname`,__dirname)
    const { patchManager } = require(`./patchManager`)
    const App = require(`./App.vue`).default
    console.log(`I TRY IT`)

    Vue.config.errorHandler = function(err, vm, info) {

        if(process.env.NODE_ENV !== `production`) {
            // DEV
            console.error(`Vue Launcher Error: ${err.toString()}\nInfo: ${info}`)
        } else {
            // Production
            alert(`BLA BLA BLA`)
            console.error(`Vue Launcher Error: ${err.toString()}\nInfo: ${info}`)
        }
    }
    Vue.config.productionTip = false

    const Translator = require(`./trans/translator`)

    /**
     *
     * @param value
     * @param {{}} params
     * @returns {*}
     */
    Translator.qTranslate = function (value, params) {
        return this.translate(patchManager.language, value, params)
    }

    // translate filter
    Vue.filter(`trans`, function (value, params) {
        return Translator.qTranslate(value, params)
    })

    new Vue({
        vuetify,
        render: h => h(App)
    }).$mount(`#app`)
} catch (e) {
    if(process.env.NODE_ENV !== `production`) {
        // DEV
        throw (e)
    } else {
        // Production
        alert(e)
        require(`electron`).remote.getCurrentWindow().close()
    }
}