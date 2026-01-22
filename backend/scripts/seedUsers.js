import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

/**
 * Seed Users Script
 * Creates default users for all five roles
 * Run with: node scripts/seedUsers.js
 */

const users = [
  {
    name: 'Super Admin',
    email: 'superadmin@vidyank.com',
    password: 'SuperAdmin123',
    role: 'SUPER_ADMIN',
    isActive: true,
  },
  {
    name: 'Institute Admin',
    email: 'institute@vidyank.com',
    password: 'Institute123',
    role: 'INSTITUTE_ADMIN',
    isActive: true,
  },
  {
    name: 'Teacher',
    email: 'teacher@vidyank.com',
    password: 'Teacher123',
    role: 'TEACHER',
    isActive: true,
  },
  {
    name: 'Student',
    email: 'student@vidyank.com',
    password: 'Student123',
    role: 'STUDENT',
    isActive: true,
  },
  {
    name: 'Parent',
    email: 'parent@vidyank.com',
    password: 'Parent123',
    role: 'PARENT',
    isActive: true,
  },
];

const seedUsers = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log('Starting user seeding...\n');

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('Cleared existing users\n');

    // Create users
    const createdUsers = [];
    for (const userData of users) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`User ${userData.email} already exists. Skipping...`);
        continue;
      }

      // Create new user (password will be hashed by pre-save hook)
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`✓ Created ${userData.role}: ${userData.email}`);
    }

    console.log(`\n✅ Seeding completed!`);
    console.log(`Created ${createdUsers.length} new user(s)\n`);

    // Display login credentials
    console.log('═══════════════════════════════════════════════════');
    console.log('LOGIN CREDENTIALS:');
    console.log('═══════════════════════════════════════════════════\n');
    
    users.forEach((user) => {
      console.log(`Role: ${user.role}`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log('─────────────────────────────────────────────────\n');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

// Run seed function
seedUsers();
