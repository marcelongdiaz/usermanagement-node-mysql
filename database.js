import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users");

    return rows;
}

export async function getUser(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM users
        WHERE id= ?
    `, [id])

    return rows[0];
}

export async function createUser(first_name, last_name, address, post_code, contact_phone, email, username, password){

    const [result] = await pool.query(`
        INSERT INTO 
        users(first_name, last_name, address, post_code, contact_phone, email, username, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [first_name, last_name, address, post_code, contact_phone, email, username, password])

    if(result.insertId !== undefined && result.insertId !== null){
        
        return getUser(result.insertId);;
    }

    return result;
}

export async function loginCredentials(username, password){
    const [rows] = await pool.query(`
        SELECT first_name, last_name, address, post_code, contact_phone, email, role, id 
        FROM users 
        WHERE username=? && password=?
    `, [username, password]);

    return rows;
}

export async function deleteUser(id){
    const result = await pool.query(`
        DELETE 
        FROM users 
        WHERE id=?  
    `, [id])

    return result;
}

export async function bulkDeleteUsers(ids){
    const result = await pool.query(`
        DELETE 
        FROM users 
        WHERE id IN (?)  
    `, [ids])

    return result;
}

export async function updateUser(data, id){
    const { first_name, last_name, address, post_code, contact_phone, email, username, password }  = data;
    const updateResult = await pool.query(`
        UPDATE users 
        SET first_name=?, last_name=?, address=?, post_code=?, contact_phone=?, email=?, username=?, password=? 
        WHERE id=? 
    `, [first_name, last_name, address, post_code, contact_phone, email, username, password, id]);

    return updateResult;
}

