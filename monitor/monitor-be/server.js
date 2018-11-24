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

var headers = {'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': 'http://localhost:4200',
//               'Access-Control-Allow-Headers': 'Content-Type',
//               'Access-Control-Allow-Credentials': true,
//               'Access-Control-Allow-Methods': 'HEAD, POST, PUT, DELETE, GET, OPTIONS',
//               'Allow':                        'HEAD, POST, PUT, DELETE, GET, OPTIONS',
              };

http.createServer(function (request, response) {
    // https://nodejs.org/api/http.html#http_class_http_incomingmessage
    // https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        request.body = body;
        handleRequest(request, response);
    });
}).listen(4201);

function handleRequest(req, res) {
    try {
        let request = url.parse(req.url, true);
        let matchesSingleHeroRegex = /\/api\/heroes\/(\d*)$/;
        let matchesSingleHeroRequest = request.pathname.match(matchesSingleHeroRegex);
        console.debug('\r\nserving request: ' + JSON.stringify(request) + ', method: ' + req.method + ', body: ' + req.body);

        if (req.method === 'GET' && request.pathname === '/api/heroes') {
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
        } else if (req.method === 'POST' && request.pathname === '/api/heroes') {
            //using post, coz application/json is not allowed with put with cors
            var hero = JSON.parse(req.body);
            var originalHero = heroes.find(h => h.id === hero.id);
            var idx = heroes.indexOf(originalHero);
            if(originalHero && idx >= 0) {
                console.log('updating hero ' + hero.id + ' at index ' + idx);
                heroes[idx] = hero;
                res.writeHead(204, headers);
            } else {
                hero.id = heroes.map(h => h.id).reduce((a, c) => Math.max(a,c)) + 1;
                console.log('adding hero ' + JSON.stringify(hero));
                heroes.push(hero);
                res.writeHead(201, headers);
                res.write(JSON.stringify(hero)); //return since it now has an id
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
}