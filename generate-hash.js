import bcrypt from 'bcryptjs';

const password = 'admin123';
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

console.log('Senha:', password);
console.log('Hash:', hash);
console.log('Teste:', await bcrypt.compare(password, hash));