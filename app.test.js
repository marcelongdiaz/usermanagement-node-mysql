import supertest from 'supertest'
import app from './app.js'
import got from 'got'
import fetch from 'node-fetch';

const generateMockupUser = () => {
    var randomizerAddons = new Date();
    var mockupId = parseInt(randomizerAddons.valueOf());
    var newData = {
        "first_name": "Test" + mockupId,
        "last_name": "Test" + mockupId,
        "address": "test address " + mockupId,
        "post_code": "999-999-" + mockupId,
        "contact_phone": "800-2023" + mockupId,
        "email": mockupId + "@test.dev",
        "username": "testuser" + mockupId,
        "password": "password" + mockupId 
    }

    return newData;
}

describe("Login API", ()=>{
    describe("POST /signin", ()=>{
    //should respond with status code 200
        test("should respond in code 200 on success login", async () => {
            const response = await got.post("http://localhost:8080/signin", {
                json: {
                    username: "admin",
                    password: "123"
                }
            })
            expect(response.statusCode).toBe(200)
        });

        test("should return userdata on success login", async () => {
            const { body } = await got.post("http://localhost:8080/signin", {
                json: {
                    username: "admin",
                    password: "123"
                }
            })
            expect(JSON.parse(body)[0].id).toBeGreaterThan(0)
        });

        test("should respond an empty array on wrong credentials", async () => {
            const { body } = await got.post("http://localhost:8080/signin", {
                json: {
                    username: "admin",
                    password: "wrongpassword"
                }
            })
            expect((JSON.parse(body)).length).toBe(0)   
        });


        
    })
})

describe("Get All Users", ()=>{
    describe("GET /users", ()=>{
    //should respond with status code 200
        test("should respond in code 200 on successful fetching", async () => {            
            const { statusCode } = await supertest(app).get("/users")
            expect(statusCode).toBe(200);
        });
        
        test('should return data upon trigger', async () => {
            const { body } = await supertest(app).get("/users")
            expect(body.length).toBeGreaterThan(0);
        })
    })
})

describe("Get Individual User", ()=>{
    describe("GET /users/:id", ()=>{
        test("should return status code 200 upon fetching", async()=>{
            const newData = generateMockupUser();
            const saveUserResponse = await supertest(app).post('/users').send(newData);
            const { statusCode } = await supertest(app).get('/users/'+saveUserResponse.body.id)
            expect(statusCode).toEqual(200);

            //delete created data;
            await supertest(app).delete('/users/delete/'+saveUserResponse.body.id);
        })

        test("should return the details of the user", async () => {     
            const newData = generateMockupUser();
            const saveUserResponse = await supertest(app).post("/users").send(newData);
            const { body } = await supertest(app).get('/users/'+saveUserResponse.body.id)

            expect(saveUserResponse.statusCode).not.toBe(500);
            expect(saveUserResponse.body.id).toEqual(body.id);

            //delete created data;
            await supertest(app).delete('/users/delete/'+saveUserResponse.body.id); 
        });
    })
})

describe("Add New User", () => {
  
    describe("POST with requestbody /users", ()=>{

        test("should return status code 201 with user id", async()=>{

            const newData = generateMockupUser();
            const response =  await supertest(app).post("/users").send(newData) 
            expect(response.statusCode).toBe(201);

            //delete test data
            await supertest(app).delete('/users/delete/'+response.body.id); 
        })

        test("should be saved and return user id", async()=>{
            
            const newData = generateMockupUser();
            const response =  await supertest(app).post("/users").send(newData)
            const userDetails = response.body;
            const { body } = await supertest(app).get("/users/"+userDetails.id)
            expect((userDetails).hasOwnProperty("id")).toBe(true);
            expect(body.id).toBe(userDetails.id);

            //delete test data
            await supertest(app).delete('/users/delete/'+response.body.id);

        })

    })
})

describe("Delete User", () => {
    describe("DELETE /users/delete/:id -- (for single user)", () => {
        test("should return code 204 upon deletion", async() => {
            const newData = generateMockupUser();
            const saveUserResponse = await supertest(app).post('/users').send(newData);
            const deleteResponse = await supertest(app).delete('/users/delete/'+saveUserResponse.body.id);
            expect(deleteResponse.statusCode).toBe(204);
        })
    })
    describe("DELETE /users/deleteusers -- (for multiple users)", () => {
        test("should return code 204 upon deletion", async() => {
            const saveUserResponse1 = await supertest(app).post('/users').send(generateMockupUser());
            const saveUserResponse2 = await supertest(app).post('/users').send(generateMockupUser());
            const saveUserResponse3 = await supertest(app).post('/users').send(generateMockupUser());
            const deleteRequestBody = {
                "id": [
                    saveUserResponse1.body.id, 
                    saveUserResponse2.body.id, 
                    saveUserResponse3.body.id]
            }
            const deleteResponse = await supertest(app).delete('/users/deleteusers').send(deleteRequestBody);
            expect(deleteResponse.statusCode).toBe(204);
        })
    })

})

describe("Update User", () => {
    describe("POST /users/update", () => {
        test("should return code 202 upon update", async () => {
            // create test data
            const newUserData = generateMockupUser();
            const saveUserResponse = await supertest(app).post('/users').send(newUserData);

            // update created user
            newUserData.post_code = "updated post_code";
            const updateResponse = await supertest(app).post('/users/update').send({id: saveUserResponse.body.id, data: newUserData});
            expect(updateResponse.statusCode).toBe(202);

            // delete test data
            await supertest(app).delete('/users/delete/'+saveUserResponse.body.id);
            
        })

        test("should reflect the update", async () => {
            // create test data
            const newUserData = generateMockupUser();
            const saveUserResponse = await supertest(app).post('/users').send(newUserData);

            // update created user
            newUserData.post_code = "updated post_code";
            const updateResponse = await supertest(app).post('/users/update').send({id: saveUserResponse.body.id, data: newUserData});
            const checkUpdateResponse = await supertest(app).get('/users/'+saveUserResponse.body.id);
            
            expect(updateResponse.statusCode).toBe(202);
            expect(checkUpdateResponse.body.post_code).toBe(newUserData.post_code);

            // delete test data
            await supertest(app).delete('/users/delete/'+saveUserResponse.body.id);
            
        })
    })
})





