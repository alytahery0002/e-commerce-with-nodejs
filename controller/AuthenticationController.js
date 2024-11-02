const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');


const User=require('../model/User')
// dotenv.config({ path: "./c" });

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn: '1h',
});
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // delete user.password;
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.register = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone:req.body.phone,
    role:req.body.role,
    storeId:req.body.storeId,
    password: hashedPassword,
  });

  createSendToken(newUser, 201, res);
};


exports.login=async (req,res)=>{
  try {
    const { name, password } = req.body;
    console.log(name)
    console.log(password)
    const user = await User.findOne({ name });
    
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    console.log(user)
    console.log(password, user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(2)
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    console.log(3)
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
}

exports.forgetPassword=async (req,res)=>{
  
}

exports.resetPassword=async (req,res)=>{
  
}

exports.protect=async(req,res,next)=>{

  const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
}