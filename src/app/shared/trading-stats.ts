    export class TradingStats 
    {
      private totalTrades: number;
      private totalWins: number;
      private totalLosses: number;
      private totalProfit: number;
      private totalLoss: number;

      private totalBEval: number;
      private totalBEnum: number;
    
      constructor(totalTrades: number, totalWins: number, totalLosses: number, totalProfit: number, totalLoss: number
        , totalBEnum: number, totalBEval: number) {
        this.totalTrades = totalTrades;
        this.totalWins = totalWins;
        this.totalLosses = totalLosses;
        this.totalProfit = totalProfit;
        this.totalLoss = totalLoss;
        this.totalBEval = totalBEval;
        this.totalBEnum = totalBEnum;
      }
    
      // Calcula la ganancia media
      public getAverageGain(): number {
        //return this.totalProfit / this.totalWins;
        return (this.totalWins != 0) ? (this.totalProfit / this.totalWins) : 0;
      }
    
      // Calcula la pérdida media
      public getAverageLoss(): number {
        //return this.totalLoss / this.totalLosses;
        return (this.totalLosses != 0) ? (this.totalLoss / this.totalLosses) : 0;
      }

      public getAverageBE(): number {
        return (this.totalBEnum != 0) ? (this.totalBEval / this.totalBEnum) : 0;
      }

      public getAverageTotal(): number {
        return (this.totalTrades != 0) ? (this.getTotalValue() / this.totalTrades) : 0;
      }

    
      // Calcula la probabilidad de ganar
      public getWinProbability(): number {
        //return this.totalWins / this.totalTrades;
        return (this.totalTrades != 0) ? Math.round(Math.abs(this.totalWins / this.totalTrades) * 10000 ) / 10000 : 0 ;
      }
    
      // Calcula la probabilidad de perder
      public getLossProbability(): number {
        return (this.totalTrades != 0) ? Math.round(Math.abs(this.totalLosses / this.totalTrades) * 10000 ) / 10000 : 0 ;
      }
    
      public getBEProbability(): number {
        return (this.totalTrades != 0) ? Math.round(Math.abs(this.totalBEnum / this.totalTrades) * 10000) / 10000 : 0 ;
      }

      public getTotalValue(): number {  
        return this.totalBEval + this.totalProfit + this.totalLoss;
      }

      public getTotalProbability(): number {  
        const winProbability = this.getWinProbability();
        const lossProbability = this.getLossProbability();
        const beProbability = this.getBEProbability();
        return Math.round(winProbability + lossProbability + beProbability) * 10000 / 10000;
      }

      // Calcula la esperanza matemática
      public calculateExpectancy(): number {
        const averageGain = this.getAverageGain();
        const averageLoss = this.getAverageLoss();
        const averageBe = this.getAverageBE();
        const winProbability = this.getWinProbability();
        const lossProbability = this.getLossProbability();
        const beProbability = this.getBEProbability();
        const e = ((averageGain + averageBe) * (winProbability + beProbability)) - (averageLoss * lossProbability);
        return Math.round(e * 100) / 100;
      }
    
      // Calcula el ratio R
      public calculateRRatio(): number {
        const averageGain = this.getAverageGain();
        const averageLoss = this.getAverageLoss();
        const averageBe = this.getAverageBE();
        const r = (averageLoss != 0) ? Math.abs((averageGain + averageBe) / averageLoss) : 0;
        return Math.round(r * 100) / 100;
      }

            // Calcula el ratio R
            public calculateWinLossRatio(): number {
                const winProbability = this.getWinProbability();
                const lossProbability = this.getLossProbability();
                const beProbability = this.getBEProbability();
                const r = (lossProbability != 0) ? Math.abs((winProbability) / lossProbability) : 0;
                return Math.round(r * 100) / 100;
              }


    }  
