const Vacine = require("../models/vacine.model");

async function getAllVacines(){
    var result = await Vacine.find({})
    .exec()
    return result
   /*  .then(vacines => {
        res.status(200).json(vacines)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */


/* try {
    const Vacines = await Vacine.find({});
    res.json(Vacines).status(200);
} catch (error) {
    res.status(403).json({error});
    
} */
}


async function getSpesficVacine(id){
    var result = await Vacine.findById(id,{})
    .exec()
    return result
    /* .then(vacine => {
        res.status(200).json(vacine)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */


/* try {
    const vacine = await Vacine.findById(VacineID,{});
    res.json(vacine).status(200);
} catch (error) {
    res.status(403).json({error});
} */
}


async function createVacine(vacine){
    var result = await vacine.save()
    return result
    /* .then(vacine => {
        res.status(200).json(vacine)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    })
 */
    /* try {
        console.log("vor await call")
        await vacine.save()
        console.log("nach await call")
        res.status(200).json(vacine);
    } catch (error) {
        res.status(403).json({error});
    } */
}

async function updateVacine(id,body){
    var result = await Vacine.findByIdAndUpdate(id, body)
    .exec()
    return result
    /* .then(VacineUpdated => {
        res.status(200).json(VacineUpdated)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

    /* try {
        const VacineUpdated = await Vacine.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(VacineUpdated)
    } catch (error) {
        res.status(403).json({error});
    } */

}

async function delteVacinebyId(id){
    var result = await Vacine.findByIdAndDelete(id)
    .exec()
    return result
    /* .then(VacineDeleted => {
        res.status(200).json(VacineDeleted)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */
   
    /*  try {
        const Vacinebody = await Vacine.findByIdAndDelete(req.params.id);
        res.status(200).json(Vacinebody)
    } catch (error) {
        res.status(403).json({error});
    } */
}

exports.getAllVacines =getAllVacines
exports.getSpesficVacine =getSpesficVacine
exports.createVacine =createVacine
exports.updateVacine =updateVacine
exports.delteVacinebyId =delteVacinebyId