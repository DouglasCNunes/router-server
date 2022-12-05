let handlers = {};

// Index
handlers.index = async function(data){
    let index = {
        'path' : data.path,
        'message' : 'Página principal'
    }
    return{
        'statusCode' : 200,
        'payload' : index,
    }
}

// callback pagina nao encontrada: error 404
handlers.notFound = async function(data){
    let notFound = {
        'path': data.path,
        'message' : 'Error 404, página não encontrada'
    }
    return{
        'statusCode' : 200,
        'payload' : notFound,
    }
}


module.exports = handlers;

