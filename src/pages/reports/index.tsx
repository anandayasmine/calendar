"use client"
import React from 'react'

import { TableEditor } from '@/components/index'
import { getHead } from '@/app/data/head';
import { PostsAPI, UsersAPI } from '@/app/data/api';
import { APIHelpers, Helpers } from '@/app/utils';
import _ from 'lodash';

export interface IIndexPageProps {
}

export interface IIndexPageState {
  head: any,
  data?: Array<any> | null | undefined,
  dataPostWithKeyword: any,
  keyword: string,
}

export default class IndexPage extends React.Component<IIndexPageProps, IIndexPageState> {
  constructor(props: IIndexPageProps) {
    super(props);

    this.state = {
      head: {},
      data: null,
      dataPostWithKeyword: [],
      keyword: 'rerum',
    }
  }

  async getPosts(params: any) {

    try {

      const{
        state:{
          keyword,
          dataPostWithKeyword
        }
      } = this


      const {
        query
      } = params


      const response: any = await PostsAPI.getPosts(query)

      if (response?.status == 200) {

        const refactorData = response?.payload?.map((item:any)=>{

          const regExp = new RegExp(keyword, "gi")
          const isKeywordExist = item?.body.match(regExp)

          if(isKeywordExist){

            dataPostWithKeyword.push(item?.id)
            const newDataPostWithKeyword = _.uniq(dataPostWithKeyword)

            this.setState({
              dataPostWithKeyword: newDataPostWithKeyword
            })

          }

          return item

        })
        

        return refactorData

      }
      else {

        Helpers.openSnackbar()

      }

    }
    catch (err) {


    }

  }

  async getUsers(params: any) {

    try {

      const head = params?.head

      const response: any = await UsersAPI.getUsers()

      if (response?.status == 200) {

        const refactorData = response?.payload?.map((item: any, index: number) => {

          const value = APIHelpers.refactorDatabaseToHeadTable(head?.table?.columns, item)
          
          return {
            ...(value || {}),
            index: index + 1,
            id: item?.id,
          }

        })


        return refactorData

      }
      else {

        Helpers.openSnackbar()

      }

    }
    catch (err) {


    }

  }



  async getReports(params: any) {

    try {

      const head = params?.head


      const dataUsers: Array<any> = await this.getUsers({head})

      if (dataUsers?.length > 0) {

        let refactorData:any = null

        const fetchUserPosts = async (i: any, _this:any) => {
          
          const userPosts = await _this.getPosts({
            query: {
              userId: dataUsers[i]?.id
            }
          })

          if(_.isNull(refactorData)){
            refactorData=[]
          }

          refactorData?.push({
            ...(dataUsers[i] || {}),
            postCount: userPosts?.length
          })
        }



        await Helpers.delayFunction({
          func: fetchUserPosts,
          length: dataUsers?.length,
          delay: 500,
          _this: this,
        })

        return refactorData

      }




    }
    catch (err) {


    }

  }


  async getOverview(params: any){

    try{

      const {
        state:{
          dataPostWithKeyword
        }
      } = this


      const head = params?.head

      const refactorHeadOverview = head?.cardOverview?.map((item:any)=>{

        if(item?.id == 'post-rerum-count'){

          return {
            ...(item||{}),
            value: dataPostWithKeyword?.length
          }

        }

        return item

      })

      return refactorHeadOverview

    }
    catch(err){
      

    }

  }



  async assignHead() {

    try {

      const head = getHead({ name: 'headTableEditorReports' })

      const data = await this.getReports({ head })
      const dataOverview = await this.getOverview({ head })


      head['cardOverview'] = dataOverview

      this.setState({
        head,
        data: data,
      })

    }
    catch (err) {


    }

  }

  async componentDidMount(): Promise<void> {
    await this.assignHead()
  }

  public render() {

    const {
      state: {
        head,
        data,
      },
      props: {

      }
    } = this


    return (
      <TableEditor
        head={head}
        rows={data}
      />
    );
  }
}
