import _ from "lodash"
import { ConfigComponents } from "../constant"
import Helpers from "./Helpers"
import { locale } from "@/app/data/head"

function tableSortToParamAPI(headColumns:any = {}, paramSort:any= []) {

  // === From Array of Sort to Object Params ===

  try {


    const config = {
      asc: '',
      desc: '-',
    }

    const arrSort = paramSort.map((item:any) => {

      const sort = config[item.sort as keyof Object]

      const columnItem = headColumns.find((col:any) => col.field == item.field)
      const databaseKey = columnItem?.databaseKey || columnItem?.field

      return sort + '' + databaseKey

    })

    let result = arrSort?.length > 0 ? {
      $sort: arrSort.join(','),
    } : {}

    return result

  }
  catch (err) {

    return {}

  }

}

function tableFilterToParamAPI(headColumns:any = {}, paramFilter:any = []) {

  // === From Array of filter to Object Params ===

  try {


    const config = {
      contains: '$like'
    }

    let result:any = {}

    paramFilter.forEach((item:any) => {

      const operator = config[item.operator as keyof Object]

      const columnItem = headColumns.find((col:any) => col.field == item.field)
      const databaseKey = columnItem?.databaseKey || columnItem?.field

      result[databaseKey + (operator ? '.' + operator : '')] = item.value

    })


    return result

  }
  catch (err) {

    return {}

  }

}

function searchToParamAPI(headColumns:any = {}, paramFilter:any = '', paramContains?:any) {

  try {


    const contains = paramContains || headColumns.filter((item:any) => item.searchable)?.flatMap((item:any) => item.databaseKey || item.field)?.join(',')

    if (contains) {

      let result = paramFilter && {
        ['$search']: contains + '=' + paramFilter,
      }

      return result

    }
    return {}

  }
  catch (err) {

    return {}

  }

}

function refactorParamsPageContext(
  headColumns:any = {},
  params:any = {
    pagination: {},
    filter: [],
    sort: [],
    search: ''
  }
) {

  try {

    return {
      $page: (params?.pagination?.page || ConfigComponents.Table.pageContext?.page) + 1,
      $per_page: params?.pagination?.pageSize || ConfigComponents.Table.pageContext?.pageSize,
      ...(tableFilterToParamAPI(headColumns, params?.filter) || {}),
      ...(tableSortToParamAPI(headColumns, params?.sort) || {}),
      ...(searchToParamAPI(headColumns, params?.search) || {}),
    }

  }
  catch (err) {

    return params

  }

}

function $params(params = {}) {

  try {

    let result:any = {}

    Object.keys(params).forEach((item:string) => {
      result[('$' + item) as keyof Object] = params[item as keyof Object]
    })

    return result

  }
  catch (err) {


    return params

  }

}

function refactorDatabaseToHeadTable(headColumns:Array<any>, objDatabase:any) {

  // === headColumns => Array => on head Column Data Grid ===
  // === objDatabase => Object => response from api per item ===

  try {

    const result:any = {}

    if (headColumns?.length > 0) {

      headColumns.forEach((col:any) => {

        const colField:string = col?.field
        
        if (col?.databaseKey) {
          
          const colValue = Helpers.getDescendantProp(objDatabase, col?.databaseKey)


          if (col?.type == 'number') {

            result[colField as keyof Object] = parseFloat(colValue)

          }
          else if (col?.type == 'boolean') {

            result[colField as keyof Object] = Boolean(colValue)

          }
          else {

            result[colField as keyof Object] = colValue

          }

        }
        else{

          const colValue = Helpers.getDescendantProp(objDatabase, colField)
          
          result[colField as keyof Object] = colValue

        }
      })

    }

    return result

  }
  catch (err) {

    return null


  }
}

async function getTableData(params:any) {

  try {


    const {
      head,
      columns,
      query,
      isExport,

      listFunction,
    } = params

    const {
      getData,
      getTotal,
      exportData,
      postRefactorItem,
    } = listFunction




    // ===================================================================
    // =================== INITIAL CONFIG TABLE ==========================
    // ===================================================================



    const paramsPageContext = refactorParamsPageContext(columns, query)




    // ===========================================================
    // ==================== READY FETCH ==========================
    // ===========================================================

    let response, responseTotal

    const tableEditorQueryKey = [
      'pagination',
      'eventType',
      'search',
      'values',
      'sort',
      'filter',
    ]

    const refactorParams = {
      ...(paramsPageContext || {}),
      ...(Helpers.filterObjectByKey(query, tableEditorQueryKey) || {})
    }




    // ===========================================================
    // ======================= GO FETCH ==========================
    // ===========================================================


    if (getData) {

      response = await getData(refactorParams)

    }

    if (getTotal) {

      responseTotal = await getTotal(refactorParams)

    }

    if (isExport && exportData) {

      response = await exportData({
        ...refactorParams,
        $is_disable_pagination: true,
        title: locale(head?.title)
      })


    }



    if (response.success) {

      let result

      const pageContext = {
        links: response.payload?.links,
        rowCount: response.payload?.count,
        page: response.payload?.page_context?.page - 1,
        pageSize: response.payload?.page_context?.per_page,
        pageTotal: response.payload?.page_context?.total_pages,
        ...(
          responseTotal ?
            {
              aggregation: {
                total: responseTotal?.payload?.result?.total_formatted
              }
            }
            :
            {}
        )
      }
      if (response.payload?.results?.length > 0) {

        const data = response.payload?.results.map((item:any, index:number) => {

          const value = refactorDatabaseToHeadTable(columns, item)



          // ==========================
          // === Post Refactor Item === 
          // ==========================

          let resultPostRefactorItem = {}

          if (postRefactorItem) {
            resultPostRefactorItem = postRefactorItem(item)
          }



          // ==========================
          // ========= Return ========= 
          // ==========================

          return {
            id: item?.id || _.uniqueId(),
            index: (pageContext?.page * pageContext?.pageSize) + index + 1,
            originalData: item,
            ...(value || {}),
            ...(resultPostRefactorItem || {}),
          }

        })

        result = {
          pageContext,
          data
        }

      }
      else {

        result = {
          pageContext: ConfigComponents.Table.pageContext,
          data: []
        }

      }




      return result

    }
    else {

      Helpers.openSnackbar('generalError', response?.message?.message || response?.message)

    }

    return {
      pageContext: ConfigComponents.Table.pageContext,
      data: []
    }


  }
  catch (err) {


  }

}

const APIHelpers = {
  refactorParamsPageContext,
  refactorDatabaseToHeadTable,
  getTableData,
  searchToParamAPI,
}

export default APIHelpers