const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Project = require('../models/project');
const Counter = require('../models/counter');

// Add

var projectIdCounter = 100;

router.post('/add', (req, res, next) => {
  let newDate = new Date().getTime()
  let newProject = new Project({
    projectId: projectIdCounter,
    user: req.body.user,
    title: req.body.title,
    description: req.body.description,
    createdAt: newDate,
    incompleteItems: req.body.incompleteItems,
    completedItems: req.body.completedItems,
  });

  Project.addProject(newProject, (err) => {
    if(err){
      res.json({success: false, msg:'Failed to add project'});
    } else {
      res.json({success: true, msg:'Project added'});
    }
  });
  projectIdCounter += 1;
});

//Find by ID

router.post('/id', (req, res, next) => {
  let query = {
    projectId: req.body.id
  }

  Project.getProjectById(query, (err, project) => {
    if(err){
      res.json({success: false, msg:'Project not found'});
    } else {
      res.json(project);
    }
    console.log(project)
  })
})

// Find by user

router.post('/user', (req, res, next) => {
  let query = {
    user: req.body.user
  }

  Project.getProjectsByUser(query, (err, projects) => {
    if(err){
      res.json({success: false, msg:'User not found'});
    } else {
      res.json(projects);
    }
    console.log(projects)
  })
})

var itemIdCounter = 100;

router.post('/createitem', (req, res, next) => {
  let newDate = new Date().getTime()
  let query = {
    container: "incompleteItems",
    itemId: itemIdCounter,
    projectId: req.body.projectId,
    description: req.body.description,
    createdAt: newDate
  }

  Project.addItem(query, (err, item) => {
    if(err){
      res.json({success: false, msg:'Item not added'});
    } else {
      res.json({success: true, msg: item});
    }
  })
  itemIdCounter += 1;
})

router.post('/moveitem', (req, res, next) => {
  let query = {
    container: req.body.container,
    itemId: req.body.itemId,
    projectId: req.body.projectId,
    description: req.body.description,
    createdAt: req.body.createdAt
  }

  Project.deleteMovedItem(query, (err) =>{
    if(err){
      res.json({success: false, msg:'Item failed deletion'});
    } else {
      Project.moveItem(query, (err) => {
        if(err){
          res.json({success: false, msg:'Item not added'});
        } else {
          res.json({success: true, msg:'Item added'});
        }
      })
    }
  })
})

router.post('/deleteitem', (req, res, next) => {
  let query = {
    itemId: req.body.id,
  }
  Project.deleteItem(query, (err) => {
    if(err){
      res.json({success: false, msg:'Something went wrong, item not deleted'});
    } else {
      res.json({success: true, msg:'Item deleted'});
    }
  })
})

module.exports = router;
