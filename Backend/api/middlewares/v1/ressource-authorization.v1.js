'use strict';

function canCreate(req, res, next) {
  if (!req.schema.canCreate(req.user)) {
    return res.status(403).send({
      message: 'Vous n\'êtes pas autorisez à creer ' + req.schemaName
    });
  }
  next();
}

function canRead(req, res, next) {
  if (!req.schema.canRead(req.user)) {
    return res.status(403).send({
      message: 'Vous n\'êtes pas autorisez à lire ' + req.schemaName
    });
  }
  next();
}

function canModify(req, res, next) {
  if (!req.schema.canModify(req.user)) {
    return res.status(403).send({
      message: 'Vous n\'êtes pas autorisez à modifier ' + req.schemaName
    });
  }
  next();
}

function canDelete(req, res, next) {
  if (!req.schema.canDelete(req.user)) {
    return res.status(403).send({
      message: 'Vous n\'êtes pas autorisez à supprimer ' + req.schemaName
    });
  }
  next();
}

function ressourceAuthorization(req, res, next) {
   
  switch (req.method) {
    case 'POST':
      canCreate(req, res, next);
      break;
    case 'GET':
      canRead(req, res, next);
      break;
    case 'PUT':
      canModify(req, res, next);
      break;
    case 'DELETE':
      canDelete(req, res, next);
      break;
    default:
      return res.status(405).send({
        message: 'Méthode ' + req.method + ' innexistante pour ' + req.schemaName
      });
  }
}

module.exports = ressourceAuthorization;