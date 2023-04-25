const roi = require("./../model/roiModel");
const handler = require("./../controllers/handlerFactory");

// createroi function
exports.createroi = handler.createOne(roi);

// updateroi function
exports.updateroi = handler.updateOne(roi);

// deleteroi function
exports.deleteroi = handler.deleteOne(roi);
