/**
 * Estado central da aplicação e respetivo reducer.
 *
 * Mantém TODA a configuração da thumbnail num único sítio, facilitando a
 * manutenção e a futura ligação a base de dados / bibliotecas / IA.
 */
import { newRandomSeed } from '@utils/backgrounds'

export const initialState = {
  // --- Pregador ---
  preacherName: '',
  isPastor: false,

  // --- Mensagem ---
  messageType: 'single', // 'single' (isolada) | 'series'
  seriesName: '',
  messageTitle: '',

  // --- Ajustes de texto ---
  text: { scale: 1, posX: 0, posY: 0 },

  // --- Fundo das mensagens isoladas (seed sorteável) ---
  singleSeed: newRandomSeed(),
}

export function thumbnailReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }

    case 'TOGGLE_PASTOR':
      return { ...state, isPastor: !state.isPastor }

    case 'SET_MESSAGE_TYPE':
      return { ...state, messageType: action.value }

    case 'SET_TEXT':
      return { ...state, text: { ...state.text, ...action.patch } }

    case 'RESET_TEXT':
      return { ...state, text: { scale: 1, posX: 0, posY: 0 } }

    case 'SHUFFLE_SEED':
      return { ...state, singleSeed: newRandomSeed() }

    default:
      return state
  }
}
