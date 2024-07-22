  export interface IPosition{
	id:     number;
	block:  string;
	creation:       string;
	modification:   string;
	datetimein:     string;
	datetimeout:    string;
	buysell:        string;
	pricein:        number;
	priceout:       number;
	ticks:          number;
	profit:         number;
	stoploss:	   number;	
	contracts:      number;
	commision:      number;
	euros:          number;
	dollareuro:     number;
	imagepath:      string;
	status:			string;
	divisaid:       number;
	accountid:      number;
	marketid:       number;
	tickerid:		number;
	patternid:		number;
	setupid:		number;
	brokerid:		number;
	isrealCheck:	number;
	tppCheck:		number;
	note:			string;
	temporal:		string;
	tppid:			number;
	tpp:			string;
	active:			number;
	deleted:		number;
	processed:		number;


  }

  export interface IPositionView{
	//id:     number;
	block:  string;
	creation:       string;
	modification:   string;
	datetimein:     string;
	datetimeout:    string;
	buysell:        string;
	pricein:        number;
	priceout:       number;
	ticks:          number;
	profit:         number;
	stoploss:	   number;	
	contracts:      number;
	commision:      number;
	euros:          number;
	dollareuro:     number;
	imagepath:      string;
	status:			string;
	divisaid:       number;
	accountid:      number;
	marketid:       number;
	tickerid:		number;
	patternid:		number;
	setupid:		number;
	brokerid:		number;
	divisa:			string;
	account:		string;
	market:			string;
	ticker:			string;
	pattern:		string;
	setup:			string;
	broker:			string;	
	acctype:		string;
	isrealCheck:	number;
	tppCheck:		number;
	note:			string;
	temporal:		string;
	tppid:			number;
	tpp:			string;
	active:			number;
	deleted:		number;
	processed:		number;

  }
