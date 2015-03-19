Circular Statistics
-------------------

## Class def

```ts
class CircularStats {
    this.count: number;
    this.max: number;
    this.min: number;
    this.mean: number;
    this.stdDev: number;
    this.variance: number;
    this.push: (value?:number, weight?: number = 1) => CircularStats;
    this.push: (values:[number], weight?: number = 1) => CircularStats;
    this.push: (statsObj: CircularStats) => CircularStats;
}
```

## Usage

```bash
npm install CircularStats --save
```

```js
var CircularStats = require('CircularStats');

var statsDegrees = new CircularStats.StatsDegrees([360,0]);
console.log(statsDegrees.mean); // 0
statsDegrees.push(90,2);     // 90 degrees, with weight of 2
console.log(statsDegrees.mean); // 45

var statsRadians = new CircularStats.StatsRadians();
statsRadians.push(2*Math.PI,0,Math.PI/2,Math.PI/2);
console.log(statsRadians.mean); // 1.5707963267948966

// Time Of Day
var statsTimeOfDay = new CircularStats.StatsTimeOfDay('UTC');
statsTimeOfDay.push(Date.now);
var yesterday = new Date(new Date()-1000*60*60*24);
statsTimeOfDay.push(yesterday);
var tMinus6hrs = new Date(new Date()-1000*60*60*6);
statsTimeOfDay.push(tMinus6hrs,2);
console.log(Date.now);              // Thu Mar 19 09:04:54 UTC 2015
console.log(statsTimeOfDay.mean);   // 06:04:54 UTC

// Day Of Year
var statsDayOfYear = new CircularStats.StatsDayOfYear('UTC');
statsDayOfYear.push(new Date(0));
var yearAgo = new Date(new Date(0)-1000*60*60*24*365);
statsDayOfYear.push(yearAgo);
var tPlus3Months = new Date(new Date(0)+parseInt(1000*60*60*24*365/4));
statsDayOfYear.push(tPlus3Months,2);    // Thu, 02 Apr 1970 00:00:00 GMT
console.log(new Date(0));               // Thu, 01 Jan 1970 00:00:00 GMT
console.log(statsDayOfYear.mean);       // 15 Feb
```