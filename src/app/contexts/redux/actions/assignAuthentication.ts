
const assignMainLayout = (params: { type: any; value: any }) => async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
  
  dispatch({
    type: params?.type,
    payload: params?.value
  })

}

export default assignMainLayout