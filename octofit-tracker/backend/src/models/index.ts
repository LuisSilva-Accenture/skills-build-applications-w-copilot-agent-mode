import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    goal: { type: String, default: 'Stay active' },
    level: { type: String, default: 'Beginner' },
    avatar: { type: String, default: 'https://via.placeholder.com/150' },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, default: 'Fitness' },
    members: [{ type: String }],
    captain: { type: String, required: true },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 30 },
    distance: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    date: { type: String, default: new Date().toISOString() },
  },
  { timestamps: true }
);

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    duration: { type: Number, default: 30 },
    difficulty: { type: String, default: 'Intermediate' },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);
