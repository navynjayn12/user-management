const { sql, poolPromise } = require('../../database/db')
const bcrypt = require('bcryptjs');
const moment = require('moment')

class UserController {

    signUp = async (req, res) => {
        try {
            let salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);
            let query = `INSERT INTO dbo.users(firstname, lastname, email, userName, password, status,createdAt,updatedAt)
                VALUES (
                    '${req.body.firstname}', 
                    '${req.body.lastname}', 
                    '${req.body.email.toLowerCase()}',
                    '${req.body.userName}',
                    '${password}',
                    1,
                    '${moment().format("YYYY-MM-DD HH:mm:ss")}', 
                    '${moment().format("YYYY-MM-DD HH:mm:ss")}' 
                    )`

            let pool = await poolPromise
            await pool.request().query(query)
            return res.status(200).json({ success: true, message: "User Created Successfully!" })
        } catch (e) {
            return res.status(500).json({ data: e, message: "Internal Server Error!" })
        }
    }

    login = async (req, res) => {
        try {
            let query = `SELECT password FROM dbo.users where userName='${req.body.userName}'`;
            let pool = await poolPromise
            let data = await pool.request().query(query)
            let verifyPwd = await bcrypt.compareSync(req.body.password, data.recordset[0].password)
            if (verifyPwd) {
                return res.status(200).json({ success: true, message: "LoggedIn Successfully!" })
            } else {
                return res.status(400).json({ success: false, message: "Invalid Credentials!" })
            }
        } catch (e) {
            return res.status(500).json({ data: e, message: "Internal Server Error!" })
        }
    }

    getAllData = async (req, res) => {
        try {
            let skip = (req.query && req.query.skip) ? req.query.skip : 0;
            let take = (req.query && req.query.take) ? req.query.take : 2;
            let filterName = 'users.userName';
            let filterStatus = (req.query && req.query.filterstatus) ? req.query.filterstatus : 'ASC';
            if (req.query.filtername === 'userName') {
                filterName = 'users.userName'
            } else if (req.query.filtername === 'projectName') {
                filterName = 'projects.projectName'
            } else if (req.query.filtername === 'categoryName') {
                filterName = 'category.categoryName'
            }

            const query = `SELECT 
            users.userName,
            projects.projectName,
            category.categoryName
            FROM 
            dbo.users as users
            join 
            dbo.projects as projects  
            on
            users.userId = projects.userId
            left join
            dbo.category as category
            on
            category.cid = projects.cid
            ORDER BY ${filterName} ${filterStatus} 
            OFFSET ${skip} ROWS
            FETCH NEXT ${take} ROWS ONLY
            `
            const alldata = `SELECT 
            count(*) as total
            FROM 
            dbo.users as users
            join 
            dbo.projects as projects  
            on
            users.userId = projects.userId
            left join
            dbo.category as category
            on
            category.cid = projects.cid
            `
            const pool = await poolPromise
            const lObjResult = await pool.request().query(query)
            const lObjResultData = await pool.request().query(alldata)

            if (lObjResult && lObjResultData) {
                return res.status(200).json({
                    data: lObjResult.recordset,
                    total: lObjResultData.recordset[0].total,
                    message: "Category Listed Successfully!"
                })
            } else {
                return res.status(400).json({ data: {}, message: "Bad Request!" })
            }
        } catch (e) {
            return res.status(500).json({ data: e, message: "Internal Server Error!" })
        }
    }
}

module.exports = new UserController();