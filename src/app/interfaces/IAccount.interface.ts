/*
export interface IAccount{
	Idaccount:      number;
	Creation:       string;
	Name:           string;
	Description:    string;
	Amount_initial: number;
	Amount_current: number;
	Idbroker:       number;
	Iddivisa:       number;
	Status:			string;
	Acctype:		string;
  }
*/

  export interface IAccount{
	id:      number;
	creation:       string;
	name:           string;
	description:    string;
	amount_initial: number;
	amount_current: number;
	brokerid:       number;
	divisaid:       number;
	status:			string;
	acctype:		string;
  }