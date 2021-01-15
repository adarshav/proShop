import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Adarsha',
        email: 'adarshav957@gmail.com',
        password:bcrypt.hashSync('123456', 10)

    },
    {
        name: 'Raksha',
        email: 'raksha@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Shantha',
        email: 'shantha@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
]
export default users;