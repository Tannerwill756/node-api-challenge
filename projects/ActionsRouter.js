// const express = require("express");
// const db = require("../data/helpers/projectModel");
// const actionsDb = require("../data/helpers/actionModel");

// const router = express.Router();

// // GET specific project action
// router.get(
//   "/:id",

//   validateActionId,
//   (req, res) => {
//     console.log("get:", req.params.id);
//     actionsDb
//       .get(req.params.id)
//       .then((action) => {
//         res.status(200).json(action);
//       })
//       .catch((err) => {
//         res.status(500).json({
//           error: "Issue retrieving this action",
//         });
//       });
//   }
// );

// // POST new actions
// router.post("/", validateAction, (req, res) => {
//   const project_id = req.params.id;
//   const newAction = {
//     project_id,
//     description: req.body.description,
//     notes: req.body.notes,
//   };

//   actionsDb
//     .insert(newAction)
//     .then((newPost) => {
//       res.status(200).json(newPost);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: "Issue posting this action",
//       });
//     });
// });

// // UPDATE a action
// router.put(
//   "/:id",

//   validateAction,
//   (req, res) => {
//     actionsDb
//       .update(req.params.id, req.body)
//       .then((upd) => {
//         res.status(200).json(upd);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: "Issues updating this action" });
//       });
//   }
// );

// // DELETE a action
// router.delete("/:id", (req, res) => {
//   actionsDb
//     .remove(req.params.id)
//     .then((dlt) => {
//       res.status(200).json(dlt);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Issue deleting this action" });
//     });
// });

// // ---------------- middleware functions ---------------------------------

// function validateAction(req, res, next) {
//   if (req.body) {
//     if (req.body.description && req.body.notes) {
//       if (req.body.description.length < 129) {
//         next();
//       } else {
//         res
//           .status(400)
//           .json({ message: "description has a max character length of 128" });
//       }
//     } else {
//       res.status(400).json({ message: "description and notes is required" });
//     }
//   } else {
//     res.status(400).json({ message: "missing action info" });
//   }
// }

// function validateProjectId(req, res, next) {
//     project_id = req.params.id;
//     db.get(project_id)
//       .then((prj) => {
//         if (prj === null) {
//           res.status(400).json({
//             errorMessage: "The project with this ID does not exist.",
//           });
//         } else {
//           next();
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({ error: "Issue retrieving this project" });
//       });
//   }

// function validateActionId(req, res, next) {
//   console.log(req.body);
//   console.log("body id", req.params);
//   actionsDb
//     .get(req.params.id)
//     .then((id) => {
//       if (null) {
//         res
//           .status(400)
//           .json({ message: "The action with this ID doesn't exist" });
//       } else {
//         next();
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Issue retrieving this action" });
//     });
// }

// module.exports = router;
