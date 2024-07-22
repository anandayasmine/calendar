
const assignMainLayout = (params: { type: any; disableSessionStore?: any; value: any }) => (dispatch: (arg0: { type: any; disableSessionStore: boolean; payload: any; }) => void) => {
  
  dispatch({
    type: params?.type,
    disableSessionStore: Boolean(params?.disableSessionStore),
    payload: params?.value
  })

}

export default assignMainLayout