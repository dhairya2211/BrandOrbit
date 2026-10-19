const bcrypt = require('bcrypt');

const users = [
  { name: 'Priya Sharma', password: 'priya@123' },
  { name: 'Rahul Patel', password: 'rahul@123' },
  { name: 'Ananya Singh', password: 'ananya@123' },
  { name: 'Aarav Mehta', password: 'aarav@123' },
  { name: 'Sneha Verma', password: 'sneha@123' },
  { name: 'Karan Shah', password: 'karan@123' },
  { name: 'Ishita Gupta', password: 'ishita@123' },
  { name: 'Rohan Desai', password: 'rohan@123' },
  { name: 'Meera Joshi', password: 'meera@123' },
  { name: 'Vivek Kumar', password: 'vivek@123' }
];

async function generatePasswords() {
  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);

    console.log({
      name: user.name,
      password: user.password,
      hash: hash
    });
  }
}

generatePasswords();