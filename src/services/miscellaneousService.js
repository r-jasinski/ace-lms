export const defaultToastOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
}

export const defaultDialogOptions = {
  html: true, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
  loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
  reverse: false, // switch the button positions (left to right, and vise versa)
  okText: 'Confirmar',
  cancelText: 'Cancelar',
  animation: 'bounce', // Available: "zoom", "bounce", "fade"
  type: 'basic', // coming soon: 'soft', 'hard'
  verification: 'soft', // for hard confirm, user will be prompted to type this to enable the proceed button
  verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
  promptHelp: '',
  clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
  backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
  customClass: '' // Custom class to be injected into the parent node for the current dialog instance
}
