var running_stats = require('../index');

var checkResult = function(test,cs){
	test.ok(cs.mean-45<0.000000001, "Mean = 45");
	test.equals(cs.variance, 0.29289321881345254, "Variance = 0.29289321881345254");
	test.equals(cs.count, 4, "Count = 4");

	test.done();
};

exports.testCircStats = function(test) {
	var cs = new running_stats.CircStats();
	cs.push(0);
	cs.push(360);
	cs.push(90,2);
	checkResult(test, cs);
};

exports.testInitializationWithCircStats = function(test) {
	var s = new running_stats.CircStats();
	s.push(0);
	s.push(360);

	var cs = new running_stats.CircStats(s);
	cs.push(90,2);

	checkResult(test, cs);
};

exports.testCircStatsInitializationWithInitValues = function(test) {
	var s = new running_stats.CircStats(360,2);

	var cs = new running_stats.CircStats(s);
	cs.push(90,2);

	checkResult(test, cs);
};

exports.testCircStatsInitializationWithInitValuesByArray = function(test) {
	var s = new running_stats.CircStats([360,0]);

	var cs = new running_stats.CircStats(s);
	cs.push([90],2);

	checkResult(test, cs);
};
