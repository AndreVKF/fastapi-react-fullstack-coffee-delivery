import americanoImg from '../assets/images/items/americano.svg'
import arabeImg from '../assets/images/items/arabe.svg'
import cafeComLeiteImg from '../assets/images/items/cafe_com_leite.svg'
import cafeGeladoImg from '../assets/images/items/cafe_gelado.svg'
import capuccinoImg from '../assets/images/items/capuccino.svg'
import chocolateQuenteImg from '../assets/images/items/chocolate_quente.svg'
import cubanoImg from '../assets/images/items/cubano.svg'
import expressoCremosoImg from '../assets/images/items/expresso_cremoso.svg'
import expressoImg from '../assets/images/items/expresso.svg'
import havaianoImg from '../assets/images/items/havaiano.svg'
import irlandesImg from '../assets/images/items/irlandes.svg'
import latteImg from '../assets/images/items/latte.svg'
import macchiatoImg from '../assets/images/items/macchiato.svg'
import mochaccinoImg from '../assets/images/items/mochaccino.svg'

export type CoffeTypes =
  | 'americano'
  | 'arabe'
  | 'cafeComLeite'
  | 'cafeGelado'
  | 'capuccino'
  | 'chocolateQuente'
  | 'cubano'
  | 'expressoCremoso'
  | 'expresso'
  | 'havaiano'
  | 'irlandes'
  | 'latte'
  | 'macchiato'
  | 'mochaccino'

const ImageDict = {
  americano: americanoImg,
  arabe: arabeImg,
  cafeComLeite: cafeComLeiteImg,
  cafeGelado: cafeGeladoImg,
  capuccino: capuccinoImg,
  chocolateQuente: chocolateQuenteImg,
  cubano: cubanoImg,
  expressoCremoso: expressoCremosoImg,
  expresso: expressoImg,
  havaiano: havaianoImg,
  irlandes: irlandesImg,
  latte: latteImg,
  macchiato: macchiatoImg,
  mochaccino: mochaccinoImg,
}

export function imageMapping(imageKey: CoffeTypes) {
  const image = ImageDict[imageKey]

  if (!image) return expressoImg

  return image
}
