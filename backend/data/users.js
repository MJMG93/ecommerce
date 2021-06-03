import bcrypt from 'bcryptjs'

const users = [
    {
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        first_name: 'John',
        last_name: 'Deer',
        email: 'john@deer.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@doe.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users