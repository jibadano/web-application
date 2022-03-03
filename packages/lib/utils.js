import { useRouter } from 'next/router'
export const formatMoney = (
  amount,
  decimalCount = 0,
  decimal = ',',
  thousands = '.'
) => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    )
  } catch (e) {
    console.log(e)
  }
}

export const scaleImage = (img, size) =>
  img &&
  (size
    ? img
        .replace('upload/', `upload/c_scale,w_${size}/`)
        .replace(/\.jpg$/, '.webp')
    : img)

export const addPadding = (id) => {
  if (!id) return ''
  let result = ''
  for (let i = id.toString().length; i < 6; i++) {
    result += '0'
  }
  return result + id.toString()
}

export const useNavigate = () => {
  const router = useRouter()
  return (url) =>
    router
      .push(url)
      .then(() => typeof window != 'undefined' && window.scrollTo(0, 0))
}

export const formatId = (input = '') =>
  input
    .toString()
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-zA-Z0-9\-]/g, '')
