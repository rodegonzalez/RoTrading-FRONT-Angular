  export interface ITpp{
	id:      number;
	creation:       string;
	modification:   string;
	name:           string;
	description:    string;
	blockprefix:    string;
	maxblocksecuence: number;
	status:			string;
	note:			string;
	active:			number;
	deleted:		number;	
  }

  export interface ITppGetSecuence{
	tppdid: number;
	tppblocksec: number;
	sec: number;
  }

