import * as vueToastification from 'vue-toastification'

const { useToast } = vueToastification

const toast = useToast()

export function handleAxiosError(err?: any) {
  if (err)
    toast.error(err instanceof Error ? err.message : err.toString())
}
export function handleUnexpectedError(err?: any) {
  if (err)
    toast.error(err)
}
