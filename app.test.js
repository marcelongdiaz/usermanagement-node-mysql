import supertest from 'supertest'
import app from './app.js'
import got from 'got'
import fetch from 'node-fetch';

const generateMockupUser = () => {
    var randomizerAddons = Date();
    var mockupId = randomizerAddons.valueOf();
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
    describe("given a username and password", ()=>{
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
            expect(JSON.parse(body)[0]).toHaveProperty('id', 1)
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
    describe("display all users", ()=>{
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
    describe("get user details", ()=>{
        test("should return status code 200 upon fetching", async()=>{
            const { statusCode } = await supertest(app).get('/users/1')
            expect(statusCode).toEqual(200);
        })
        //should respond with status code 200
        test("should return the details of the user", async () => {            
            const { body } = await supertest(app).get("/users/1")
            expect(body.id).toBe(1);
        });
    })
})

describe("Add New User", () => {
    
    describe("Add mockup data", ()=>{

        test("should return status code 201 with user id", async()=>{

            const newData = generateMockupUser();
            const response =  await supertest(app).post("/users").send(newData) 
            console.log(response.body);
            expect(response.statusCode).toBe(201);
        })

        test("should be saved and return user id", async()=>{
            
            const newData = generateMockupUser();
            const response =  await supertest(app).post("/users").send(newData)
            const userDetails = response.body;
            const { body } = await supertest(app).get("/users/"+userDetails.id)
            expect((userDetails).hasOwnProperty("id")).toBe(true);
            expect(body.id).toBe(userDetails.id);

        })
        

    })
})

describe("Delete User", () => {
    describe("Delete Individual User", () => {
        test("should return code 204 upon deletion", async() => {
            const newData = generateMockupUser();
            const saveUserResponse = await supertest(app).post('/users').send(newData);
            const deleteResponse = await supertest(app).delete('/users/delete/'+saveUserResponse.body.id);
            expect(deleteResponse.statusCode).toBe(204);
        })
    })
    describe("Delete Multiple Users", () => {
        test("should return code 204 upon deletion", async() => {
            // const newData = generateMockupUser();
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





