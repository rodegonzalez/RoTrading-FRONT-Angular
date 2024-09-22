export interface IDataTable{
    tableColumns: any[], 
    tableData: any[]
}

export interface ISearchOptions{
    datemin: string,
    datemax: string,
    dateyear: string,
    temporality: string,
    pattern1id: string
    setup2id: number,
    buysell: string,
}

