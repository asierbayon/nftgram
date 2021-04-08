const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)
const mongoose = require('mongoose')
const User = require('../../models/user.model')

afterAll(() => {
  mongoose.connection.close();
})

it('get all events', async (done) => {
  const res = await request.post('/api/login').send({
    email: 'alex@alex.com',
    password: '123456789A'
  })

  expect(res.headers['set-cookie'][0].includes('connect.sid')).toBe(true)
  done()

  const res2 = await request.get('/api/events').set('Cookie', res.headers['set-cookie'])

  expect(res2.status).toBe(200)
  done()
})

// it('create user', async (done) => {
//   const res = await request.post('/api/users').send({
//     name: 'Alex',
//     password: '123456789A',
//     email: 'alex@alex.com',
//   })

//   expect(res.status).toBe(201)

//   const id = res.body.id

//   const res2 = await request.get(`/api/users/${id}`)

//   expect(res2.status).toBe(200)
//   expect(res2.body.name).toBe('Alex')
//   expect(res2.body.password).toBe(undefined)

//   const userSaved = await User.findById(id)

//   expect(userSaved.password.length).toBeGreaterThan(10)
//   expect(userSaved.password).not.toBe('123456789A')

//   expect(await userSaved.checkPassword('123456789A')).toBe(true)

//   const res3 = await request.patch(`/api/users/${id}`).send({
//     name: 'Alejandro'
//   })

//   expect(res3.status).toBe(202)
//   expect(res3.body.name).toBe('Alejandro')

//   //const res4 = await request.delete(`/api/users/${id}`)
//   // expect(res4.status).toBe(204)
//   done()
// })

// it('create user, missing parameter', async (done) => {
//   const res = await request.post('/api/users').send({
//     password: '123456789A',
//     email: 'alex@alex.com',
//   })

//   expect(res.status).toBe(400)
//   done()
// })
