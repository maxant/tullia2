var http = require('http');
var url = require('url');

var heroes = [
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ];

var headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200'};

http.createServer(function (req, res) {
    // https://nodejs.org/api/http.html#http_class_http_incomingmessage
    try {
        let request = url.parse(req.url, true);
        let matchesSingleHeroRegex = /\/api\/heroes\/(\d*)$/;
        let matchesSingleHeroRequest = request.pathname.match(matchesSingleHeroRegex);
        console.debug('serving request: ' + JSON.stringify(request) + ", " + req.method);

        if (req.method === 'GET' && request.pathname === '/api/heroes' && !request.query.id) {
            res.writeHead(200, headers);
            res.write(JSON.stringify(heroes));
        } else if (req.method === 'GET' && matchesSingleHeroRequest && matchesSingleHeroRequest[1]) {
            var hero = heroes.find(h => h.id == matchesSingleHeroRequest[1]);
            if(hero) {
                res.writeHead(200, headers);
                res.write(JSON.stringify(hero));
            } else {
                res.writeHead(404, headers);
                res.write(JSON.stringify({msg: 'unknown hero'}));
            }
        } else {
            console.log('ignoring request to ' + request.pathname);
            res.writeHead(404, headers);
            res.write(JSON.stringify({msg: 'unmatched path or request'}));
        }
    } catch(e) {
        console.error(e);
        res.writeHead(500, headers);
        res.write(JSON.stringify({msg: JSON.stringify(e)}));
    } finally {
        res.end();
    }
}).listen(4201);