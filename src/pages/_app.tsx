import type { AppProps } from 'next/app'
import '@/app/assets/styles/index.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { enUS } from '@mui/material/locale';
import App from 'next/app';
import Authentication from '@/app/contexts/Authentication';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '@/app/contexts/redux/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { MainLayout } from '@/app/components';
import { Helpers } from '@/app/utils';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


class index extends App<AppProps> {

  state = {
    theme: {}
  }

  componentDidMount(): void {
    const theme = createTheme(
      {
        palette: {
          primary: { main: Helpers.getColor('primary') },
          secondary: { main: Helpers.getColor('secondary') },
        },
      },
      enUS,
    )

    this.setState({
      theme
    })


    const localeData = require("dayjs/plugin/localeData");
    dayjs.extend(localeData)

  }



  render() {
    const { Component, pageProps } = this.props
    const { theme } = this.state



    return (
      <Provider store={createStore(reducers, applyMiddleware(thunkMiddleware))}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <Authentication> {/* ===  With Redux: authenticationReducers === */}
              <MainLayout> {/* ===  With Redux: mainLayoutReducers === */}
                <Component {...pageProps} />
              </MainLayout>
            </Authentication>
          </ThemeProvider>
        </LocalizationProvider>
      </Provider>
    )
  }
}

export default index
