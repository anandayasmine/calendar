import { TempData } from "@/app/data/local"

const mainLayoutReducers = (state = {}, action: { type: string; disableSessionStore: any; payload: { constructor: { name: string }; message: any; type: any; headType: any } }) => {

  try {


    const isReduxReset = action.type[0] == '@'

    if (
      !isReduxReset
      &&
      !action.disableSessionStore
    ) {

      TempData.setData({
        name: action.type,
        data: action.payload,
        type: 'pathname'
      })

    }

    let refactorState = {}

    switch (action.type) {

      case 'ASSIGN_USE_CONTENT_ONLY': {
        refactorState = { ...state, useContentOnly: action.payload }
      } break

      case 'ASSIGN_HIDE_HEADER': {
        refactorState = { ...state, hideHeader: action.payload }
      } break

      case 'ASSIGN_SHOW_MAIN_LAYOUT': {
        refactorState = { ...state, showMainLayout: !(Boolean(action.payload)) }
      } break

      case 'ASSIGN_HIDE_NAVIGATION': {
        refactorState = { ...state, showNavigation: !(Boolean(action.payload)) }
      } break

      case 'ASSIGN_SHOW_NAVIGATION': {
        refactorState = { ...state, showNavigation: action.payload }
      } break

      case 'ASSIGN_SHOW_ALERT_ON_LEAVE': {
        refactorState = { ...state, showAlertOnLeave: action.payload }
      } break

      case 'ASSIGN_OPEN_ALERT_ON_LEAVE': {
        refactorState = { ...state, openAlertOnLeave: action.payload }
      } break

      case 'ASSIGN_OPEN_LOADER': {
        refactorState = { ...state, openLoader: true }
      } break

      case 'ASSIGN_CLOSE_LOADER': {
        refactorState = { ...state, openLoader: false }
      } break


      case 'ASSIGN_OPEN_ALERT': {

        const isPayloadBoolean = action?.payload?.constructor.name == 'Boolean'

        refactorState = {
          ...state,
          alert: {
            isOpen: true,
            ...(
              isPayloadBoolean
                ?
                action?.payload ?
                  {
                    headType: 'generalError'
                  }
                  :
                  {
                    isOpen: false
                  }
                :
                {
                  message: action?.payload?.message,
                  type: action?.payload?.type,
                  headType: action?.payload?.headType,
                }
            )
          }
        }

        TempData.setData({
          name: action.type,
          data: refactorState,
          type: 'asPath'
        })

      } break

      default: {

        refactorState = state
        
        TempData.removeData(action.type)

      } break

    }

    return refactorState

  }
  catch (err) {

  }

}

export default mainLayoutReducers