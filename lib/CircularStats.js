var Stats = require('running-stats').Stats;

module.exports = function(val, weight){
	this._X = new Stats();
	this._Y = new Stats();
	this.count=0;
	this.mean=null;
	this.dispersion={};
	this.push = function (val,weight) {
		if (val == null) return;
		if (val instanceof Array){
			val.forEach(function(v){
				this.push(v,weight);
			}.bind(this));
			return this;
		} else if (typeof val.mean != 'undefined') {
			weight = val.count;
			this.variance = val.variance;
			val = val.mean;
		}
		weight = (weight!=null)? weight : 1;
		var oldCount = this.count;
		var valRad = val*Math.PI/180;
		this.count+=weight;
		if (this.count==0) return;
		var resultingVector = [(oldCount*this._X.mean + weight*Math.cos(valRad)),
			(oldCount*this._Y.mean + weight*Math.sin(valRad))];
		var resultingVectorLength = (Math.sqrt(Math.pow(resultingVector[0],2)+Math.pow(resultingVector[1],2)))/this.count;
		this._X.push(Math.cos(valRad),weight);
		this._Y.push(Math.sin(valRad),weight);
		this.mean = (180/Math.PI)*Math.atan2(this._Y.mean,this._X.mean);
		if (this.mean < 0) this.mean+=360;
		this.variance = (1 - resultingVectorLength);

	};
	this.toJSON = function(){
		return {
			mean: this.mean,
			variance: this.variance,
			count: this.count
		};
	};
	if (typeof val != 'undefined') this.push(val, weight);
};