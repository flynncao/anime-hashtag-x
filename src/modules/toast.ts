import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { type UserModule } from '~/types'

const options: PluginOptions = {
  // You can set your default options here
}
export const install: UserModule = ({ app }) => {
  app.use(Toast, options)
}
