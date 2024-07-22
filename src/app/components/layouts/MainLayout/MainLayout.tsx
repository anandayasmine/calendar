"use client"
import React from 'react';
import _ from 'lodash'
import Router, { withRouter } from 'next/router'
import classnames from 'classnames'
import { connect, ConnectedProps } from "react-redux";
import { assignMainLayout, assignAuthentication } from "@/app/contexts/redux/actions";
import nProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import {
  Loader,
  IconButton,
  NoticeCard,
  ModalConfirm as ModalConfirmLeave,
  ModalConfirm as ModalFeatureLocked,
} from '@/components/index';


import {
  getHead,
} from '@/app/data/head'


import { closeSnackbar, SnackbarKey, SnackbarProvider } from 'notistack';

import Helpers from '@/app/utils/Helpers';

import {
  Auth,
  TempData
} from '@/app/data/local';
import { HeaderMainLayout, Navigation } from './sections';

export interface IMainLayoutProps {
  children?: any;
  useContentOnly?: boolean;
  assignMainLayout?: (params: any) => void;
  assignAuthentication?: (params: any) => void;
  showLoader?: boolean;
  openAlertOnLeave?: boolean;
  showAlertOnLeave?: boolean;
  openLoader?: boolean | number;
  router?: any;
}

export interface IMainLayoutState {
  headModalConfirm?: any;
  modalFeatureLocked?: any;
  mainClassName: string;
  showLoader?: boolean;
  showHeader?: boolean;
  showNavigation?: boolean;
  isAccessValid?: boolean;
  showAlertOnLeave?: boolean;
  headNoticeCard?: any;
  minimize?: boolean;
  openLoader?: boolean | number;
  modalConfirmLeave?: {
    head?: any;
    isOpen?: boolean;
    headType?: string;
    link?: string;
    type?: string;
    useBack?: boolean;
  };
}


class MainLayout extends React.Component<IMainLayoutProps, IMainLayoutState> {

  // === Notes ===
  // => Handling Alert On Leave 

  constructor(props: IMainLayoutProps) {
    super(props);

    this.state = {
      mainClassName: 'main-layout',
      showLoader: false,
      showHeader: true,
      showNavigation: true,
      isAccessValid: true,
    }

  }
  closeLoader() {
    this.setState({
      showLoader: false
    })
  }

  handleTimeout(timeout: number) {
    setTimeout(async () => {
      this.closeLoader()
    }, timeout);
  }

  openLoader() {

    this.setState({
      showLoader: true
    })

    this.handleTimeout(5000)

  }



  async handleAcceptModalConfirmLeave() {

    try {

      const {
        state: {
          modalConfirmLeave,
        }
      } = this


    }
    catch (err) {


    }

  }


  async handleOpenModalConfirmLeave(params: { link: any; useBack: any; headType: any; }) {

    try {

      await this.setState({
        showAlertOnLeave: true,
        modalConfirmLeave: {
          isOpen: true,
          link: params?.link,
          useBack: params?.useBack,
          headType: params?.headType || 'leavePage',
        },
      })

    }
    catch (err) {


    }

  }

  async handleCloseModalConfirmLeave() {

    try {

      await this.setState({
        modalConfirmLeave: {
          isOpen: false,
          head: {},
          type: '',
        },
      })

    }
    catch (err) {


    }


  }

  async openLoginScreen() {

    try {


      this.handleCloseModalFeatureLocked()

      if (this.props.assignAuthentication) {

        this.props.assignAuthentication({
          type: 'ASSIGN_SHOW_LOGIN',
          value: Helpers.randomNumber(100)
        })


      }


    }
    catch (err) {


    }

  }

  async handleOpenModalFeatureLocked(params: any) {

    try {

      this.setState({
        modalFeatureLocked: {
          isOpen: true,
          headType: 'featureLocked',
          ...(params || {}),
        },
      })

    }
    catch (err) {


    }

  }

  async handleCloseModalFeatureLocked() {

    try {

      const {
        state: {
          modalFeatureLocked
        },
        props: {

        }
      } = this

      if (modalFeatureLocked?.strictOnClose) { //=> go back on close

        await this.openLoader()

        if (modalFeatureLocked?.strictOnClose?.href) {

          await Router.replace(modalFeatureLocked?.strictOnClose?.href)

        }
        else {

          await Router.back()

        }

        await this.closeLoader()

      }

      await this.setState({
        modalFeatureLocked: {
          isOpen: false,
          head: null,
        },
      })




      if (this.props.assignMainLayout) {
        this.props.assignMainLayout({
          type: 'ASSIGN_OPEN_FEATURE_LOCKED_ALERT',
          value: false
        })
      }



    }
    catch (err) {

      await this.closeLoader()

    }

  }
  async handleEvent(params: { type: any; }) {

    try {


      switch (params?.type) {

        case 'click-nav-action': {

          this.setState({
            showNavigation: !this.state.showNavigation
          })


        } break
      }

    }
    catch (err) {

      this.closeLoader()

    }

  }




  assignPropsLoader() {
    this.setState({
      showLoader: this.props.showLoader,
    })
  }

  assignHead() {

    try {

      TempData.init()

      const headNoticeCard = getHead({ name: 'headNoticeCard' })['accessDenied' as keyof object]
      const headModalConfirm = getHead({ name: 'headModalConfirm' })
      // const showNavigation = this.props.showNavigation || TempData.getData('ASSIGN_SHOW_NAVIGATION')


      this.setState({
        // showNavigation,
        headNoticeCard,
        headModalConfirm
      })

    }
    catch (err) {


    }

  }

