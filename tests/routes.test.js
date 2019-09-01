const request = require('supertest');
const app = require('../app');
const port = require('../server');
const db = require('../mock/mockDb');


describe('Test the root path of triangle API', () => {
    jest.setTimeout(20000);
    test('It should response the GET method', () => {
        return request(app).get('/api/triangle/').expect(200);
    });
});


describe('Test the POST and GET method of triangle API', () => {
    
    it('Should return 200', async (done) => {
        jest.setTimeout(20000);
        await request(app)
            .post('/api/triangle/')
            .type('form')
            .send({ a: '1,2' })
            .send({ b: '3,5' })
            .send({ c: '1,8' })
            .expect(200)
            .then(() => done());
        });

    it('Should return 400 "bad request"', async (done) => {
        jest.setTimeout(20000);
        await request(app)
            .post('/api/triangle/')
            .type('form')
            .send({ a: '' })
            .send({ b: '' })
            .send({ c: '' })
            .expect(400)
            .then(() => done());
    });
});


describe('Home page of the blog', () => {
    var server = request.agent(`http://localhost:${port}`);

    it('Should return 304', (done) => {
        jest.setTimeout(20000);
        server.post("/api/blogMock/")
            .expect(304)
            .end((err) => {
                if (err) return done(err);
        });
        done();
    });  
});


describe('Create new post', () => { 
    
     it('Should return 302', async (done) => {
        jest.setTimeout(20000);
        await request(app)
            .post('/api/createPostMock/')
            .type('form')
            .send({ title: 'Amazing post' })
            .send({ textBody: 'Cool body' })
            .expect(302)
            .then(() => done()); 
    });  

    it('Should return 400', async (done) => {
        jest.setTimeout(20000);
        await request(app)
            .post('/api/createPostMock/')
            .type('form')
            .send({ title: 'Post without body' })
            .send({ textBody: '' })
            .expect(400)
            .then(() => done());
    }); 
});


describe('Delete post based on its ID', () => {  

    it('Should return 302', async (done) => {
    //This test includes querying database because of autoincrement Id 
    let id;
    const sql =  'SELECT * FROM posts ORDER BY ID DESC LIMIT 1'; 
    await db.query(sql, (err, result) => {
    if (err) {
        throw err;
        };
    id = result[0].id;

    jest.setTimeout(20000);
    request(app)
        .post('/api/deleteMock/')
        .type('form')
        .send({ id: id })
        .expect(302)
        .then(() => done());
    }); 
    });  

    it('Should return 400 bad request. No ID', async (done) => {

    jest.setTimeout(20000);
    await request(app)
        .post('/api/deleteMock/')
        .type('form')
        .send({ id: '' })
        .expect(400)
        .then(() => done());
    });
});


describe('Create comment based on post ID', () => {  

    it('Should return 302', async (done) => {
        //This test includes querying database because of autoincrement Id 
        //Comments are connected with the posts thorugh Id
        let id;
        const sql =  'SELECT * FROM posts ORDER BY ID DESC LIMIT 1'; 
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].id;

        jest.setTimeout(20000);
        request(app)
            .post('/api/createCommentMock/')
            .type('form')
            .send({ id: id })
            .send({ textBody: 'One more cool coment' })
            .expect(302)
            .then(() => done());
        }); 
    });  

    it('Should return 400 - Empty body of the comment', async (done) => {
        let id;
        const sql =  'SELECT * FROM posts ORDER BY ID DESC LIMIT 1';
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].id;

        jest.setTimeout(20000);
        request(app)
            .post('/api/createCommentMock/')
            .type('form')
            .send({ id: id })
            .send({ textBody: '' })
            .expect(400)
            .then(() => done());
            });
    });
});  


describe('Delete comment based on comment ID', () => {  

    it('Should return 302', async (done) => {
        //This test includes querying database because of autoincrement Id 
        let id;
        const sql =  'SELECT * FROM comments ORDER BY commentId DESC LIMIT 1;'; 
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].commentId;

        jest.setTimeout(20000);
        request(app)
            .post('/api/deleteCommentMock/')
            .type('form')
            .send({ commentId: id })
            .expect(302)
            .then(() => done());
        }); 
    });  

    it('Should return 400 - No id', async (done) => {
        jest.setTimeout(20000);
        await request(app)
            .post('/api/deleteCommentMock/')
            .type('form')
            .send({ commentId: '' })
            .expect(400)
            .then(() => done());
    });
}); 

describe('Edit post based on its ID', () => {  

    it('Should return 302', async (done) => {
        //This test includes querying database because of autoincrement Id 
        let id;
        const sql =  'SELECT * FROM posts ORDER BY ID DESC LIMIT 1'; 
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].id;

        jest.setTimeout(20000);
        request(app)
            .post('/api/editPostMock/')
            .type('form')
            .send({ id: id })
            .send({ title: 'I am edited post' })
            .send({ textBody: 'I am edited post body' })
            .expect(302)
            .then(() => done());
        }); 
    });  

    it('Should return 400 bad request *No title', async (done) => {
        let id;
        const sql =  'SELECT * FROM posts ORDER BY ID DESC LIMIT 1';
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].id;

        jest.setTimeout(20000);
        request(app)
            .post('/api/editPostMock/')
            .type('form')
            .send({ id: id })
            .send({ title: '' })
            .send({ textBody: 'I am edited body' })
            .expect(400)
            .then(() => done());
        });
    });
}); 

describe('Edit comment based on its ID', () => {  

    it('Should return 302', async (done) => {
        //This test includes querying database because of autoincrement Id 
        let id;
        const sql =  'SELECT * FROM comments ORDER BY commentId DESC LIMIT 1;'; 
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].commentId;

        jest.setTimeout(20000);
        request(app)
            .post('/api/editCommentMock/')
            .type('form')
            .send({ id: id })
            .send({ textBody: 'I am edited comment body' })
            .expect(302)
            .then(() => done());
        }); 
    });  

    it('Should return 400 bad request *No textBody', async (done) => {
        let id;
        const sql =  'SELECT * FROM comments ORDER BY commentId DESC LIMIT 1;';
        await db.query(sql, (err, result) => {
        if (err) {
            throw err;
        };
        id = result[0].commentId;

        jest.setTimeout(20000);
        request(app)
            .post('/api/editCommentMock/')
            .type('form')
            .send({ id: id })
            .send({ textBody: '' })
            .expect(400)
            .then(() => done());
        });
    });
}); 

