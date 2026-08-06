"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = require("express");
const index_js_1 = require("../models/index.js");
const router = (0, express_1.Router)();
function isDatabaseReady() {
    return mongoose_1.default.connection.readyState === 1;
}
function getFallbackUsers() {
    return [
        { id: 'user-1', name: 'Ava', email: 'ava@example.com', goal: 'Run a 10K', level: 'Intermediate' },
        { id: 'user-2', name: 'Noah', email: 'noah@example.com', goal: 'Build strength', level: 'Beginner' },
    ];
}
function getFallbackTeams() {
    return [
        { id: 'team-1', name: 'Peak Performers', sport: 'Running', captain: 'Ava', members: ['Ava', 'Noah'] },
    ];
}
function getFallbackActivities() {
    return [
        { id: 'activity-1', userId: 'user-1', type: 'Run', duration: 35, distance: 5.2, calories: 320 },
    ];
}
function getFallbackLeaderboard() {
    return [
        { id: 'leaderboard-1', userId: 'user-1', name: 'Ava', score: 980, streak: 8, rank: 1 },
    ];
}
function getFallbackWorkouts() {
    return [
        { id: 'workout-1', title: 'Morning Mobility', focus: 'Flexibility', duration: 20, difficulty: 'Beginner', equipment: ['Mat'] },
    ];
}
function getBaseUrl(req) {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${process.env.PORT || 8000}`;
}
router.get(['/users', '/users/'], async (_req, res) => {
    try {
        const users = isDatabaseReady() ? await index_js_1.User.find({}) : getFallbackUsers();
        res.json({ success: true, data: users, baseUrl: getBaseUrl(_req) });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch users', error });
    }
});
router.post(['/users', '/users/'], async (req, res) => {
    try {
        const user = isDatabaseReady() ? await index_js_1.User.create(req.body) : { ...req.body, id: `user-${Date.now()}` };
        res.status(201).json({ success: true, data: user, baseUrl: getBaseUrl(req) });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Unable to create user', error });
    }
});
router.get(['/teams', '/teams/'], async (_req, res) => {
    try {
        const teams = isDatabaseReady() ? await index_js_1.Team.find({}) : getFallbackTeams();
        res.json({ success: true, data: teams, baseUrl: getBaseUrl(_req) });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch teams', error });
    }
});
router.post(['/teams', '/teams/'], async (req, res) => {
    try {
        const team = isDatabaseReady() ? await index_js_1.Team.create(req.body) : { ...req.body, id: `team-${Date.now()}` };
        res.status(201).json({ success: true, data: team, baseUrl: getBaseUrl(req) });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Unable to create team', error });
    }
});
router.get(['/activities', '/activities/'], async (_req, res) => {
    try {
        const activities = isDatabaseReady() ? await index_js_1.Activity.find({}) : getFallbackActivities();
        res.json({ success: true, data: activities, baseUrl: getBaseUrl(_req) });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch activities', error });
    }
});
router.post(['/activities', '/activities/'], async (req, res) => {
    try {
        const activity = isDatabaseReady() ? await index_js_1.Activity.create(req.body) : { ...req.body, id: `activity-${Date.now()}` };
        res.status(201).json({ success: true, data: activity, baseUrl: getBaseUrl(req) });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Unable to create activity', error });
    }
});
router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
    try {
        const leaderboard = isDatabaseReady() ? await index_js_1.LeaderboardEntry.find({}).sort({ score: -1 }) : getFallbackLeaderboard();
        res.json({ success: true, data: leaderboard, baseUrl: getBaseUrl(_req) });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch leaderboard', error });
    }
});
router.post(['/leaderboard', '/leaderboard/'], async (req, res) => {
    try {
        const entry = isDatabaseReady() ? await index_js_1.LeaderboardEntry.create(req.body) : { ...req.body, id: `leaderboard-${Date.now()}` };
        res.status(201).json({ success: true, data: entry, baseUrl: getBaseUrl(req) });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Unable to create leaderboard entry', error });
    }
});
router.get(['/workouts', '/workouts/'], async (_req, res) => {
    try {
        const workouts = isDatabaseReady() ? await index_js_1.Workout.find({}) : getFallbackWorkouts();
        res.json({ success: true, data: workouts, baseUrl: getBaseUrl(_req) });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Unable to fetch workouts', error });
    }
});
router.post(['/workouts', '/workouts/'], async (req, res) => {
    try {
        const workout = isDatabaseReady() ? await index_js_1.Workout.create(req.body) : { ...req.body, id: `workout-${Date.now()}` };
        res.status(201).json({ success: true, data: workout, baseUrl: getBaseUrl(req) });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Unable to create workout', error });
    }
});
exports.default = router;
