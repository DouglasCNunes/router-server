const http = require('http');
const handlers = require('./handlers');
const stringDecoder = require('string_decoder').StringDecoder;

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer(function(req,res){

    let queryUrl = req.url;
    let parsedUrl = new URL(queryUrl,'http://localhost:3000');
    let path = parsedUrl.pathname;
    const newPath = path.replace(/^\/+|\/+$/g,'');
    let decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    })
    req.on('end',function(){
        buffer += decoder.end();
        parseJsonToObject = function(str){
            try{
                let obj = JSON.parse(str);
                return obj;
            } catch(e){
                return{};
            }
        }

        let data = {
            'path' : newPath,
            'payload':parseJsonToObject(buffer),
        }

        let chosenHandler = typeof(router[newPath]) !== 'undefined' ? router[newPath] : handlers.notFound;
        const dataStremHandler = function(payload,statusCode){
            payloadstring = JSON.stringify(payload);
            res.statusCode = statusCode;
            res.setHeader('Content-Type','application/json');
            res.end(payloadstring);
        };

        try{
            const mainServerFunction = async function(){
                const dataStream = await chosenHandler(data);
                const payload = await dataStream.payload;
                const statusCode = await dataStream.statusCode;
                dataStremHandler(payload,statusCode);
            }
            mainServerFunction();
        } catch(e){
            console.error(e);
        }

    })


})

// Rotas do servidor
router = {
    '' : handlers.index,
}

server.listen(port,hostname,function(){
    console.log('Server is running on port: ' + port+' now');
})