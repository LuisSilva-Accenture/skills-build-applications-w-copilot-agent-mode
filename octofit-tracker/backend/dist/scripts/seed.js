"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = require("../models/index.js");
// Seed the octofit_db database with test data.
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            index_js_1.User.deleteMany({}),
            index_js_1.Team.deleteMany({}),
            index_js_1.Activity.deleteMany({}),
            index_js_1.LeaderboardEntry.deleteMany({}),
            index_js_1.Workout.deleteMany({}),
        ]);
        const users = await index_js_1.User.insertMany([
            {
                name: 'Ava Martinez',
                email: 'ava.martinez@example.com',
                goal: 'Run a half marathon',
                level: 'Intermediate',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            },
            {
                name: 'Noah Chen',
                email: 'noah.chen@example.com',
                goal: 'Build strength',
                level: 'Beginner',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            },
            {
                name: 'Maya Patel',
                email: 'maya.patel@example.com',
                goal: 'Improve mobility',
                level: 'Advanced',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
            },
        ]);
        const teams = await index_js_1.Team.insertMany([
            {
                name: 'Peak Performers',
                sport: 'Running',
                members: ['Ava Martinez', 'Noah Chen'],
                captain: 'Ava Martinez',
            },
            {
                name: 'Flex Squad',
                sport: 'Cross-training',
                members: ['Maya Patel', 'Noah Chen'],
                captain: 'Maya Patel',
            },
        ]);
        await index_js_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'Run',
                duration: 42,
                distance: 8.4,
                calories: 580,
                date: '2026-08-06T06:30:00.000Z',
            },
            {
                userId: users[1]._id.toString(),
                type: 'Strength',
                duration: 45,
                distance: 0,
                calories: 390,
                date: '2026-08-05T18:15:00.000Z',
            },
            {
                userId: users[2]._id.toString(),
                type: 'Yoga',
                duration: 30,
                distance: 0,
                calories: 210,
                date: '2026-08-04T07:00:00.000Z',
            },
        ]);
        await index_js_1.LeaderboardEntry.insertMany([
            {
                userId: users[0]._id.toString(),
                name: users[0].name,
                score: 980,
                streak: 8,
                rank: 1,
            },
            {
                userId: users[1]._id.toString(),
                name: users[1].name,
                score: 845,
                streak: 4,
                rank: 2,
            },
            {
                userId: users[2]._id.toString(),
                name: users[2].name,
                score: 912,
                streak: 6,
                rank: 3,
            },
        ]);
        await index_js_1.Workout.insertMany([
            {
                title: 'Morning Mobility Flow',
                focus: 'Flexibility',
                duration: 20,
                difficulty: 'Beginner',
                equipment: ['Mat'],
                instructions: ['Warm up for 3 minutes', 'Flow through 8 mobility drills', 'Finish with breathing exercises'],
            },
            {
                title: 'Interval Run Builder',
                focus: 'Cardio',
                duration: 35,
                difficulty: 'Intermediate',
                equipment: ['Running shoes'],
                instructions: ['Warm up for 5 minutes', 'Alternate 1 minute fast with 2 minutes easy', 'Cool down for 5 minutes'],
            },
            {
                title: 'Upper Body Strength Circuit',
                focus: 'Strength',
                duration: 40,
                difficulty: 'Intermediate',
                equipment: ['Dumbbells', 'Bench'],
                instructions: ['Complete 3 rounds', 'Perform 10 reps per movement', 'Rest 45 seconds between rounds'],
            },
        ]);
        console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
