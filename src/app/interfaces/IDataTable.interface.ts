export interface IDataTable{
    tableColumns: any[], 
    tableData: any[],
    summarize: any[]
}

export interface ISummarize
{
    positionsData_operations : any[],
    positionsData_blocks : any[],
    positionsData_ticks : any[],
    positionsData_posneg : any[]
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
