const axios = require('axios');

module.exports = function(app) {
    let nationalPolls = [];
    axios.get('https://election-data-2020.firebaseio.com/nationalPolls/.json').then(
        function(response) {
            nationalPolls = response.data;
            app.get('/api/nationalpolls', function(req, res) {
            return res.json(nationalPolls);
            });
            app.get('/api/nationalpolls/:candidate', function(req, res) {
                var candidate = req.params.candidate;
                var natOpponentApiCall = [];
                candidate = candidate.toLowerCase();
                for (var i = 0; i < nationalPolls.length; i++) {
                    if (nationalPolls[i].answer === "Trump" && candidate === nationalPolls[i-1].answer.toLowerCase()) {
                        natOpponentApiCall.push(nationalPolls[i]);
                        natOpponentApiCall.push(nationalPolls[i-1]);
                    }
                }
                return res.json(natOpponentApiCall);
            });
        }
    )
}