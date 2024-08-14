export interface IAccount{
	id:      number;
	creation:       string;
	modification:	   string;
	name:           string;
	description:    string;
	amount_initial: number;
	amount_current: number;
	divisaid:       number;
	status:			string;
	acctype:		string;
	note:		string;
	active:		number;
	deleted:		number;	
}