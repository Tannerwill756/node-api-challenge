const express = require("express");
const db = require("../data/helpers/projectModel");
const actionsDb = require("../data/helpers/actionModel");

const router = express.Router();

// GETS projects
router.get("/", (req, res) => {
  db.get()
    .then((prj) => {
      res.status(200).json(prj);
    })
    .catch((err) => {
      res.status(500).json({ error: "Issues retrieving projects" });
    });
});

// GETS individual projects
router.get("/:id", validateProjectId, (req, res) => {
  db.get(req.params.id)
    .then((prj) => {
      res.status(200).json(prj);
    })
    .catch((err) => {
      res.status(500).json({ error: "Issue retrieving this project" });
    });
});

// POSTS a project
router.post("/", validateProject, (req, res) => {
  db.insert(req.body)
    .then((newPrj) => {
      res.status(200).json(newPrj);
    })
    .catch((err) => {
      res.status(500).json({ error: "There was an issue posting" });
    });
});

// UPDATE a project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  db.update(req.params.id, req.body)
    .then((upd) => {
      res.status(200).json(upd);
    })
    .catch((err) => {
      res.status(500).json({ error: "Issue updating this project" });
    });
});

// DELETE a project
router.delete("/:id", validateProjectId, (req, res) => {
  db.remove(req.params.id)
    .then((dlt) => {
      res.status(200).json(dlt);
    })
    .catch((err) => {
      res.status(500).json({
        error: "issue deleting that project",
      });
    });
});

// GET project actions
router.get("/:id/actions", validateProjectId, (req, res) => {
  db.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Issue retrieving these actions",
      });
    });
});

// GET specific project action
router.get(
  "/:id/actions/:id",

  validateActionId,
  (req, res) => {
    console.log("get:", req.params.id);
    actionsDb
      .get(req.params.id)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          error: "Issue retrieving this action",
        });
      });
  }
);

// POST new actions
router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const project_id = req.params.id;
  const newAction = {
    project_id,
    description: req.body.description,
    notes: req.body.notes,
  };

  actionsDb
    .insert(newAction)
    .then((newPost) => {
      res.status(200).json(newPost);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Issue posting this action",
      });
    });
});

// UPDATE a action
router.put("/:id/actions/:id", validateActionId, validateAction, (req, res) => {
  actionsDb
    .update(req.params.id, req.body)
    .then((upd) => {
      res.status(200).json(upd);
    })
    .catch((err) => {
      res.status(500).json({ error: "Issues updating this action" });
    });
});

// DELETE a action
router.delete("/:id/actions/:id", validateActionId, (req, res) => {
  actionsDb
    .remove(req.params.id)
    .then((dlt) => {
      res.status(200).json(dlt);
    })
    .catch((err) => {
      res.status(500).json({ error: "Issue deleting this action" });
    });
});

// -----------------  custom middleware   ----------------------------
function validateProjectId(req, res, next) {
  project_id = req.params.id;
  db.get(project_id)
    .then((prj) => {
      console.log("then prj!", prj);
      if (prj === null) {
        res.status(400).json({
          errorMessage: "The project with this ID does not exist.",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Issue retrieving this project" });
    });
}

function validateProject(req, res, next) {
  if (req.body) {
    if (req.body.name && req.body.description) {
      next();
    } else {
      res.status(400).json({ message: "name and description is required" });
    }
  } else {
    res.status(400).json({ message: "missing project info" });
  }
}

function validateAction(req, res, next) {
  if (req.body) {
    if (req.body.description && req.body.notes) {
      if (req.body.description.length < 129) {
        next();
      } else {
        res
          .status(400)
          .json({ message: "description has a max character length of 128" });
      }
    } else {
      res.status(400).json({ message: "description and notes is required" });
    }
  } else {
    res.status(400).json({ message: "missing action info" });
  }
}

function validateActionId(req, res, next) {
  //   console.log(req.params.id);
  //   console.log("body id", req.params);
  actionsDb
    .get(req.params.id)
    .then((id) => {
      if (id) {
        next();
      } else {
        res
          .status(400)
          .json({ message: "The action with this ID doesn't exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Issue retrieving this action" });
    });
}

module.exports = router;
