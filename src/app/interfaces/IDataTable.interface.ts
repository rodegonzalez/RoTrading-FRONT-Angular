export interface IDataTable{
    tableColumns: any[], 
    tableData: any[]
}

export interface ISearchOptions{
    Datemin: string,
    Datemax: string,
    Dateyear: string,
    Temporality: string,
    Pattern1id: string
    Setup2id: number,
    Buysell: string,
}