  onUnload(e: { preventDefault: () => void; returnValue: string; }) { // the method that will be used for both add and remove event
    e.preventDefault();
    e.returnValue = '';
  }



  assignSessionId() {

    try {

      if (!window.sessionStorage?.sessionId) {

        const sessionId = parseInt((new Date().getTime() + '' + Helpers.randomNumber(100)).toString())
        window.sessionStorage.sessionId = sessionId

      }

    }
    catch (err) {


    }

  }



  async componentDidMount() {

    await this.openLoader()

    await this.assignSessionId()
    await this.assignHead()

    this.setState({
      minimize: window.innerWidth > 768 && window.innerWidth < 1100 ? true : false,
      showAlertOnLeave: this.props.showAlertOnLeave,
    })

    if (this.props.showAlertOnLeave) {

      window.addEventListener("beforeunload", this.onUnload)

    }
    else {

      window.removeEventListener("beforeunload", this.onUnload)

    }

    Router.events.on('routeChangeStart', () => {
      this.openLoader()
      nProgress.start()
    })

    Router.events.on('routeChangeComplete', () => {
      nProgress.done()
    })

    Router.events.on('routeChangeError', () => {
      nProgress.done()
    })

    await this.assignPropsLoader()
    await this.closeLoader()

  }

  async componentDidUpdate(prevProps: {
    showAlertOnLeave?: any;
    alert?: any;
    openLoader?: any;
    openAlertOnLeave?: any;
    openFeatureLockedAlert?: any;
    showMainLayout?: any;
    router?: {
      asPath?: any;
      pathname?: any;
    };
  }) {

    try {





      // ======================================================================
      // ======= Show Alert On Leave (Usually used for Page Forms )============
      // ======================================================================

      if (prevProps.showAlertOnLeave != this.props.showAlertOnLeave) {


        if (this.props.showAlertOnLeave) {
          window.addEventListener("beforeunload", this.onUnload);

        }
        else {
          window.removeEventListener("beforeunload", this.onUnload);

        }

        await this.setState({
          showAlertOnLeave: this.props.showAlertOnLeave
        })

        if (!this.props.showAlertOnLeave) {
          this.handleCloseModalConfirmLeave()
        }

      }




      // =============================================================================
      // ======================= Directly Open Loader ================================
      // =============================================================================

      if (prevProps.openLoader != this.props.openLoader) {

        this.setState({
          openLoader: this.props.openLoader || TempData.getData('ASSIGN_OPEN_LOADER')?.data
        })

      }











      // ======================================================================
      // ========================== Open LOADER ===============================
      // ======================================================================

      if (prevProps.openLoader != this.props.openLoader) {


        if (this.props.openLoader) {

          this.openLoader()

        }
        else {

          await this.closeLoader()

        }

      }



      // ======================================================================
      // ============================ On Router Changed (ASPATH) =======================
      // ======================================================================

      if (prevProps?.router?.asPath != this.props?.router?.asPath) { //=> more specific than using pathname will consider query change

        TempData.init()

      }





      // ======================================================================
      // ======================= On Router Changed ============================
      // ======================================================================


      if (prevProps?.router?.pathname != this.props?.router?.pathname) {

        TempData.setData({
          name: 'history',
          type: 'session',
          data: [...(TempData.getData('history') || []), prevProps?.router?.pathname]
        })

      }





    }
    catch (err) {


    }

  }

  componentWillUnmount() {

    if (this.state.showAlertOnLeave) {

      window.removeEventListener("beforeunload", this.onUnload);

    }
  }


  render() {

    const {
      state: {
        mainClassName,
        showAlertOnLeave,
        isAccessValid,
        headNoticeCard,
        showNavigation,
        showLoader,
      },
      props: {
        children,
        useContentOnly,
      },
    } = this


    const className = classnames(
      mainClassName,
      (useContentOnly ? 'content-only' : ''),
      (showNavigation ? 'show-navigation' : ''),
    )


    const snackbarConfig = {
      autoHideDuration: 3000,
      action: (snackbarId: SnackbarKey | undefined) => (
        <IconButton icon='Close' color='white' handleClick={() => closeSnackbar(snackbarId)} />
      )
    }


    return (
      <SnackbarProvider {...(snackbarConfig || {})}>
        <div
          className={className}
        >
          <div className={mainClassName + '-content'}>


            <Loader isOpen={showLoader} />


            <HeaderMainLayout
              navAction={this.handleEvent.bind(this)}
            />

            <div className={mainClassName + '-content-main'}>
              {
                isAccessValid ?
                  children
                  :
                  <div className={mainClassName + '-content-notice-card'}>
                    <NoticeCard
                      {...headNoticeCard}
                      useButton={[{
                        ...(headNoticeCard?.useButton[0]),
                        href: '/' + Router?.router?.locale
                      }]}
                    />
                  </div>
              }
            </div>


            <div className={mainClassName + '-block-navigation'}>

              <Navigation
                showAlertOnLeave={showAlertOnLeave}
                handleOpenModalConfirmLeave={this.handleOpenModalConfirmLeave.bind(this)}
              
              />

            </div>



          </div>

        </div>
      </SnackbarProvider>

    )
  }
}

const mapState = (state: { mainLayout: IMainLayoutState; }) => {

  return {
    ...(state.mainLayout || {})
  }

}
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector((MainLayout))