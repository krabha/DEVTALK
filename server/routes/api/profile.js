const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', [
                'name',
                'avatar'
            ]);
        // console.log(profile);

        if (!profile) {
            res.status(400).json({ msg: 'No profile for this user!' })
        }

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('SERVER ERROR!');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [
    auth,
    body('status',
        'Status is required!')
        .not()
        .isEmpty(),

    body('skills',
        'Skills are required')
        .not()
        .isEmpty()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    if (skills) {
        profileFields.skills = skills.split(',')
            .map(skill => skill.trim());
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    console.log(profileFields.skills);

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(400).send('Server error!!!');
    }

});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate('user', ['name', 'avatar'])
        res.json(profiles);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error!');
    }
});

// @route   GET api/profile/users/:userId
// @desc    Get profile by ID
// @access  Public
router.get('/users/:userId', async (req, res) => {
    try {
        const profiles = await Profile.findOne(
            { user: req.params.userId }
        )
            .populate('user', ['name', 'avatar'])
        res.json(profiles);

        if (!profiles) 
        return res.status(400).json({
            msg: 'Profile not found!'
        })

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return
            res.status(400).json({
                msg: 'Profile not found!'
            })
        }
        res.status(500).send('Server error!');
    }
});

// @route   DELETE api/profile
// @desc    Delte profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {

        await Post.deleteMany({ user: req.user.id });

        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });
        
        res.json({ msg: 'User deleted!' });

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'Profile not found!'
            })
        }
        res.status(500).send('Server error!');
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [
    auth,
    [
        body('title', 'Title is required!')
            .not()
            .isEmpty(),
        body('company', 'Company is required!')
            .not()
            .isEmpty(),
        body('from', 'From date is required!')
            .not()
            .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne(
            { user: req.user.id }
        );

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error!');
    }

});

// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:expId', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne(
            { user: req.user.id }
        );

        const removeIndex = profile.experience.map(item => item.id)
            .indexOf(req.params.expId);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error!');
    }

});

// @route   PUT api/profile/education
// @desc    Add profile eduaction
// @access  Private
router.put('/education', [
    auth,
    [
        body('school', 'School is required!')
            .not()
            .isEmpty(),
        body('degree', 'Degree is required!')
            .not()
            .isEmpty(),
        body('fieldofstudy', 'Field of Study is required!')
            .not()
            .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne(
            { user: req.user.id }
        );

        profile.education.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error!');
    }

});

// @route   DELETE api/profile/education/:educationId
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:educationId', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne(
            { user: req.user.id }
        );

        const removeIndex = profile.education.map(item => item.id)
            .indexOf(req.params.educationId);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error!');
    }

});

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        }

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(400).json({
                    msg: 'No Github account found!'
                })
            }
            res.json(JSON.parse(body));
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error!');
    }
});
module.exports = router;