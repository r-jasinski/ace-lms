import { htmlToText } from 'html-to-text'

export const slugify = str => {
  str = htmlToText(str)
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()

  var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  var to = 'aaaaaeeeeiiiioooouuuunc------'

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return str
}
