export interface IPosition{
	Idposition:     number;
	Creation:       string;
	Datetimein:     string;
	Datetimeout:    string;
	Buysell:        string;
	Pricein:        number;
	Priceout:       number;
	Ticks:          number;
	Contracts:      number;
	Commision:      number;
	Euros:          number;
	Dollareuro:     number;
	Imagepath:      string;
	Iddivisa:       number;
	Idaccount:      number;
	Status:			string;
	Pattern:		string;
	Setup:			string;
	Ticker:			string;
  }
  
  export interface IPositionLower{
	idposition:     number;
	creation:       string;
	datetimein:     string;
	datetimeout:    string;
	buysell:        string;
	pricein:        number;
	priceout:       number;
	ticks:          number;
	contracts:      number;
	commision:      number;
	euros:          number;
	dollareuro:     number;
	imagepath:      string;
	iddivisa:       number;
	idaccount:      number;
	status:			string;
	pattern:		string;
	setup:			string;
	ticker:			string;
  }
