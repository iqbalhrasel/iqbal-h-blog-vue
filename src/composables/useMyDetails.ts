import { ref } from "vue"

const details = ref({
  name: 'Iqbal Hossain',
  phone: '+880 1753 505 971',
  email: 'iqbal.h.rasel@gmail.com',
  linkedin: 'linkedin.com/in/iqbalhrasel',
  github: 'github.com/iqbalhrasel',
  resume: 'https://docs.google.com/document/d/1HrCh9kHpVvLI9LN8nz4FnSmQHvrAsDd9iSRz9bTcr_c/export'
})

export function useMyDetails() {
  return { details }
}