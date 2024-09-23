export interface IDataTable{
    tableColumns: any[], 
    tableData: any[]
}

export interface ISearchOptions{
    Sessionid: string,
    Accountid: number,
    Tickerid: number,
    Pattern1id: number,
    Pattern2id: string,
    Setup1id: string,   
    Setup2id: number,
    Buysell: string,
}
