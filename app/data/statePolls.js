const axios = require('axios');

module.exports = function(app) {
   let statePolls = [];
    axios.get('https://election-data-2020.firebaseio.com/statePolls/.json').then(
        function(response) {
            statePolls = response.data;
            app.get('/api/statepolls', function(req, res) {
            return res.json(statePolls);
            });
            app.get('/api/statepolls/:state&:candidate', function(req, res) {
                var state = req.params.state;
                var candidate = req.params.candidate;
                var stateOpponentApiCall = [];
                state = state.toLowerCase();
                candidate = candidate.toLowerCase();
                for (var i = 0; i < statePolls.length; i++) {
                    if (state === statePolls[i].state.toLowerCase() && statePolls[i].answer === "Trump" && candidate === statePolls[i-1].answer.toLowerCase()) {
                        stateOpponentApiCall.push(statePolls[i]);
                        stateOpponentApiCall.push(statePolls[i-1]);
                    }
                }
                return res.json(stateOpponentApiCall);
            })
            app.get('/api/statepolls/:state/', function(req, res) {
                var state = req.params.state;
                var stateApiCall = [];
                state = state.toLowerCase();
                for (var i = 0; i < statePolls.length; i++) {
                    if (state === statePolls[i].state.toLowerCase()) {
                        stateApiCall.push(statePolls[i]);
                    }
                }
                return res.json(stateApiCall);
            })
        }
    )
}