/**
 * Context que disponibiliza o estado e as ações a toda a app, evitando
 * prop-drilling e mantendo os componentes simples e reutilizáveis.
 */
import { createContext, useContext, useMemo, useReducer } from 'react'
import { initialState, thumbnailReducer } from './thumbnailReducer'

const ThumbnailContext = createContext(null)

export function ThumbnailProvider({ children }) {
  const [state, dispatch] = useReducer(thumbnailReducer, initialState)

  // --- Ações de alto nível (memorizadas) ---
  const actions = useMemo(
    () => ({
      setField: (field, value) => dispatch({ type: 'SET_FIELD', field, value }),
      togglePastor: () => dispatch({ type: 'TOGGLE_PASTOR' }),
      setMessageType: (value) => dispatch({ type: 'SET_MESSAGE_TYPE', value }),

      setText: (patch) => dispatch({ type: 'SET_TEXT', patch }),
      resetText: () => dispatch({ type: 'RESET_TEXT' }),

      shuffleSeed: () => dispatch({ type: 'SHUFFLE_SEED' }),
    }),
    []
  )

  const value = useMemo(() => ({ state, actions }), [state, actions])

  return <ThumbnailContext.Provider value={value}>{children}</ThumbnailContext.Provider>
}

/** Hook de acesso ao estado/ações da thumbnail. */
export function useThumbnail() {
  const ctx = useContext(ThumbnailContext)
  if (!ctx) throw new Error('useThumbnail tem de ser usado dentro de <ThumbnailProvider>')
  return ctx
}
