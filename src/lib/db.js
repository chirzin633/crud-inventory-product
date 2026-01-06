import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'sql.freedb.tech',
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
};

const pool = mysql.createPool(dbConfig);

export async function query(sql, params = []) {
    try {
        const [results] = await pool.query(sql, params);
        return results;
    } catch (error) {
        console.error('Database Error Detail:', {
            message: error.message,
            code: error.code,
            host: dbConfig.host
        });
        throw error;
    }
}


