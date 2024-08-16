  export interface IPosition{
	id:     		number;
	sessionid: 		string;
	guid:			string;
	tppid:			number;
	tppcheck:		number;
	tppblocksec:  	number;
	sec:  			number;
	creation:       string;
	modification:   string;
	timein:     	string;
	timeout:    	string;
	pricein:        number;
	priceout:       number;
	buysell:        string;
	contracts:      number;
	opresultticks:  number;
	opresult:		number;
	commission:      number;
	opresulteur:	number;
	usdeur:			number;
	divisaid:       number;
	accountid:      number;
	tickerid:		number;
	pattern1id:		number;
	pattern2id:		string;
	setup1id:		string;
	setup2id:		number;
	processed:		number;
	deleted:		number;
	deletednote:	string;
	note:			string;
	imagepath:      string;
	status:			string;
  }

  export interface IPositionView{
	id:     		number;
	sessionid: 		string;
	guid:			string;
	tppid:			number;
	tppcheck:		number;
	tppblocksec:  	number;
	sec:  number;
	creation:       string;
	modification:   string;
	timein:     	string;
	timeout:    	string;
	pricein:        number;
	priceout:       number;
	buysell:        string;
	contracts:      number;
	opresultticks:  number;
	opresult:		number;
	commission:      number;
	opresulteur:	number;
	usdeur:			number;
	divisaid:       number;
	accountid:      number;
	tickerid:		number;
	pattern1id:		number;
	pattern2id:		string;
	setup1id:		number;
	setup2id:		string;
	processed:		number;
	deleted:		number;
	note:			string;
	imagepath:      string;
	status:			string;
// -----------------------------------
	divisa:			string;
	account:		string;
	acctype:		string;
	pattern:		string;
	setup:			string;
	ticker:			string;
	tpp:			string;
  }
