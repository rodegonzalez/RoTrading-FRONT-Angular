import { Component, OnInit } from '@angular/core';
//import { Database } from 'sqlite3';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: []
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.runTest();
    this.test_loadFile();
  }

  runTest() {
    try{
      //var db = new Database('../../assets/data/database.db3');
      //let reports : any;
      //db.all("SELECT * FROM temp",[],(err:any,rows:any)=>{reports=rows;})
      //console.log(reports);

      //let doc = JSON.stringify()
      console.log("test ok.");

    } catch(ex) {
      console.log(ex);
    }
    

  }

  test_loadFile() {

    
    try{
      let file: File = new File([],'assets/data/mifile.txt');
      let reader = new FileReader();
      let texto = reader.readAsText(file);
      console.log(texto);
      console.log("Test - loadFile - Ok.");

    } catch(ex) {
      console.log(ex);
    }
    

  }

}
