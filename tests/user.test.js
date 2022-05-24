const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userTest, userTestId, setupDatabase} = require('./fixtures/db')



beforeEach(setupDatabase)

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Hassan',
        email: 'elwany@example.com',
        password: 'MyPass777!'
    }).expect(201)

    //Assert the user has been add to database already
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assert about response 
    expect(response.body).toMatchObject({
        user: {
            name: 'Hassan',
            email: 'elwany@example.com'
        }
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userTest.email,
        password: userTest.password
    }).expect(200)
    const user = await User.findById(userTestId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login for nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: userTest.email,
        password: 'alihopam123'
    }).expect(400)
})

test('Should get profile for user', async() => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userTest.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userTest.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userTestId)
    expect(user).toBeNull()
})

test('should not delete account cause it is unauthenticated', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should upload avatar image', async() => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userTest.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/MME.jpg')
    .expect(200)
    const user = await User.findById(userTestId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user field', async() => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userTest.tokens[0].token}`)
    .send({
        name: 'ali'
    }).expect(200)
    const user = await User.findById(userTestId)
    expect(user.name).toBe('ali')
})