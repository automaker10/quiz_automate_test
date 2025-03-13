let userId = '', email = '', createdAt = '', updatedAt = '', firstname = '', surname = '', fullname = '', job = ''
let verifyId, verifyEmail, verifyFirstname, verifyLastname, verifyAvartar, verifyUrl, verifyText

describe('API Testing with Cypress', () => {
    it('Check API GET (SINGLE USER) with userId', () => {
        cy.fixture('apiUserKeyword').then((userKeyword) => {
            cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
                cy.log(JSON.stringify(response.body))
                // console.log(response.body)
                expect(response.status).to.eq(200)
                expect(response.body.data).to.have.property('id', userKeyword[0].get.id)
                expect(response.body.data).to.have.property('email', userKeyword[0].get.email)
                expect(response.body.data).to.have.property('first_name', userKeyword[0].get.first_name)
                expect(response.body.data).to.have.property('last_name', userKeyword[0].get.last_name)
                expect(response.body.data).to.have.property('avatar', userKeyword[0].get.avatar)

                expect(response.body.support).to.have.property('url', userKeyword[0].get.url)
                expect(response.body.support).to.have.property('text', userKeyword[0].get.text)
            })
        })
    })

    it('Check Create API POST (CREATE) With 1 User', () => {
        cy.fixture('apiUserKeyword').then((userKeyword) => {
            cy.request('POST', 'https://reqres.in/api/users', {
                name: userKeyword[0].post.name,
                job: userKeyword[0].post.job,
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('job')
                expect(response.body).to.have.property('createdAt')
                // cy.log(JSON.stringify(response.body))

                userId = response.body.id
                fullname = response.body.name
                job = response.body.job
                createdAt = response.body.createdAt

                // cy.log(userId + job + createdAt + fullname)
                cy.log(JSON.stringify(response.body))

                const nameParts = fullname.split(' ')
                firstname = nameParts[0]
                surname = nameParts[1]
                // cy.log(firstname + surname)
            })
        })
    })

    it('Check Update API PUT (PUT) With userID', () => {
        cy.fixture('apiUserKeyword').then((userKeyword) => {
            cy.request('PUT', 'https://reqres.in/api/users/2', {
                name: userKeyword[0].put.name,
                job: userKeyword[0].put.job,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('job')
                expect(response.body).to.have.property('updatedAt')

                fullname = response.body.name
                job = response.body.job
                updatedAt = response.body.updatedAt

                // cy.log(userId + job + createdAt + fullname)
                cy.log(JSON.stringify(response.body))

                const nameParts = fullname.split(' ')
                firstname = nameParts[0]
                surname = nameParts[1]
                // cy.log(firstname + surname)
            })
        })
    })

    it('Check Update API PATCH (PATCH) With userID', () => {
        cy.fixture('apiUserKeyword').then((userKeyword) => {

            cy.request('PATCH', 'https://reqres.in/api/users/2', {
                name: userKeyword[0].patch.name
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('updatedAt')

                fullname = response.body.name
                job = response.body.job
                updatedAt = response.body.updatedAt

                // cy.log(userId + job + createdAt + fullname)
                cy.log(JSON.stringify(response.body))

                const nameParts = fullname.split(' ')
                firstname = nameParts[0]
                surname = nameParts[1]

                // cy.log(firstname + surname)
            })
        })
    })

    it('Check API Delete (DELETE) after create user success', () => {
        // cy.log(userId)
        cy.request('Delete', 'https://reqres.in/api/users/' + userId).then((response) => {
            expect(response.status).to.eq(204)
            cy.log(JSON.stringify(response.body))
            cy.log('Delete Success')
        })
    })
})